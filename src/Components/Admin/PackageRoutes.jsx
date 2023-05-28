import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

const centralStations = require('../../centralStations.json');

export function PackageRoutes() {
    const [nonParsedRoutes, setNonParsedRoutes] = useState("");
    const [boxId, setBoxId] = useState(0);
    const [routeIdInput, setRouteIdInput] = useState("");
    const [selectedStation, setSelectedStation] = useState(null);
    const [boxIds, setBoxIds] = useState('');

    function handleStationAndBoxIdsSubmit() {
        const station = centralStations.find(station => station.place.name === selectedStation);
        if (station && boxIds) {
            const stationString = `${station.place.name}:${station.place.location.latitude},${station.place.location.longitude}`;
            const boxIdsString = boxIds.split(',').join('|').replace(/ /g, "");
            const finalString = `${stationString}|${boxIdsString}`;
            console.log(finalString);

            axios.post('http://localhost:5551/addPackageRoute', {route: finalString})
                .then(response => {
                    console.log(response.data); // Successfully saved
                    // After saving the route, update the status of orders
                    //updateOrderStatus();
                })
                .catch(error => {
                    console.error(error); // Error occurred while saving
                });
        } else {
            console.error('Please select a station and input box IDs');
        }
    }

    function updateOrderStatus() {
        const boxIdsArray = boxIds.split(',');
        Promise.all(boxIdsArray.map(id => {
            const body = {boxId: id, status: 'In Route'};
            return axios.post(`http://localhost:5551/updateOrderStatus`, body);
        })).then(responses => {
            console.log(responses);
        }).catch(err => {
            console.error(err);
        });
    }

    function popFirstStop() {
        axios.post(`http://localhost:5551/popFirstStop/${routeIdInput}`).then((res) => {
            console.log(res);
        }).catch((err) => {
            console.log(err);
        });
    }

    useEffect(() => {
        axios.get(`http://localhost:5551/getUserOrders/${Cookies.get('id')}`, {
            BoxId: parseInt(boxId),
            Status: "Pending"
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }, [])

    return (
        <div className="admin-item">
            <h2>Package Routes</h2>
            <div>
                <input type="text" id="username" placeholder="Enter Route ID"/>
                <button type="submit" onClick={() => popFirstStop()}>
                    Pop First Stop
                </button>
            </div>
            <div>
                <select onChange={(e) => setSelectedStation(e.target.value)}>
                    <option value="">-- Select a Station --</option>
                    {
                        centralStations.map(station => (
                            <option value={station.place.name}>{station.place.name}</option>
                        ))
                    }
                </select>
                <input
                    type="text"
                    onChange={(e) => setBoxIds(e.target.value)}
                    placeholder="Enter Box IDs divided by comma"
                />
                <button type="submit" onClick={handleStationAndBoxIdsSubmit}>
                    Submit
                </button>
            </div>
        </div>
    );
}
