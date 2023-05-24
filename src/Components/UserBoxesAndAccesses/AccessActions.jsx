import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function AccessActions(props) {

    const [availableBoxes, setAvailableBoxes] = useState([]);
    const [boxId, setBoxId] = useState('');
    const [username, setUsername] = useState('');

    function addUserToAccessList() {
        axios.post("http://localhost:5551/addAccessToUser", {
            UserID: Cookies.get('id'), AccessId: username, BoxId: parseInt(boxId)
        }).then((res) => {
            console.log(res)
            axios.post(`http://localhost:5551/newEntry`, {
                DeliveryId: 4,
                BoxId: parseInt(boxId),
                Latitude: 0,
                Longitude: 0,
                TimeAccessed: Date.now(),
                LoggerId: Cookies.get('id').toString(),
                EntryType: "accessAdded"
            }).then(r => {
                console.log(r);
            })
            props.onAccessChange();
            clearFields();
        }).catch((err) => {
            console.log("No user with that Username")
        })
    }


    function revokeUserAccess() {
        axios.post("http://localhost:5551/revokeAccessToUser", {
            UserID: Cookies.get('id'), AccessId: username, BoxId: parseInt(boxId)
        }).then((res) => {
            axios.post(`http://localhost:5551/newEntry`, {
                DeliveryId: 4,
                BoxId: parseInt(boxId),
                Latitude: 0,
                Longitude: 0,
                TimeAccessed: Date.now(),
                LoggerId: Cookies.get('id').toString(),
                EntryType: "accessRevoked"
            }).then(r => {
                console.log(r);
            })
            clearFields()
            console.log(res)
        }).catch((err) => {
            console.log("No user with that Username")
        })
    }

    function removeOwner() {
        axios.put(`http://localhost:5551/clearBox/${boxId}`).then(res => {
            console.log(res)
            axios.post(`http://localhost:5551/newEntry`, {
                DeliveryId: 2,
                BoxId: parseInt(boxId),
                Latitude: 0,
                Longitude: 0,
                TimeAccessed: Date.now(),
                LoggerId: Cookies.get('id').toString(),
                EntryType: "boxRemovedFromOwner"
            }).then(res => {
                console.log(res);
                clearFields()
            })
        }).catch(error => console.error(error));
    }


    function clearFields() {
        setUsername('');
        setBoxId('');
    }

    useEffect(() => {
        setAvailableBoxes(props.userBoxes)
    }, [username, boxId, props])

    return (<>
        <div className="action-form">
            <div className="header">
                <label className="title">Grant, Revoke User Access To Your Box or Remove Your Box</label>
            </div>
            <div className="input_container">
                <input type='text' id="username" onChange={(e) => {
                    setUsername(e.target.value)
                }} value={username} placeholder="Enter User To Grant" className="input_field"></input>
                <select id="box" onChange={(e) => {
                    setBoxId(e.target.value)
                }} value={boxId} className="input_field">
                    <option value="">Select Box</option>
                    {availableBoxes.map(option => (
                        <option key={option.ID} value={option.BoxId}>{option.BoxId}</option>))}
                </select>
            </div>
            <button className="sign-in_btn" onClick={() => addUserToAccessList()}>
                <span>Add Access</span>
            </button>
            <button className="revoke_btn" onClick={() => revokeUserAccess()}>
                <span>Revoke Access</span>
            </button>
            <button className="revoke_btn" onClick={() => removeOwner()}>
                <span>Remove Ownership</span>
            </button>
        </div>
    </>)
}