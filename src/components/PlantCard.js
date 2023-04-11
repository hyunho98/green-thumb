import "../App.css"
import React, { useState } from "react"
import { Card, Button } from "semantic-ui-react"
import { Redirect } from "react-router-dom"

function PlantCard({ id, image, name, type, alert, bloom }) {
    const [redirect, setRedirect] = useState(false)
    const [alertTimer, setAlertTimer] = useState(new Date(alert.date))
    const bloomDate = bloom
    const timeLeft = (alertTimer - Date.now()) > 0 ? (alertTimer - Date.now()) / 1000 : 0
    const hours = Math.floor((timeLeft / 3600))
    const minutes = Math.floor((timeLeft % (3600)) / (60))
    const seconds = Math.floor((timeLeft % (60)))

    function resetHandler() {
        fetch(`http://localhost:3000/plants/${id}`,{
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                alert: {
                    time: alert.time,
                    date: (Date.now() + alert.time)
                }
            })
        })
            .then((r) => r.json())
            .then((data) => setAlertTimer(data.alert.date))
    }

    function editHandler() {
        setRedirect(() => true)
    }

    if (redirect) return <Redirect to={`/edit/${id}`} />

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
                    <h4 className="plantBloom">{bloomDate}</h4>
                    <Button onClick={resetHandler} className="resetButton" basic color="green">
                        Reset
                    </Button>
                    <Button onClick={editHandler} className="editButton" basic color="green">
                        Edit
                    </Button>
                </div>
            </div>
        </Card>
    )
}

export default PlantCard