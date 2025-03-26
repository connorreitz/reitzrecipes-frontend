import React from "react";
import "./App.css";
import ItemList from "./ItemList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RecipeForm from "./RecipeForm";
import LoginPage from "./Login";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="recipe/:id" element={<ItemList />} />
          <Route path="recipe/create" element={<RecipeForm />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="/" element={<p>hello world</p>} />
        </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;