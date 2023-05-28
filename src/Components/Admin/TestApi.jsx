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
        axios.post("https://api-d4me-stage.direct4.me/sandbox/v1/Access/openbox", data, {
            headers: {
                'Content-Type': 'application/json', 'Authorization': `Bearer 9ea96945-3a37-4638-a5d4-22e89fbc998f`,
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
                LoggerId: Cookies.get('id').toString(),
                EntryType: "boxOpening"
            }).then(res => {
                setNewEntry(true)
            })

        })
            .catch(error => console.error(error));
    }

    function postCustomId() {
        console.log(customId)
        tryApi()
        setCustomId(538)
    }

    return (
        <div className="admin-item">
            <h2>Test API</h2>
            {/*<input*/}
            {/*    type="number"*/}
            {/*    placeholder="Box ID"*/}
            {/*    onChange={(e) => {*/}
            {/*        // Handle custom ID input change*/}
            {/*    }}*/}
            {/*/>*/}
            <button onClick={postCustomId}>Custom ID</button>
            <button onClick={tryApi}>Post to API</button>
        </div>
    );
}

export default Entries;
