import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function PackageRoutes() {
    const [nonParsedRoutes, setNonParsedRoutes] = useState("");
    const [boxId, setBoxId] = useState(0);

    function addRoutes() {
        const parsedRoutes = nonParsedRoutes.split(",").map(route => route.trim());
        let coordinates = []
        parsedRoutes.map((location, i) => {
            axios.post(`https://api.geoapify.com/v1/geocode/search?text=${location}&format=json&apiKey=635b84cbf55241c6b792a66cd02745a9`).then((res) => {
                console.log(res)
                coordinates[i] = `${res.data.results[0].lat}|${res.data.results[0].lat}`
            })
        })
        console.log("coordinates", coordinates)
        axios.post("http://localhost:5551/addPackageRoute", {Stops: coordinates}).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    function addOrder() {
        axios.post("http://localhost:5551/addOrder", {BoxId: parseInt(boxId), Status: "Pending"}).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    function updateOrder() {
        const parsedRoutes = nonParsedRoutes.split(",").map((route) => route.trim());
        const coordinates = Array(parsedRoutes.length);

        Promise.all(
            parsedRoutes.map((location, i) =>
                axios
                    .get(
                        `https://api.geoapify.com/v1/geocode/search?text=${location}&format=json&apiKey=635b84cbf55241c6b792a66cd02745a9`
                    )
                    .then((res) => {
                        coordinates[i] = `${res.data.results[0].lat},${res.data.results[0].lat}`;
                    })
            )
        )
            .then(() => {
                console.log(coordinates);
                axios.post(`http://localhost:5551/updateOrderRoute/${boxId}`, coordinates).then((res) => {
                    console.log(res)
                }).catch((err) => {
                    console.log(err)
                })
            })
            .catch((error) => {
                console.log(error);
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
                        setNonParsedRoutes(e.target.value);
                    }}
                    placeholder="Enter Routes Divided by ,"
                />
                <button type="submit" onClick={() => addRoutes()}>
                    Post
                </button>
            </div>
            <div>
                <input
                    type="text"
                    id="username"
                    onChange={(e) => {
                        setBoxId(parseInt(e.target.value));
                    }}
                    placeholder="Enter Package ID"
                />
                <button type="submit" onClick={() => addOrder()}>
                    Post
                </button>
            </div>
            <div>
                <input
                    type="text"
                    id="username"
                    onChange={(e) => {
                        setBoxId(parseInt(e.target.value));
                    }}
                    placeholder="Enter Box ID"
                />
                <input
                    type="text"
                    id="username"
                    onChange={(e) => {
                        setNonParsedRoutes(e.target.value);
                    }}
                    placeholder="Route"
                />
                <button type="submit" onClick={() => updateOrder()}>
                    Post
                </button>
            </div>
        </>
    );
}
