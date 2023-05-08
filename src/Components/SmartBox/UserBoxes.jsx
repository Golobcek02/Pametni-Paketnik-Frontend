import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

function UserBoxes() {

    const [userBoxes, setUserBoxes] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5551/getUserBoxes/${Cookies.get('id')}`).then(res => {
            console.log(res)
            setUserBoxes(res.data)
        }).catch(error => console.error(error));
    }, [])


    function deleteBox(id) {
        axios.delete(`http://localhost:5551/removeBox/${id}`).then(res => {
            console.log(res)
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
                            <hr/>
                        </>
                    )) :
                    <p>Nothing to see yet!</p>
            }
        </>
    )
}

export default UserBoxes