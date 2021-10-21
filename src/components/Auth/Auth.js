import React, {useState} from 'react';
import './auth.css';

const Auth = (props) => {

    const [firstName, setFirstName] = useState(''); //setFirstname = state changer function
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [login, setLogin] = useState(true);

const title = () => {
    return !login ? 'Signup' : 'Login'
}

const loginToggle = (e) => {
    e.preventDefault();

    setLogin(!login)

    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
}

const signupFields = () => !login ?  //  ! before login for "not login" aka sign up
(
    <div>
        <label htmlFor="firstName">First Name:</label>
                <br/>
                <input type='text' id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <br/>
                <label htmlFor="lastName">Last Name:</label>
                <br/>
                <input type="text" id ="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} />
    </div>
) : null //for ternary (displays nothing if false)

const handleSubmit = event => {
    event.preventDefault();

    let reqBody = login ?
        {
            email: email, 
            password: password,
        } :
        {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password
        }

        let url = login ?
        'http://localhost:4000/user/login' :
        'http://localhost:4000/user/register';

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(reqBody),
            headers: new Headers({
                'Content-Type' : 'application/json'
            })
        })
        .then(response => response.json())
        .then(json => props.updateLocalStorage(json.token))
        .catch(err => console.log(err))
}

    return(
        <div>
            <form>
                <button onClick={loginToggle}>Login / Signup Toggle</button>
                <br/>
                <h1>{title()}</h1>
                {signupFields()}
                <label htmlFor="email">Email:</label>
                <br/>
                <input type='text' id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <br/>
                <label htmlFor="password">Password:</label>
                <br/>
                <input type="password" id ="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <br />
                <button type="submit" onClick={handleSubmit}>Submit</button>
            </form>
        </div>
    )

}

export default Auth;