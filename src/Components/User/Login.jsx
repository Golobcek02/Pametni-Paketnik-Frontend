import axios, { Axios } from 'axios';
import { useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  function SubmitLogIn() {
    axios.post("http://localhost:5551/login", {
      Username: username,
      Password: password
    }).then(res => {
      if (res.status == 200) {
        console.log(res.data);
        let expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 7);
        Cookies.set('id', res.data.ID, { expires: expiryDate });
        Cookies.set('username', res.data.Username, { expires: expiryDate });
        navigate("/");
      }
    })
  }

  return (
    <div>
      <input type='text' id="username" onChange={(e) => { setUsername(e.target.value) }} placeholder="Enter Username"></input>
      <input type='password' id="password" onChange={(e) => { setPassword(e.target.value) }} placeholder="Enter Password"></input>
      <button type='submit' onClick={SubmitLogIn}>Post</button>
    </div>
  );
}

export default Login;