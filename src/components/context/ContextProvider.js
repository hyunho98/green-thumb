import { useState, useEffect, createContext } from 'react'
import { useHistory } from 'react-router-dom'

export const Context = createContext()

function ContextProvider({ children }) {
    const history = useHistory()
    const [plants, setPlants] = useState([])
    let idCounter = localStorage.getItem('idCount') ? localStorage.getItem('idCount') : 0

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('plants'))
        if (data) {
            setPlants(data)
        }
    }, [])

    useEffect(() => {
        localStorage.setItem('plants', JSON.stringify(plants))
    }, [plants])

    useEffect(() => {
        localStorage.setItem('idCount', `${idCounter}`)
    }, [idCounter])

    function addNewPlant(plant) {
        setPlants([...plants, plant])
    }

    function editPlant(plant) {
        setPlants(plants.map((p) => (p.id === plant.id) ? plant : p))
    }

    function deletePlant(id) {
        setPlants(plants.filter((plant) => plant.id == id ? false : true))
    }

    return <Context.Provider value={{
        history,
        plants, setPlants,
        addNewPlant, editPlant, deletePlant
    }}>
        {children}
    </Context.Provider>
}

export default ContextProvider