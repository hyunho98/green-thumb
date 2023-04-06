import '../App.css';
import Home from './Home'
import React, { useState, useEffect } from "react"

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
        <Home plants={plants} />
      </header>
    </div>
  );
}

export default App;
