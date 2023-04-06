import '../App.css';
import Home from './Home'
import NavBar from "./NavBar"
import React, { useState, useEffect } from "react"
import { Route, Switch } from "react-router-dom"

function App() {
  useEffect(() => {
    fetch(`http://localhost:3000/plants`)
        .then((r) => r.json())
        .then((data) => setPlants(data))
  }, [])

  const [plants, setPlants] = useState([])
  
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <h1>Green Thumb</h1>
      </header>
      <div>
        <Switch>
          <Route exact path="/" >
            <Home plants={plants} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
