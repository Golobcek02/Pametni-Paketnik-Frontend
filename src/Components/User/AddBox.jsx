import axios from 'axios';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function AddBox() {
    const [userID, setUserID] = useState('');
    const [smartBoxID, setSmartBoxID] = useState('');

    function submitAddBox() {
        axios.post("http://localhost:5551/addUserBox", {
            user_id: userID,
            smartbox_id: smartBoxID
        }).then(res => {
            if (res.status === 200) {
                console.log(res);
                alert('Smartbox ID successfully appended to userboxes');
                // navigate to another page if needed
            }
        }).catch(error => {
            console.error(error);
            alert('Error adding smartbox to user');
        });
    }

    return (
        <div>
            <input type='text' id="user_id" onChange={(e) => { setUserID(e.target.value) }} placeholder="Enter User ID"></input>
            <input type='text' id="smartbox_id" onChange={(e) => { setSmartBoxID(e.target.value) }} placeholder="Enter Smartbox ID"></input>
            <button type='submit' onClick={submitAddBox}>Add Smartbox to User</button>
        </div>
    );
}

export default AddBox;
