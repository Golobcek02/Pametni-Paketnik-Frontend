import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function AccessList() {
    const [userToGrant, setUserToGrant] = useState('');
    const [boxId, setBoxId] = useState('');


    function addUserToAccessList() {
        axios.post("http://localhost:5551/addAccessToUser", {
            UserID: Cookies.get('id'),
            AccessId: userToGrant,
            BoxId: parseInt(boxId)
        }).then((res) => {
                console.log(res)
            }
        ).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        // axios.post("http://localhost:5551", {})
    }, [])

    return (
        <div>
            <input type='text' id="username" onChange={(e) => {
                setUserToGrant(e.target.value)
            }} placeholder="Enter User To Grant"></input>
            <input type='text' id="password" onChange={(e) => {
                setBoxId(e.target.value)
            }} placeholder="Enter Box Id"></input>
            <button type='submit' onClick={() => addUserToAccessList()}>Post</button>
        </div>
    )
}