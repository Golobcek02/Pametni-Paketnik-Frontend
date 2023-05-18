import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import {useMap} from "react-leaflet";
import L from "leaflet"

export function OrderRoutes(props) {

    const [stops, setStops] = useState([])
    // const map = useMap()


    useEffect(() => {
        console.log(props)
        axios
            .get(`http://localhost:5551/getUserOrders/${Cookies.get('id')}`)
            .then((res) => {
                const orders = res.data.orders;
                const stopsArray = orders.map((order) => {
                    if (order.PackageRoute && order.PackageRoute.Stops) {
                        return order.PackageRoute.Stops;
                    }
                    return [];
                });
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

    const firstStopIcon = L.icon({
        iconUrl: 'truck.svg',
        iconSize: [32, 32],
    });
    const intermediateStopIcon = L.icon({
        iconUrl: "truck.svg",
        iconSize: [24, 24],
    });
    const finalStopIcon = L.icon({
        iconUrl: "truck.svg",
        iconSize: [28, 28],
    });

    useEffect(() => {
        if (stops.length > 0) {
            stops.forEach((stop) => {
                const stopString = stop.join('|');
                console.log(stopString);
                // Perform other operations with the stop string
                axios.get(`https://api.geoapify.com/v1/routing?waypoints=${stopString}&mode=light_truck&format=json&apiKey=635b84cbf55241c6b792a66cd02745a9`)
                    .then((res) => {
                        console.log(res)
                        const routeCoordinates = res.data.results[0].geometry;
                        routeCoordinates.forEach((coords, index) => {
                            //     const markerOptions = {
                            //         icon: index === 0 ? firstStopIcon : index === routeCoordinates.length - 1 ? finalStopIcon : intermediateStopIcon,
                            //     };
                            //     console.log(coords)
                            const marker = L.marker(coords[index], {icon: finalStopIcon}).addTo(props.map);
                        });
                        const polyline = L.polyline(routeCoordinates, {'color': getRandomColor()}).addTo(props.map);
                        props.map.fitBounds(polyline.getBounds());
                    })
            });
        }
    }, [stops]);


    return (
        <>
        </>
    )
}