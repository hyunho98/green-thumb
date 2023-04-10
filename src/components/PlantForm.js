import React, { useState } from "react"
import { Form, Button } from "semantic-ui-react"
import { Redirect } from "react-router-dom"

function PlantForm({ handleFormSubmit, plant=null, deletePlant=null }) {
    const welcomeMessage = (plant ? <h3>Editing Plant</h3> : <h3>Create a New Plant</h3>)
    const [redirect, setRedirect] = useState(false)
    const deleteButton = <Button 
        onClick={deleteHandler} 
        color="red" 
        style={{margin: "20px"}}>
        Delete Plant
    </Button>

    const imageHolder = plant ? plant.image : "Image Url"
    const nameHolder = plant ? plant.name : "Plant Name"
    const typeHolder = plant ? plant.type : "Plant Type"
    const hourHolder = plant ? (plant.alert.time / 3600000) + " Hours" : "Hours"
    const [dateHold, setDateHold] = useState(plant ? plant["bloom-date"] : new Date().toISOString().slice(0,10))

    function submitHandler(e) {
        e.preventDefault()
        console.log(dateHold)
        const fetchBody = {
            "name": e.target.name.value ? e.target.name.value : nameHolder,
            "type": e.target.type.value ? e.target.type.value : typeHolder,
            "image": e.target.image.value ? e.target.image.value : (plant ? plant.image : "https://art.pixilart.com/bd06a316a4ad6b2.png"),
            "alert": {
                "time": e.target.timer.value ? parseInt(e.target.timer.value) * 3600000 : (plant ? plant.alert.time : 0),
                "date": e.target.timer.value ? (e.target.timer.value * 3600000) + Date.now() : (plant ? plant.alert.date : Date.now())
            },
            "bloom-date": dateHold
        }

        if(plant) {
            fetch(`http://localhost:3000/plants/${plant.id}`,{
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fetchBody)
            })
                .then((r) => r.json())
                .then((data) => handleFormSubmit(data))
        } else {
            fetch(`http://localhost:3000/plants`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(fetchBody)
            })
                .then((r) => r.json())
                .then((data) => handleFormSubmit(data))
        }

        setRedirect(true)
    }

    function deleteHandler() {
        fetch(`http://localhost:3000/plants/${plant.id}`,{
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((r) => r.json())
            .then(() => {
                deletePlant(plant.id)
            })
    }

      if (redirect) return <Redirect to="/" />
    
      return (
        <div>
          {welcomeMessage}
          <Form className="plantForm" onSubmit={submitHandler} >
                <Form.Input
                    label="Plant Image url"
                    placeholder={imageHolder}
                    name="image"
                />
                <Form.Input label="Plant Name" placeholder={nameHolder} name="name" />
                <Form.Input label="Plant Type" placeholder={typeHolder} name="type" />
                <Form.Input
                label="Timer"
                type="number"
                placeholder={hourHolder}
                min={0}
                name="timer"
                />
                <Form.Input
                    onChange={(e) => setDateHold(e.target.value)}
                    label="Bloom Date" 
                    type="date" 
                    value={dateHold} 
                    min={new Date().toISOString().slice(0,10)}
                    name="date"
                />

            <Form.Button>Submit</Form.Button>
          </Form>
          {plant ? deleteButton : null}
        </div>
      )
}

export default PlantForm