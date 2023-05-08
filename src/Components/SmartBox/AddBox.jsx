import axios from 'axios';
import Cookies from 'js-cookie';
import {useState} from "react";
import {useNavigate} from 'react-router-dom';

function AddBox() {
    const [smartBoxID, setSmartBoxID] = useState('');

    function submitAddBox() {
        axios.post("http://localhost:5551/addUserBox", {
            UserID: Cookies.get("id"),
            SmartBoxID: smartBoxID
        }).then(res => {
            if (res.status === 200) {
                console.log(res);
                alert('Smartbox ID successfully appended to userboxes');
            }
        }).catch(error => {
            console.error(error);
            alert('Error adding smartbox to user');
        });
    }

    return (
        <div>
            <input type='text' id="smartbox_id" onChange={(e) => {
                setSmartBoxID(e.target.value)
            }} placeholder="Enter Smartbox ID"></input>
            <button type='submit' onClick={() => submitAddBox()}>Add Smartbox to User</button>
        </div>
    );
}

export default AddBox;
