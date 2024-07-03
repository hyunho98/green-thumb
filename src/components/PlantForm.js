import { useState, useContext } from "react"
import { Form, Button } from "semantic-ui-react"
import { Context } from './context/ContextProvider'

function PlantForm({ plant=null }) {
    const { newPlant, editPlant, deletePlant }= useContext(Context)
    const welcomeMessage = (plant ? <h3>Editing Plant</h3> : <h3>Create a New Plant</h3>)

    const [imageHold, setImageHold] = useState(plant ? plant.image : null)
    const [nameHold, setNameHold] = useState(plant ? plant.name : null)
    const [typeHold, setTypeHold] = useState(plant ? plant.type : null)
    const [hourHold, setHourHold] = useState(plant ? (plant.alert.time / 3600000) : null)
    const dateHold = plant ? plant["bloom-date"] : new Date().toISOString().slice(0,10)

    function submitHandler(e) {
        e.preventDefault()
        const fetchBody = {
            "name": nameHold ? nameHold : "Plant Name",
            "type": typeHold ? typeHold : "Plant Type",
            "image": imageHold ? imageHold : (plant ? plant.image : "https://art.pixilart.com/bd06a316a4ad6b2.png"),
            "alert": {
                "time": hourHold ? parseInt(hourHold) * 3600000 : (plant ? plant.alert.time : 0),
                "date": hourHold ? (hourHold * 3600000) + Date.now() : (plant ? plant.alert.date : Date.now())
            },
            "bloom-date": e.target.date.value ? e.target.date.value : dateHold
        }

        if(plant) {
            editPlant(fetchBody)
        } else {
            newPlant(fetchBody)
        }
    }

    function deleteHandler() {
        deletePlant(plant.id)
    }
    
    return (
        <div>
            {welcomeMessage}
            <Form className="plantForm" onSubmit={submitHandler} >
                <Form.Input
                    onChange={(e) => setImageHold(e.target.value)}
                    label="Plant Image url"
                    placeholder="Image Url"
                    name="image"
                    value={imageHold}
                />
                <Form.Input
                    onChange={(e) => setNameHold(e.target.value)}
                    label="Plant Name" 
                    placeholder="Plant Name" 
                    name="name" 
                    value={nameHold}
                />
                <Form.Input 
                    onChange={(e) => setTypeHold(e.target.value)}
                    label="Plant Type" 
                    placeholder="Plant Type" 
                    name="type" 
                    value={typeHold}
                />
                <Form.Input
                    onChange={(e) => setHourHold(e.target.value)}
                    label="Timer (Hours)"
                    type="number"
                    placeholder="Hours"
                    min={0}
                    name="timer"
                    value={hourHold}
                />
                <Form.Input
                    label="Bloom Date" 
                    type="date" 
                    min={new Date().toISOString().slice(0,10)}
                    name="date"
                />
                <Form.Button>Submit</Form.Button>
            </Form>
            {plant ? 
                <Button 
                    onClick={deleteHandler} 
                    color="red" 
                    style={{margin: "20px"}}>
                    Delete Plant
                </Button> 
                : null
            }
        </div>
    )
}

export default PlantForm