import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useMap} from "react-leaflet";
import L, {latLng} from "leaflet"

export function OrderRoutes(props) {

    const [stops, setStops] = useState([])
    // const map = useMap()


    useEffect(() => {
        console.log(props)
        axios
            .get(`http://localhost:5551/getUserOrderRoutes/${Cookies.get('id')}`)
            .then((res) => {
                const stopsArray = res.data.map((order) => {
                    return order.Stops
                });
                console.log(stopsArray);
                setStops(stopsArray);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    function getRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r},${g},${b})`;
    }

    const yourBoxStop = L.icon({
        iconUrl: 'your_box.png', iconSize: [28, 28],
    });
    const intermediateStopIcon = L.icon({
        iconUrl: "box.png", iconSize: [28, 28],
    });
    const currentStopIcon = L.icon({
        iconUrl: "truck.svg", iconSize: [28, 28],
    });

    useEffect(() => {
        if (stops.length > 0) {
            stops.forEach((stop) => {
                const stopString = stop.join('|').replace(/ /g, "");
                console.log(stopString);
                // Perform other operations with the stop string
                axios.get(`https://api.geoapify.com/v1/routing?waypoints=${stopString}&mode=light_truck&format=json&apiKey=635b84cbf55241c6b792a66cd02745a9`)
                    .then((res) => {
                        const routeCoordinates = res.data.results[0].geometry;
                        stop.forEach((coords, index) => {
                            const LatLon = coords.replace(/ /g, "").split(",");
                            const userBoxOnOrder = props.boxes.filter(value => value.Latitude.toFixed(8) === parseFloat(LatLon[0]).toFixed(8) && value.Longitude.toFixed(8) === parseFloat(LatLon[1]).toFixed(8));

                            if (userBoxOnOrder.length > 0) {
                                L.marker([userBoxOnOrder[0].Latitude + 0.00005, userBoxOnOrder[0].Longitude + 0.00005], {icon: yourBoxStop}).addTo(props.map);
                            } else if (index === 0) {
                                L.marker([parseFloat(LatLon[0]), parseFloat(LatLon[1])], {icon: currentStopIcon}).addTo(props.map);
                            } else {
                                L.marker([parseFloat(LatLon[0]), parseFloat(LatLon[1])], {icon: intermediateStopIcon}).addTo(props.map);
                            }
                        });

                        const polyline = L.polyline(routeCoordinates, {
                            'color': getRandomColor(), weight: 6
                        }).addTo(props.map);
                        props.map.fitBounds(polyline.getBounds());

                        const hours = Math.floor((res.data.results[0].time + 1200) / 3600);
                        res.data.results[0].time %= 3600;
                        const minutes = Math.floor(res.data.results[0].time / 60);
                        const remainingSeconds = Math.round(res.data.results[0].time % 60);

                        polyline.bindPopup("Estimated time of delivery: " + hours + "h " + minutes + "min " + remainingSeconds + "sec<br>Total route distance: " + res.data.results[0].distance / 1000 + "km");
                    }).catch(e => {
                    console.log(e)
                })
            });
        }
    }, [stops]);


    return (<>
    </>)
}