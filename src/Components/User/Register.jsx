import axios, {Axios} from 'axios';
import {useState, useEffect} from "react"
import {Link, useNavigate} from 'react-router-dom';

function Register() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function SubmitRegistration() {
        axios.post("http://localhost:5551/register", {
            Name: name,
            Surname: surname,
            Username: username,
            Email: email,
            Password: password
        }).then(res => {
            if (res.status == 200) {
                console.log(res);
                navigate('/login');
            }
        })
    }

    return (
        <div>
            <input type='text' id="name" onChange={(e) => {
                setName(e.target.value)
            }} placeholder="Enter Name"></input>
            <input type='text' id="surname" onChange={(e) => {
                setSurname(e.target.value)
            }} placeholder="Enter Surname"></input>
            <input type='text' id="username" onChange={(e) => {
                setUsername(e.target.value)
            }} placeholder="Enter Username"></input>
            <input type='email' id="email" onChange={(e) => {
                setEmail(e.target.value)
            }} placeholder="Enter E-mail"></input>
            <input type='password' id="password" onChange={(e) => {
                setPassword(e.target.value)
            }} placeholder="Enter Password"></input>
            <button type='submit' onClick={SubmitRegistration}>Register</button>
        </div>
    );
}

export default Register