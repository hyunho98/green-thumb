import { useState, useContext } from "react"
import PlantContainer from "./PlantContainer"
import Search from "./Search"
import { Context } from './context/ContextProvider'

function Home() {
    const { plants } = useContext(Context)
    const [plantSearch, setPlantSearch] = useState("")
    const visiblePlants = plants.filter((plant) => plant.name.toUpperCase().includes(plantSearch.toUpperCase()))

    return (
        <div>
            <Search plantSearch={plantSearch} setPlantSearch={setPlantSearch}/>
            <PlantContainer plants={visiblePlants} />
        </div>
    )
}

export default Home