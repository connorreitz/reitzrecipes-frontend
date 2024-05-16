import React from "react";
import logo from "./logo.svg";
import "./App.css";
import ItemList from "./ItemList";
/** old app with fetching from backend
function App() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/recipe/test")
      .then((res) => {return res.json()})
      .then((data) => {
        console.log(data)
        setData(data)
      });
  }, []);


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>ingredient: {data.ingredient}</p>
      </header>
    </div>
  );
}*/

function App() {
  return (
    <div className="App">
      <ItemList />
    </div>
  );
}

export default App;