import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useMap } from "react-leaflet";
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
                console.log(stopsArray)
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
        iconUrl: 'logo512.png',
        iconSize: [32, 32],
    });
    const intermediateStopIcon = L.icon({
        iconUrl: "box.png",
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
                // Perform other operations with the stop string
                axios.get(`https://api.geoapify.com/v1/routing?waypoints=${stopString}&mode=light_truck&format=json&apiKey=635b84cbf55241c6b792a66cd02745a9`)
                    .then((res) => {
                        const routeCoordinates = res.data.results[0].geometry;
                        stop.forEach((coords, index) => {
                            const LatLon=coords.split(",");

                            if (index === 0) {
                                const marker = L.marker([parseFloat(LatLon[0]), parseFloat(LatLon[1])], { icon: finalStopIcon }).addTo(props.map);
                            }else if(true){

                            } 
                            else {
                                const marker = L.marker(coords[index], { icon: intermediateStopIcon }).addTo(props.map);
                            }
                            //console.log(coords)
                        });

                        props.boxes.forEach((box, i) => {
                            const regex1 = new RegExp(box.Latitude+","+box.Longitude);
                            const userBoxOnOrder = stops[0].filter(value => regex1.test(value));
                            if(userBoxOnOrder.length>0){
                                const marker = L.marker([box.Latitude, box.Longitude], { icon: yourBoxStop }).addTo(props.map);
                            }
                        })

                        const polyline = L.polyline(routeCoordinates, { 'color': getRandomColor() }).addTo(props.map);
                        props.map.fitBounds(polyline.getBounds());
                    }).catch(e => { console.log(e) })
            });
        }
    }, [stops]);


    return (
        <>
        </>
    )
}