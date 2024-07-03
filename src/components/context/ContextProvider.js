import { useState, useEffect, createContext } from 'react'
import { useHistory } from 'react-router-dom'

export const Context = createContext()

function ContextProvider({ children }) {
    const history = useHistory()
    const [plants, setPlants] = useState([])

    useEffect(() => {
        fetch(`https://green-thumb-server.onrender.com/plants`)
            .then((r) => r.json())
            .then((data) => setPlants(data))
    }, [])

    function newPlant(plant) {
        fetch(`https://green-thumb-server.onrender.com/plants`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(plant)
            })
                .then((r) => r.json())
                .then((data) => {
                    setPlants([...plants, data])
                    history.push(`/`)
                })
    }

    function editPlant(plant) {
        fetch(`https://green-thumb-server.onrender.com/plants/${plant.id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(plant)
        })
            .then((r) => r.json())
            .then((data) => {
                setPlants(plants.map((p) => (p.id === data.id) ? data : p))
                history.push(`/`)
            })
    }

    function deletePlant(id) {
        fetch(`https://green-thumb-server.onrender.com/plants/${id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((r) => r.json())
            .then(() => {
                setPlants(plants.filter((plant) => plant.id == id ? false : true))
                history.push(`/`)
            })
    }

    return <Context.Provider value={{
        history,
        plants, setPlants,
        newPlant, editPlant, deletePlant
    }}>
        {children}
    </Context.Provider>
}

export default ContextProvider