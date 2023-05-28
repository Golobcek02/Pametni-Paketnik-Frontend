import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export function Login(props) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    function SubmitLogIn() {
        axios.post(`${props.API_ENV}/login`, {
            Username: username, Password: password
        }).then(res => {
            if (res.status == 200) {
                console.log(res.data);
                let expiryDate = new Date();
                expiryDate.setDate(expiryDate.getDate() + 7);
                Cookies.set('id', res.data.ID, {expires: expiryDate});
                Cookies.set('username', res.data.Username, {expires: expiryDate});
                navigate("/");
                window.location.reload();
            }
        })
    }

    return (<>
        <div className="form form-login">
            <fieldset>
                <legend>Please, enter your email and password for login.</legend>
                <div className="input-block">
                    <label htmlFor="login-email">Username</label>
                    <input id="username" type="username" required onChange={(e) => {
                        setUsername(e.target.value)
                    }}/>
                </div>
                <div className="input-block">
                    <label htmlFor="login-password">Password</label>
                    <input id="login-password" type="password" required onChange={(e) => {
                        setPassword(e.target.value)
                    }}/>
                </div>
            </fieldset>
            <button type="submit" className="btn-login" onClick={() => SubmitLogIn()}>Login</button>
        </div>
    </>)
}