import React from "react"
import { Form, Label } from "semantic-ui-react";

function PlantForm({ handleFormSubmit }) {
    function submitHandler(e) {
        e.preventDefault()
    
        fetch(`http://localhost:3000/plants`,{
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            "name": e.target.name.value ? e.target.name.value : "Mystery Plant",
            "type": e.target.type.value ? e.target.name.value : "No Type",
            "image": (e.target.image.value ? e.target.image.value : "https://art.pixilart.com/bd06a316a4ad6b2.png"),
            alert: {
              time: (e.target.timer.value * 3600000),
              date: (Date.now() + (e.target.timer.value * 3600000))
            },
            "bloom-date": e.target.date.value
          })
        })
          .then((r) => r.json())
          .then((data) => {
            handleFormSubmit(data)
          })
      }
    
      return (
        <div>
          <h3>Add a New Plant!</h3>
          <Form className="plantForm" onSubmit={submitHandler} >
                <Form.Input
                    label="Plant Image url"
                    placeholder="url"
                    name="image"
                />
                <Form.Input label="Plant Name" placeholder="Plant Name" name="name" />
                <Form.Input label="Plant Type" placeholder="Plant Type" name="type" />
                <Form.Input
                label="Timer"
                type="number"
                placeholder="Hours"
                min={0}
                name="timer"
                />
                <Form.Input 
                    label="Bloom Date" 
                    type="date" 
                    value={new Date().toISOString().slice(0,10)} 
                    min={new Date().toISOString().slice(0,10)}
                    name="date"
                />

            <Form.Button>Submit</Form.Button>
          </Form>
        </div>
      );
}

export default PlantForm