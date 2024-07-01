import '../App.css';
import Home from './Home'
import Create from "./Create"
import Edit from "./Edit"
import NavBar from "./NavBar"
import React, { useState, useEffect, createContext } from "react"
import { Route, Switch, useHistory } from "react-router-dom"
import { ContextProvider } from './context/ContextProvider'

export const HistoryContext = createContext(null)

function App() {
  // useEffect(() => {
  //   fetch(`https://green-thumb-server.onrender.com/plants`)
  //       .then((r) => r.json())
  //       .then((data) => setPlants(data))
  // }, [])

  return (
    <div className="App">
      <header className="App-header">
        <NavBar />
        <h1>Green Thumb</h1>
      </header>
      <div>
        <ContextProvider>
          <Switch>
            <Route exact path="/create">
              <Create />
            </Route>
            <Route path="/edit/:id">
              <Edit />
            </Route>
            <Route exact path="/" >
              <Home />
            </Route>
          </Switch>
        </ContextProvider>
      </div>
      
    </div>
  );
}

export default App;
