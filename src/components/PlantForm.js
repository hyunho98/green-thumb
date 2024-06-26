import { useState, useContext } from "react"
import { Form, Button } from "semantic-ui-react"
import { Context } from './context/ContextProvider'

function PlantForm({ plant=null }) {
    const { history, addNewPlant, editPlant, deletePlant, idCounter }= useContext(Context)
    const welcomeMessage = (plant ? <h3>Editing Plant</h3> : <h3>Create a New Plant</h3>)

    const [imageHold, setImageHold] = useState(plant ? plant.image : null)
    const [nameHold, setNameHold] = useState(plant ? plant.name : null)
    const [typeHold, setTypeHold] = useState(plant ? plant.type : null)
    const [hourHold, setHourHold] = useState(plant ? (plant.alert.time / 3600000) : null)
    const dateHold = plant ? plant["bloom-date"] : new Date().toISOString().slice(0,10)
    const idHold = plant ? plant.id : idCounter

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
            "bloom-date": e.target.date.value ? e.target.date.value : dateHold,
            "id": idHold
        }

        if(plant) {
            // fetch(`https://green-thumb-server.onrender.com/plants/${plant.id}`,{
            //     method: "PATCH",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(fetchBody)
            // })
            //     .then((r) => r.json())
            //     .then((data) => {
            //         editPlant(data)
            //         history.push(`/`)
            //     })
            editPlant(fetchBody)
            history.push('/')
        } else {
            // fetch(`https://green-thumb-server.onrender.com/plants`,{
            //     method: "POST",
            //     headers: {
            //         "Content-Type": "application/json"
            //     },
            //     body: JSON.stringify(fetchBody)
            // })
            //     .then((r) => r.json())
            //     .then((data) => {
            //         addNewPlant(data)
            //         history.push(`/`)
            //     })
            addNewPlant(fetchBody)
            history.push('/')
        }
    }

    function deleteHandler() {
        // fetch(`https://green-thumb-server.onrender.com/plants/${plant.id}`,{
        //     method: "DELETE",
        //     headers: {
        //         "Content-Type": "application/json"
        //     }
        // })
        //     .then((r) => r.json())
        //     .then(() => {
        //         deletePlant(plant.id)
        //         history.push(`/`)
        //     })
        deletePlant(plant.id)
        history.push('/')
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