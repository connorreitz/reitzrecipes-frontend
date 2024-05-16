import React, { useState, useEffect } from 'react';
import './ItemList.css';
import default_image from './download.jpg';
import burga from './burga.jpeg'

function ItemList() {
  const [items, setItems] = useState(['Item 1', 'Item 2', 'Item 3', 'Item 4']);
  const [searchTerm, setSearchTerm] = useState('');
  const [image1, setImage1] = useState(default_image);
  const [image2, setImage2] = useState(burga);

  useEffect(() => {
    // You can fetch data here if items are dynamic and come from an API
    // setItems(fetchedItems);
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
          {image1 && <img src={image1} alt="Image 1" className="image" />}
          {image2 && <img src={image2} alt="Image 2" className="image" />}
        </div>
        <div className="image-caption">
          <p>Here is some text below the images, aligned with the leftmost image.</p>
        </div>
        <div className="content-container">
          <div className="list-container">
            <h1>Ingredients</h1>
            <ul>
              {items.filter(item => item.toLowerCase().includes(searchTerm.toLowerCase())).map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="description-container">
            <h1>Steps</h1>
            <p>
              Cook burga
              Chicken burga
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemList;
