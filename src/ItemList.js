import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ItemList.css';

function ItemList() {
  const [recipe, setRecipe] = useState([]);
  const [steps, setSteps] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const { id } = useParams();

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/recipe/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data.ingredients);
        setSteps(data.steps);
      });
  }, [id]);

  return (
    <div className="container">
      <div className="toolbar">
        <button onClick={() => window.location.href = '/'} className="home-button">Home</button>
        <input
          type="text"
          placeholder="Search ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>

      <div className="content-wrapper">
        <div className="images-container">
          <img src={`https://reitz-recipes-templates.s3.us-east-2.amazonaws.com/images/${id}/image_left.jpg`} alt="Left" className="image" />
          <img src={`https://reitz-recipes-templates.s3.us-east-2.amazonaws.com/images/${id}/image_right.jpg`} alt="Right" className="image" />
        </div>
        <p className="image-caption">Here is some text below the images, aligned with the leftmost image.</p>
        
        <div className="content-sections">
          <div className="list-container">
            <h1 className="section-title">Ingredients</h1>
            <ul className="ingredients-list">
              {recipe.filter(ingredient => ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())).map((ingredient, index) => (
                <li key={index} className="ingredient-item">{ingredient.amount} {ingredient.unit} {ingredient.name}</li>
              ))}
            </ul>
          </div>

          <div className="description-container">
            <h1 className="section-title">Steps</h1>
            <p className="steps-text">{steps}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemList;