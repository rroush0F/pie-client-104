import React, {useState} from "react";
import './createPie.css';

const CreatePie = (props) => {
    const [nameOfPie, setNameOfPie] = useState('');
    const [baseOfPie, setBaseOfPie] = useState('');
    const [crust, setCrust] = useState('');
    const [timeToBake, setTimeToBake] = useState(0);
    const [servings, setServings] = useState(0);
    const [rating, setRating] = useState(0);

    const postPie = (e) => {
        e.preventDefault();

        let url = 'http://localhost:4000/pies/create'

        fetch(url, {
            method: 'POST',
            body: JSON.stringify({
                nameOfPie: nameOfPie,
                baseOfPie: baseOfPie,
                crust: crust,
                timeToBake: timeToBake,
                servings: servings,
                rating: rating
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': props.sessionToken
            })
        })
        .then(response => response.json())
        .then(json => {
            console.log(json)
            props.setCreatePie(false);
        })
        .catch(err => console.log(err))
    }
        return(
            <div>
                <form onSubmit={postPie} >
                <input type='text' value={nameOfPie} onChange={(e) => setNameOfPie(e.target.value)} placeholder="Name of Pie" />
                <input type='text' value={baseOfPie} onChange={(e) => setBaseOfPie(e.target.value)} placeholder="Base of Pie" />
                <input type='text' value={crust} onChange={(e) => setCrust(e.target.value)} placeholder="Crust" />
                <input type='number' value={timeToBake} onChange={(e) => setTimeToBake(e.target.value)} placeholder="" />
                <input type='number' value={servings} onChange={(e) => setServings(e.target.value)} placeholder="" />
                <input type='number' value={rating} onChange={(e) => setRating(e.target.value)} placeholder="" />
                <br />
                <button type="submit">Submit</button>
                </form>
            </div>
        )
}

export default CreatePie;