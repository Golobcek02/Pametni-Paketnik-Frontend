import './entries.css'
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function Entries() {

    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5551/getEntries/${Cookies.get('id')}`).then(res => {
            console.log(res.data)
            if(res.data !== null) {
                setEntries(res.data.reverse());
            }});
    }, [newEntry]);


    function deleteEntry(id) {
        axios.delete(`http://localhost:5551/removeEntry/${id}`).then(res => {
            console.log(res)
            setNewEntry(!newEntry)
        }).catch(error => console.error(error));
    }

    return (
        <div className="entries-container">
            {entries.length !== 0 ? (entries.map((entry) => (<div className="card" key={entry.id}>
                <div className="card-top-part">
                    <div className="left-part">
                        <div className="user-name">
                            <p className="name">Box: {entry.BoxId}</p>
                            <p className="role">{entry.EntryType === "boxOpening" ? "Opening" : entry.EntryType === "boxDeleted" ? "Deleted" : "misc"}</p>
                        </div>
                        <div className="user-position">
                            <p className="position">{entry.EntryType}</p>
                            <p className="position">{new Date(entry.TimeAccessed).toLocaleDateString()} {new Date(entry.TimeAccessed).toLocaleTimeString()}</p>
                        </div>
                    </div>
                    <div className="right-part">
                        <div className="user-photo">
                            {entry.EntryType === "boxOpening" ? (<img src="/green.jpg" className="photo"
                                                                      alt="Green"/>) : entry.EntryType === "boxDeleted" ? (
                                <img src="/red.png" className="photo" alt="Red"/>) : (
                                <img src="/orange.jpg" className="photo" alt="Orange"/>)}
                        </div>
                    </div>
                </div>
                <div className="card-bottom-part">
                    <div className="bottom-part">
                        <a onClick={() => deleteEntry(entry.ID)} className="link"
                           style={{color: "#DF2E38"}}>
                            Delete
                        </a>
                    </div>
                </div>
            </div>))) : (<div className="entries-container">YOU HAVE NO ENTRIES</div>)}
        </div>)
}
