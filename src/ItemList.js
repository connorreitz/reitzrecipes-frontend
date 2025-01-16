import React, { useState, useEffect } from 'react';
import './ItemList.css';
import default_image from './download.jpg';
import burga from './burga.jpeg'
import { useParams } from 'react-router-dom'

function ItemList() {
  const [recipe, setRecipe] = useState([]);
  const [steps, setSteps] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [image1, setImage1] = useState(default_image);
  const [image2, setImage2] = useState(burga);

  const {id} = useParams()

  useEffect(() => {
    fetch(`http://127.0.0.1:3000/recipe/${id}`)
    .then((res) => {
      return res.json()
    })
    .then((data) => {
      console.log('retrieved data: ', data)

      setRecipe(data.ingredients)
      setSteps(data.steps)
    })
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div className="container">
      <div className="toolbar">
        <button onClick={() => window.location.href = '/'}>Home</button>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="content-wrapper">
        <div className="images-container">
          {image1 && <img src={`https://reitz-recipes-templates.s3.us-east-2.amazonaws.com/images/${id}/image_left.jpg`} alt="Image 1" className="image" />}
          {image2 && <img src={`https://reitz-recipes-templates.s3.us-east-2.amazonaws.com/images/${id}/image_right.jpg`} alt="Image 2" className="image" />}
        </div>
        <div className="image-caption">
          <p>Here is some text below the images, aligned with the leftmost image.</p>
        </div>
        <div className="content-container">
          <div className="list-container">
            <h1>Ingredients</h1>
            <ul>
              {recipe.filter(ingredient => ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())).map((ingredient, index) => (
                <li key={index}>{ingredient.amount + ' ' + ingredient.unit + ' ' + ingredient.name}</li>
              ))}
            </ul>
          </div>
          
        </div>
        <div className="description-container">
            <h1>Steps</h1>
            <p>
              {steps}
            </p>
          </div>
      </div>
    </div>
  );
}

export default ItemList;
