import React from "react"
import { useParams } from "react-router-dom"
import PlantForm from "./PlantForm"

function Edit({ plants, setPlants}) {
    const params = useParams()
    const plant = plants.filter((p) => p.id == params.id)[0]

    function onFormSubmit(data) {
        setPlants(plants.map((p) => (p.id === data.id) ? data : p))
    }

    function deletePlant(id) {
        setPlants(plants.filter((plant) => plant.id == id ? false : true))
    }

    return (
        <PlantForm handleFormSubmit={onFormSubmit} plant={plant} deletePlant={deletePlant}/>
    )
}

export default Edit