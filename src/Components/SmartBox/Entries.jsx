import axios from 'axios';
import {useState, useEffect} from "react"
import Cookies from 'js-cookie';


const data = require('../../SmartBoxRequest.json');


function Entries() {

    const [entries, setEntries] = useState([]);
    const [newEntry, setNewEntry] = useState(false)
    const [customId, setCustomId] = useState(538)
    const [shouldRerender, setShouldRerender] = useState(false);
    // const ourBoxId= 538

    useEffect(() => {
        axios.get(`http://localhost:5551/getEntries/${Cookies.get('id')}`).then(res => {
            console.log(res.data)
            setEntries(res.data);
            setNewEntry(false)
        });
    }, [newEntry, shouldRerender])

    function tryApi() {
        console.log("try api", customId)
        data.boxId = customId;
        axios.post("https://api-d4me-stage.direct4.me/sandbox/v1/Access/openbox", data, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 9ea96945-3a37-4638-a5d4-22e89fbc998f`,
            },
        }).then(response => {
            console.log(response.data);
            const base64string = response.data.data;
            const audio = new Audio("data:audio/mp3;base64," + base64string);
            audio.play();

            axios.post(`http://localhost:5551/newEntry`, {
                DeliveryId: data.deliveryId + 6,
                BoxId: data.boxId,
                Latitude: 64,
                Longitude: 16,
                TimeAccessed: Date.now(),
                OpenerId: Cookies.get('id').toString(),
                EntryType: "boxOpening"
            }).then(res => {
                setNewEntry(true)
            })

        })
            .catch(error => console.error(error));
    }

    function postCustomEntry() {
        axios.post(`http://localhost:5551/newEntry`, {
            DeliveryId: data.deliveryId + 6,
            BoxId: 888,
            Latitude: 64,
            Longitude: 16,
            TimeAccessed: Date.now(),
            LoggerId: Cookies.get('id').toString(),
            EntryType: "boxOpening"
        }).then(res => {
            setNewEntry(true)
        }).catch(err => {

        })
    }

    function deleteEntry(id) {
        axios.delete(`http://localhost:5551/removeEntry/${id}`).then(res => {
            console.log(res)
            setShouldRerender(!shouldRerender);
        }).catch(error => console.error(error));
    }

    return (
        <>
            <input
                type="number"
                placeholder="BoxId"
                value={customId}
                onChange={(e) => {
                    setCustomId(parseInt(e.target.value))
                    e.target.value = ""
                }}
            />
            <button onClick={() => postCustomEntry()}>
                Try entry
            </button>
            <button onClick={() => {
                tryApi();
            }}>Post to api
            </button>
            {
                entries != null ?
                    entries.map((entry, i) => (
                        <>
                            <p key={i}>
                                DeliveryId: {entry.DeliveryId}<br/>
                                BoxId: {entry.BoxId}<br/>
                                Lat: {entry.Latitude}<br/>
                                Lon: {entry.Longitude}<br/>
                                Owner: {entry.OpenerId}<br/>
                                time: {entry.TimeAccessed}
                            </p>
                            <button onClick={() => deleteEntry(entry.ID)}>Delete</button>
                            <hr/>
                        </>
                    )) :
                    <p>Nothing to see yet!</p>
            }
        </>
    );
}

export default Entries;
