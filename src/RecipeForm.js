import React, { useState } from 'react';
import './RecipeForm.css'
import { useNavigate } from 'react-router-dom';

const RecipeForm = () => {
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState({
    description: '',
    ingredients: [{ name: '', amount: '', unit: '' }],
    servings: '',
    source: '',
    steps: '',
    title: '',
    uri: '' // Added URI field
  });

  const [images, setImages] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({
      ...prev,
      [name]: name === 'servings' ? (value === '' ? '' : parseInt(value) || '') : value
    }));
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = {
      ...newIngredients[index],
      [field]: field === 'amount' ? (value === '' ? '' : parseFloat(value) || '') : value
    };
    setRecipe(prev => ({ ...prev, ingredients: newIngredients }));
  };

  const addIngredient = () => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', amount: '', unit: '' }]
    }));
  };

  const removeIngredient = (index) => {
    setRecipe(prev => ({
      ...prev,
      ingredients: prev.ingredients.filter((_, i) => i !== index)
    }));
  };

  const handleImageChange = (e) => {
    if (e.target.files) {
      const newImages = Array.from(e.target.files).slice(0, 2 - images.length);
      setImages(prev => [...prev, ...newImages].slice(0, 2));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const submissionRecipe = {
      ...recipe,
      servings: recipe.servings === '' ? 1 : recipe.servings,
      ingredients: recipe.ingredients.map(ing => ({
        ...ing,
        amount: ing.amount === '' ? 0 : ing.amount
      }))
    };
    /*images.forEach((image, index) => {
      formData.append(`image${index}`, image);
    });*/

    try {
      const submittingURI = recipe.uri
      const response = await fetch(`/recipe/${submittingURI}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(submissionRecipe),
      });

      if (response.ok) {
        console.log('Recipe submitted successfully');
        setRecipe({
          description: '',
          ingredients: [{ name: '', amount: '', unit: '' }],
          servings: '',
          source: '',
          steps: '',
          title: '',
          uri: '' // Reset URI field
        });
        setImages([]);
        setShowSuccess(true);
        setTimeout(() => {
          setShowSuccess(false);
          navigate(`/recipe/${submittingURI}`);
        }, 3000);
      } else {
        console.error('Failed to submit recipe');
      }
    } catch (error) {
      console.error('Error submitting recipe:', error);
    }
  };

  return (
    <div className="recipe-form-container">
      <form onSubmit={handleSubmit}>
        <h2>Create New Recipe</h2>

        {showSuccess && (
        <div className="success-popup">
          Recipe created! Taking you there in a second...
        </div>
      )}

        <div className="form-group">
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={recipe.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={recipe.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ingredients:</label>
          {recipe.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-row">
              <input
                type="number"
                value={ingredient.amount}
                onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                placeholder="Amount (e.g., 2)"
                min="0"
                step="0.1"
              />
              <input
                type="text"
                value={ingredient.unit}
                onChange={(e) => handleIngredientChange(index, 'unit', e.target.value)}
                placeholder="Unit (e.g., cup)"
              />
              <input
                type="text"
                value={ingredient.name}
                onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                placeholder="Ingredient (e.g., flour)"
                required
              />
              {recipe.ingredients.length > 1 && (
                <button className='removeButton' onClick={() => removeIngredient(index)}>
                  Remove
                </button>
              )}
            </div>
          ))}
          <button type="button" onClick={addIngredient}>
            Add Ingredient
          </button>
        </div>

        <div className="form-group">
          <label>Servings:</label>
          <input
            type="number"
            name="servings"
            value={recipe.servings}
            onChange={handleInputChange}
            placeholder="Servings (e.g., 4)"
            min="1"
            required
          />
        </div>

        <div className="form-group">
          <label>Steps:</label>
          <textarea
            name="steps"
            value={recipe.steps}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Source:</label>
          <input
            type="text"
            name="source"
            value={recipe.source}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Images (max 2):</label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            disabled={images.length >= 2}
          />
          <div className="image-preview">
            {images.map((image, index) => (
              <div key={index}>
                {image.name}{' '}
                <button
                  type="button"
                  onClick={() => setImages(prev => prev.filter((_, i) => i !== index))}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label>URI:</label>
          <input
            type="text"
            name="uri"
            value={recipe.uri}
            onChange={handleInputChange}
            placeholder="Recipe URI (e.g., chocolate-cake)"
          />
        </div>

        <button type="submit">Submit Recipe</button>
      </form>
    </div>
  );
};

export default RecipeForm;