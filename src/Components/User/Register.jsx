import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export function Register() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    const navigate = useNavigate();

    function SubmitRegistration() {
        console.log(password, repeatPassword)
        if (password === repeatPassword) {
            axios.post("http://localhost:5551/register", {
                Name: name,
                Surname: surname,
                Username: username,
                Email: email,
                Password: password
            }).then(res => {
                if (res.status === 200) {
                    console.log(res);
                    navigate('/');
                    window.location.reload()
                }
            }).catch(err => {
                alert("Username already exists")
            })
        }
    }

    return (
        <>
            <div className="form form-signup">
                <fieldset>
                    <legend>Please enter your email, password, and password confirmation to sign up.</legend>
                    <div className="input-block">
                        <div className="input-group">
                            <label htmlFor="signup-username">Username</label>
                            <input id="signup-username" type="text" required onChange={(e) => {
                                setUsername(e.target.value)
                            }}/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="signup-email">Email</label>
                            <input id="signup-email" type="email" required onChange={(e) => {
                                setEmail(e.target.value)
                            }}/>
                        </div>
                    </div>
                    <div className="input-block">
                        <div className="input-group">
                            <label htmlFor="signup-name">Name</label>
                            <input id="signup-name" type="text" required onChange={(e) => {
                                setName(e.target.value)
                            }}/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="signup-surname">Surname</label>
                            <input id="signup-surname" type="text" required onChange={(e) => {
                                setSurname(e.target.value)
                            }}/>
                        </div>
                    </div>
                    <div className="input-block">
                        <div className="input-group">
                            <label htmlFor="signup-password">Password</label>
                            <input id="signup-password" type="password" required onChange={(e) => {
                                setPassword(e.target.value)
                            }}/>
                        </div>
                        <div className="input-group">
                            <label htmlFor="signup-password-confirm">Confirm password</label>
                            <input id="signup-password-confirm" type="password" required onChange={(e) => {
                                setRepeatPassword(e.target.value)
                            }}/>
                        </div>
                    </div>
                </fieldset>
                <button type="submit" className="btn-signup" onClick={() => SubmitRegistration()}>Continue</button>
            </div>
        </>
    );
}
