import "../App.css"
import React, { useState } from "react"
import { Card } from "semantic-ui-react"

function PlantCard({ image, name, type, alert, bloom, timer }) {
    const [bloomDate, setBloomDate] = useState(new Date(bloom))
    const timeLeft = (bloomDate.getTime() - timer) / 1000
    const hours = Math.floor((timeLeft / 3600))
    const minutes = Math.floor((timeLeft % (3600)) / (60))
    const seconds = Math.floor((timeLeft % (60)))

    const untilBloom = ""
    return (
        <Card>
            <div>
                <div className="plant-image">
                    <img src={image} alt="image missing" />
                </div>
                <div className="content">
                    <h3 className="plantName">{name}</h3>
                    <h4 className="plantType">{type.toUpperCase()}</h4>
                    <h4 className="plantAlert">Time to Water</h4>
                    <h4 className="plantAlert">{hours + "h " + minutes + "m " + seconds + "s"}</h4>
                    <h4 className="plantBloom"> Bloom Date</h4>
                    <h4 className="plantBloom">{`${bloomDate.getMonth() + 1}-${bloomDate.getDay()}-${bloomDate.getFullYear()}`}</h4>
                </div>
            </div>
        </Card>
    )
}

export default PlantCard