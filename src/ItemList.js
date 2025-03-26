import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './ItemList.css';

function ItemList() {
  const [recipe, setRecipe] = useState([]);
  const [steps, setSteps] = useState('');
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [servings, setServings] = useState(0)
  const [baseServings, setBaseServings] = useState(0)
  const [searchTerm, setSearchTerm] = useState('');
  const [inputValue, setInputValue] = useState('');

  const { id } = useParams();
  const inputWidth = (servings.toString().length) * 9;

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/recipe/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setRecipe(data.ingredients);
        setSteps(data.steps);
        setTitle(data.title);
        setSource(data.source);
        setBaseServings(data.servings);
        setServings(data.servings);
        
      });
  }, [id]);

  function getServingsText(servings) {
    return servings == 1 ? 'serving' : 'servings'
  }

  return (
     
    <div className="container">

      <h2 className="image-title">{title}</h2>
      
      <div className="content-wrapper">
        <div className="images-container">
          <img src={`https://reitz-recipes-templates.s3.us-east-2.amazonaws.com/images/${id}/image_left.jpeg`} alt="Left" className="image" />
          <img src={`https://reitz-recipes-templates.s3.us-east-2.amazonaws.com/images/${id}/image_right.jpeg`} alt="Right" className="image" />
        </div>
        <p className="source left-align">source: {source}</p>
        
        <div className="content-sections">
          <div className="list-container">
            <h1 className="section-title">Ingredients (makes <input
          type="number"
          placeholder={0}
          value={servings}
          onChange={(e) => {
            setServings(e.target.value)
          }}
          style={{
            padding: '8px',
            fontSize: '16px',
            width: `${inputWidth + 20}px`, // Dynamic width based on text length
            minWidth: '30px', // Optional: Set a minimum width
          }}
          className="search-input"
        /> {getServingsText(servings)})</h1>
            
            <ul className="ingredients-list">
              {recipe.filter(ingredient => ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())).map((ingredient, index) => (
                <li key={index} className="ingredient-item">{(servings/baseServings)*ingredient.amount} {ingredient.unit} {ingredient.name.toLowerCase()}</li>
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

/**     toolbar code (leaving unused for now)
 *       <div className="toolbar">
        <button onClick={() => window.location.href = '/'} className="home-button">Home</button>
        <h1 className="toolbar-title">Reitz Recipes</h1>
        <input
          type="text"
          placeholder="Search ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
      </div>
 */

export default ItemList;