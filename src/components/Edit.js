import { useContext } from 'react'
import { useParams } from "react-router-dom"
import PlantForm from "./PlantForm"
import { Context } from './context/ContextProvider'

function Edit({ plants, setPlants }) {
    const { plants } = useContext(Context)
    const params = useParams()
    const plant = plants.filter((p) => p.id == params.id)[0]

    return (
        <PlantForm plant={plant} />
    )
}

export default Edit