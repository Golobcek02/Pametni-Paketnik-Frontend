import './entries.css';
import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {EntryIcon} from "./EntryIcon";
import {EntryName} from "./EntryName";
import {EntryType} from "./EntryType";

export function Entries() {
    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5551/getEntries/${Cookies.get('id')}`).then(res => {
            console.log(res.data)
            if (res.data !== null) {
                setEntries(res.data.reverse());
            }
        });
    }, [newEntry]);

    function deleteEntry(id) {
        axios.delete(`http://localhost:5551/removeEntry/${id}`).then(res => {
            console.log(res)
            setNewEntry(!newEntry);
        }).catch(error => console.error(error));
    }

    return (<div className="entries-container">
        {entries.length !== 0 ? (entries.map((entry) => (<div className="card" key={entry.id}>
            <div className="card-top-part">
                <div className="left-part">
                    <div className="user-name">
                        <p className="name">Box: {entry.BoxId}</p>
                        <p className="role">
                            <EntryType entryType={entry.EntryType}/>
                        </p>
                    </div>
                    <div className="user-position">
                        <EntryName entryType={entry.EntryType}/>
                        <p className="position">
                            {new Date(entry.TimeAccessed).toLocaleDateString()}{" "}
                            {new Date(entry.TimeAccessed).toLocaleTimeString()}
                        </p>
                    </div>
                </div>
                <div className="right-part">
                    <EntryIcon entryType={entry.EntryType}/>
                </div>
            </div>
            <div className="card-bottom-part">
                <div className="bottom-part">
                    <a
                        onClick={() => deleteEntry(entry.ID)}
                        className="link"
                        style={{color: "#DF2E38"}}
                    >
                        Delete
                    </a>
                </div>
            </div>
        </div>))) : (<div className="card">
            <div className="card-top-part">
                <div className="left-part">
                    <div className="user-name">
                        <p className="name" style={{color: "#DF2E38"}}>YOU HAVE NO ENTRIES</p>
                    </div>
                </div>
            </div>
        </div>)}
    </div>);
}
