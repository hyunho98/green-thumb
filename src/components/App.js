import '../App.css';
import Home from './Home'
import Create from "./Create"
import Edit from "./Edit"
import NavBar from "./NavBar"
import React, { useState, useEffect } from "react"
import { Route, Switch } from "react-router-dom"

function App() {
  useEffect(() => {
    fetch(`https://green-thumb-server.onrender.com/plants`)
        .then((r) => r.json())
        .then((data) => setPlants(data))
  }, [])

  const [plants, setPlants] = useState([])

  function onNewPlant(plant) {
    setPlants([...plants, plant])
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <h1>Green Thumb</h1>
      </header>
      <div>
        <Switch>
          <Route exact path="/create">
            <Create handleFormSubmit={onNewPlant} />
          </Route>
          <Route path="/edit/:id">
            <Edit plants={plants} setPlants={setPlants} />
          </Route>
          <Route exact path="/" >
            <Home plants={plants} />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
