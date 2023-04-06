import React from "react"
import { Card, Container } from "semantic-ui-react"
import PlantCard from "./PlantCard"

function PlantContainer({ plants }) {
    const plantList = plants.map((plant) => 
        <PlantCard 
            key={plant.id}
            image={plant.image}
            name={plant.name} 
            type={plant.type} 
        />
    )

    return (
        <Container>
            <Card.Group itemsPerRow={4}>
                {plantList}
            </Card.Group>
        </Container>
    )
}

export default PlantContainer