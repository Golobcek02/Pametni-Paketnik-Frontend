import axios from 'axios';
import Cookies from 'js-cookie';
import {useState} from "react";
import {useNavigate} from 'react-router-dom';

export function AddBoxToMap(props) {
    const [smartBoxID, setSmartBoxID] = useState('');
    const [address, setAddress] = useState('');
    const navigate = useNavigate();

    function submitAddBox() {
        axios.get(`https://api.geoapify.com/v1/geocode/search?text=${address}&format=json&apiKey=635b84cbf55241c6b792a66cd02745a9`).then(responce => {
            console.log(responce.data.results);
            if (responce.data.results.length > 0) {
                axios.post(`${props.API_ENV}/addUserBox`, {
                    UserID: Cookies.get("id"),
                    SmartBoxID: smartBoxID,
                    Lat: responce.data.results[0].lat,
                    Lon: responce.data.results[0].lon
                }).then(res => {
                    if (res.status === 200) {
                        axios.post(`${props.API_ENV}/newEntry`, {
                            DeliveryId: 1,
                            BoxId: parseInt(smartBoxID),
                            Latitude: responce.data.results[0].lat,
                            Longitude: responce.data.results[0].lon,
                            TimeAccessed: Date.now(),
                            LoggerId: Cookies.get('id').toString(),
                            EntryType: "boxAdded"
                        }).then(r => {
                            console.log(r);
                        })
                        window.location.reload();
                        console.log(res);
                    }
                }).catch(error => {
                    console.error(error);
                    alert('Error adding smartbox to user');
                });
            }
        })
    }

    function addOwner() {
        axios.post(`${props.API_ENV}/ClaimBox`, {
            BoxID: parseInt(smartBoxID),
            UserID: Cookies.get('id')
        }).then((res) => {
            console.log(res)
        }).catch(err => {
            console.log(err)
        })
    }

    return (
        <div className="admin-item">
            <h2>Add Box to Map</h2>
            <div>
                <input
                    type="text"
                    id="address_id"
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter your address"
                />
                <input
                    type="text"
                    id="smartbox_id"
                    onChange={(e) => setSmartBoxID(e.target.value)}
                    placeholder="Enter Smartbox ID"
                />
                <button type="submit" onClick={submitAddBox}>
                    Add Smartbox to User
                </button>
            </div>
        </div>
    );
}