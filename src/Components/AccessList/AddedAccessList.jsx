import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";

export function AddedAccessList(props) {
    const [userBoxes, setUserBoxes] = useState([])
    const [usernames, setUsernames] = useState([])
    const [changed, setChanged] = useState(false)

    function revokeUserAccess(username, boxId) {
        axios.post("http://localhost:5551/revokeAccessToUser", {
            UserID: Cookies.get('id'),
            AccessId: username,
            BoxId: parseInt(boxId)
        }).then((res) => {
                setChanged(!changed)
                console.log(res)
            }
        ).catch((err) => {
            console.log("No user with that Username")
        })
    }

    useEffect(() => {
        axios.get(`http://localhost:5551/getUserBoxes/${Cookies.get('id')}`).then((res) => {
            setUserBoxes(res.data.allBoxes)
            setUsernames(res.data.usernames)
            console.log(res.data.usernames[0])
        }).catch(err => {
            console.log(err)
        })
    }, [props.accessChanged, changed])

    return (
        <>
            {userBoxes.map((box, i) => (
                <div key={box.boxid}>
                    <p>Box ID: {box.BoxId}</p>
                    <p>Owner ID: {box.OwnerId}</p>
                    <ul>
                        {
                            usernames[i] != null ?
                                usernames[i].map((username) => {
                                    return (
                                        <div key={i}>
                                            <p>Username: {username}</p>
                                            <button onClick={() => revokeUserAccess(username, box.BoxId)}>Revoke
                                                access
                                            </button>
                                        </div>)
                                })
                                : <></>
                        }
                    </ul>
                </div>
            ))}
        </>
    )
}