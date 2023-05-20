import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
const centralStations = require('../../centralStations.json');
export function PackageRoutes() {
    const [nonParsedRoutes, setNonParsedRoutes] = useState("");
    const [boxId, setBoxId] = useState(0);
    const [routeIdInput, setRouteIdInput] = useState("");
    const [selectedStation, setSelectedStation] = useState(null);
    const [boxIds, setBoxIds] = useState('');

    /*function addRoutes() {
        const parsedRoutes = nonParsedRoutes.split(",").map(route => route.trim());
        let coordinates = []
        parsedRoutes.map((location, i) => {
            axios.post(`https://api.geoapify.com/v1/geocode/search?text=${location}&format=json&apiKey=635b84cbf55241c6b792a66cd02745a9`).then((res) => {
                console.log(res)
                coordinates[i] = `${res.data.results[0].lat}|${res.data.results[0].lat}`
            }).catch(err=>{
                alert('No such route could be established');
            })
        })
        console.log("coordinates", coordinates)
        if(coordinates.length>0){
            axios.post("http://localhost:5551/addPackageRoute", { Stops: coordinates }).then((res) => {
                axios.post(`http://localhost:5551/newEntry`, {
                    DeliveryId:  2,
                    BoxId: 0,
                    Latitude: 0,
                    Longitude: 0,
                    TimeAccessed: Date.now(),
                    LoggerId: Cookies.get('id').toString(),
                    EntryType: "packageRouteAdded"
                }).then(res => { console.log(res); })
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        }
    }*/
    function handleStationAndBoxIdsSubmit() {
        const station = centralStations.find(station => station.place.name === selectedStation);
        if (station && boxIds) {
            const stationString = `${station.place.name}:${station.place.location.longitude},${station.place.location.latitude}`;
            const boxIdsString = boxIds.split(',').join('|').replace(/ /g, "");
            const finalString = `${stationString}|${boxIdsString}`;
            console.log(finalString);

            axios.post('http://localhost:5551/addPackageRoute', { route: finalString })
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

    /*function updateOrder() {
        const parsedRoutes = nonParsedRoutes.split(",").map((route) => route.trim());
        const coordinates = Array(parsedRoutes.length);

        Promise.all(
            parsedRoutes.map((location, i) =>
                axios
                    .get(
                        `https://api.geoapify.com/v1/geocode/search?text=${location}&format=json&apiKey=635b84cbf55241c6b792a66cd02745a9`
                    )
                    .then((res) => {
                        console.log(res)
                        coordinates[i] = `${res.data.results[0].lat},${res.data.results[0].lon}`;
                    })
            )
        )
            .then(() => {
                console.log(coordinates);
                console.log("JSON Body: ", coordinates);
                axios.post(`http://localhost:5551/updateOrderRoute/${boxId}`, coordinates).then((res) => {
                    axios.post(`http://localhost:5551/newEntry`, {
                        DeliveryId: 2,
                        BoxId: boxId,
                        Latitude: 0,
                        Longitude: 0,
                        TimeAccessed: Date.now(),
                        LoggerId: Cookies.get('id').toString(),
                        EntryType: "orderRouteUpdated"
                    }).then(res => { console.log(res); })
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
            })
            .catch((error) => {
                console.log(error);
            });

    }*/
    function updateOrderStatus() {
        const boxIdsArray = boxIds.split(',');
        Promise.all(boxIdsArray.map(id => {
            const body = { boxId: id, status: 'In Route' };
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
        <>
            <div>
                <input
                    type="text"
                    id="username"
                    onChange={(e) => {
                        setRouteIdInput(e.target.value);
                    }}
                    placeholder="Enter Route ID"
                />
                <button type="submit" onClick={() => popFirstStop()}>
                    Pop First Stop
                </button>
            </div>
            <div>
                <select onChange={e => setSelectedStation(e.target.value)}>
                    <option value="">-- Select a Station --</option>
                    {
                        centralStations.map(station => (
                            <option value={station.place.name}>{station.place.name}</option>
                        ))
                    }
                </select>
                <input
                    type="text"
                    onChange={e => setBoxIds(e.target.value)}
                    placeholder="Enter Box IDs divided by comma"
                />
                <button type="submit" onClick={() => handleStationAndBoxIdsSubmit()}>
                    Submit
                </button>
            </div>
        </>
    );
}
