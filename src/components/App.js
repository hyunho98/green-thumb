import '../App.css';
import Home from './Home'
import Create from "./Create"
import Edit from "./Edit"
import NavBar from "./NavBar"
import React, { useState, useEffect, createContext } from "react"
import { Route, Switch, useHistory } from "react-router-dom"

export const HistoryContext = createContext(null)

function App() {
  useEffect(() => {
    fetch(`https://green-thumb-server.onrender.com/plants`)
        .then((r) => r.json())
        .then((data) => setPlants(data))
  }, [])

  const history = useHistory()
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
        <HistoryContext.Provider value={history}>
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
        </HistoryContext.Provider>
      </div>
      
    </div>
  );
}

export default App;
