import React, { useState, useEffect } from "react"
import { Card, Container } from "semantic-ui-react"
import PlantCard from "./PlantCard"

function PlantContainer({ plants }) {
    const [timer, setTimer] = useState(Date.now())

    useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timer => timer + 1000)
        }, 1000)

        return (() => clearInterval(interval))
    }, [timer])

    const plantList = plants.map((plant) => 
        <PlantCard 
            key={plant.id}
            id={plant.id}
            image={plant.image}
            name={plant.name}
            alert={plant.alert}
            bloom={plant["bloom-date"]}
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