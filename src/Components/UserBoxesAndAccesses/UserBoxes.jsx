import './userboxes.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {AccessActions} from "./AccessActions";
import {UserBoxesAndAccesses} from "./UserBoxesAndAccesses";
import {AddBox} from "./AddBox";

function UserBoxes(props) {
    const [userBoxes, setUserBoxes] = useState([]);
    const [usernames, setUsernames] = useState([]);
    const [changed, setChanged] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5551/getUserBoxesAndAccesses/${Cookies.get('id')}`).then((res) => {
            setUserBoxes(res.data.allBoxes);
            setUsernames(res.data.usernames);
            console.log(res.data);
        }).catch(err => {
            console.log(err);
        });
    }, [changed]);

    const handlePageUpdate = () => {
        setChanged(!changed);
    };

    return (<>
        {userBoxes.length > 0 ? (<div className="container-boxes">
            <AddBox handlePageUpdate={handlePageUpdate}/>
            <AccessActions userBoxes={userBoxes} handlePageUpdate={handlePageUpdate}/>
            <UserBoxesAndAccesses userBoxes={userBoxes} usernames={usernames}
                                  handlePageUpdate={handlePageUpdate}/>
        </div>) : (<div className="container-boxes">
            <AddBox handlePageUpdate={handlePageUpdate}/>
        </div>)}
    </>);
}

export default UserBoxes;
