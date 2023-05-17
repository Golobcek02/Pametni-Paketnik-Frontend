import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function AccessList() {
    const [userToGrant, setUserToGrant] = useState('');
    const [boxId, setBoxId] = useState('');
    const [availableBoxes, setAvailableBoxes] = useState([]);


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
        axios.get(`http://localhost:5551/getUserBoxes/${Cookies.get('id')}`).then((res) => {
            console.log(res)
            setAvailableBoxes(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <div>
            <input type='text' id="username" onChange={(e) => {
                setUserToGrant(e.target.value)
            }} placeholder="Enter User To Grant"></input>
            <select id="box" onChange={(e) => {
                setBoxId(e.target.value)
            }}>
                <option value="">Select Box</option>
                {availableBoxes.map(option => (
                    <option key={option.ID} value={option.BoxId}>{option.BoxId}</option>
                ))}
            </select>
            <button type='submit' onClick={() => addUserToAccessList()}>Post</button>
        </div>
    )
}