import {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function AddBox(props) {

    const [boxId, setBoxId] = useState("")

    function addBox() {
        axios.post("http://localhost:5551/ClaimBox", {
            BoxID: parseInt(boxId), UserID: Cookies.get('id')
        }).then((res) => {
            clearFields();
            props.handlePageUpdate();
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    function clearFields() {
        setBoxId("");
    }

    return (<>
        <div className="action-form"
             style={{width: "fit-content", height: "fit-content", marginLeft: "5%"}}>
            <div className="header">
                <label className="title">Add Your Boxes</label>
            </div>
            <div className="input_container">
                <input type='text' id="username" value={boxId} onChange={(e) => {
                    setBoxId(e.target.value)
                }} placeholder="Enter Your Box Id" className="input_field"></input>
            </div>
            <button className="sign-in_btn" onClick={() => addBox()}>
                <span>Add Box</span>
            </button>
        </div>
    </>)
}