import './userboxes.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {AccessActions} from "./AccessActions";
import {UserBoxesAndAccesses} from "./UserBoxesAndAccesses";

function UserBoxes(props) {

    const [userBoxes, setUserBoxes] = useState([])
    const [usernames, setUsernames] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5551/getUserBoxesAndAccesses/${Cookies.get('id')}`).then((res) => {
            setUserBoxes(res.data.allBoxes)
            setUsernames(res.data.usernames)
            console.log(res.data)
        }).catch(err => {
            console.log(err)
        })
    }, [])

    return (<>
        {userBoxes.length !== 0 ? <div className="container">
            <AccessActions userBoxes={userBoxes}/>
            <UserBoxesAndAccesses userBoxes={userBoxes} usernames={usernames}/>
        </div> : <></>}

    </>)
}

export default UserBoxes