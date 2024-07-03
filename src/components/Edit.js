import { useContext } from 'react'
import { useParams } from "react-router-dom"
import PlantForm from "./PlantForm"
import { Context } from './context/ContextProvider'

function Edit() {
    const { plants } = useContext(Context)
    const plant = plants.filter((p) => p.id == useParams().id)[0]

    return (
        <PlantForm plant={plant} />
    )
}

export default Edit