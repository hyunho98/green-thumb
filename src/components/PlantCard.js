import "../App.css"
import React from "react"
import { Card } from "semantic-ui-react"

function PlantCard({ image, name, type }) {
    return (
        <Card>
            <div>
                <div className="plant-image">
                    <img src={image} alt="image missing" />
                </div>
                <div className="content">
                    <h3 className="plantName">{name}</h3>
                    <h4 className="plantType">{type.toUpperCase()}</h4>
                </div>
            </div>
        </Card>
    )
}

export default PlantCard