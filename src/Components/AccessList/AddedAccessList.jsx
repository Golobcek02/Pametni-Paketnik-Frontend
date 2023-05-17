import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";

export function AddedAccessList() {
    const [userBoxes, setUserBoxes] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5551/getUserBoxes/${Cookies.get('id')}`).then((res) => {
            console.log(res)
            setUserBoxes(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (
        <>
            {userBoxes.map((box) => (
                <div key={box.boxid}>
                    <p>Box ID: {box.BoxId}</p>
                    <p>Owner ID: {box.OwnerId}</p>
                    <ul>
                        {
                            box.AccessIds != null ?
                                box.AccessIds.map((id) => (
                                    <li key={id}>{id}</li>
                                )) : <></>}
                    </ul>
                </div>
            ))}
        </>
    )
}