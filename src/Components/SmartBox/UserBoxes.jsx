import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

function UserBoxes() {

    const [userBoxes, setUserBoxes] = useState([])
    const [deletedOrRemoved, setDeletedOrRemoved] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:5551/getUserBoxes/${Cookies.get('id')}`).then(res => {
            console.log(res)
            setUserBoxes(res.data.allBoxes)
        }).catch(error => console.error(error));
    }, [deletedOrRemoved])


    function deleteBox(id) {
        axios.delete(`http://localhost:5551/removeBox/${id}`).then(res => {
            console.log(res)
            setDeletedOrRemoved(!deletedOrRemoved)
            axios.post(`http://localhost:5551/newEntry`, {
                DeliveryId: 2,
                BoxId: id,
                Latitude: 0,
                Longitude: 0,
                TimeAccessed: Date.now(),
                LoggerId: Cookies.get('id').toString(),
                EntryType: "boxDeleted"
            }).then(res => { console.log(res); })
        }).catch(error => console.error(error));
    }

    function removeOwner(id) {
        axios.put(`http://localhost:5551/clearBox/${id}`).then(res => {
            console.log(res)
            setDeletedOrRemoved(!deletedOrRemoved)
            axios.post(`http://localhost:5551/newEntry`, {
                DeliveryId: 2,
                BoxId: id,
                Latitude: 0,
                Longitude: 0,
                TimeAccessed: Date.now(),
                LoggerId: Cookies.get('id').toString(),
                EntryType: "boxRemovedFromOwner"
            }).then(res => { console.log(res); })
        }).catch(error => console.error(error));
    }

    return (
        <>
            {
                userBoxes != null ?
                    userBoxes.map((box, i) => (
                        <>
                            <p key={i}>
                                Box ID: {box.BoxId}
                            </p>
                            <button onClick={() => deleteBox(box.BoxId)}>Delete</button>
                            <button onClick={() => removeOwner(box.BoxId)}>Remove Owner</button>
                            <hr/>
                        </>
                    )) :
                    <p>Nothing to see yet!</p>
            }
        </>
    )
}

export default UserBoxes
