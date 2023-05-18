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

    useEffect(() => {
        // if (stops.length > 0) {
        //     let neke = stops[0]
        //
        //     const stopString = neke.join('|');
        //     axios.get(`https://api.geoapify.com/v1/routing?waypoints=${stopString}&mode=light_truck&format=json&apiKey=635b84cbf55241c6b792a66cd02745a9`)
        //         .then((res) => {
        //             console.log(res.data.results[0])
        //             const routeCoordinates = res.data.results[0].geometry[0];
        //             const polyline = L.polyline(routeCoordinates).addTo(props.map);
        //             props.map.fitBounds(polyline.getBounds());
        //         })
        // }
        stops.forEach((stop) => {
            const stopString = stop.join('|');
            console.log(stopString);
            // Perform other operations with the stop string
            axios.get(`https://api.geoapify.com/v1/routing?waypoints=${stopString}&mode=light_truck&format=json&apiKey=635b84cbf55241c6b792a66cd02745a9`)
                .then((res) => {
                    console.log(res)
                    const routeCoordinates = res.data.results[0].geometry[0];
                    const polyline = L.polyline(routeCoordinates).addTo(props.map);
                    props.map.fitBounds(polyline.getBounds());
                })
        });
    }, [stops]);


    return (
        <>
        </>
    )
}