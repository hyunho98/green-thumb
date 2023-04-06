import PlantContainer from "./PlantContainer"

function Home({ plants }) {
    return (
        <div>
            <PlantContainer plants={plants} />
        </div>
    )
}

export default Home