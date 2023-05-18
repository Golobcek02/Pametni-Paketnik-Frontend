import {useEffect, useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function PackageRoutes() {
    const [nonParsedRoutes, setNonParsedRoutes] = useState("");
    const [boxId, setBoxId] = useState(0);
    const [boxIdInput, setBoxIdInput] = useState(0);

    function addRoutes() {
        const parsedRoutes = nonParsedRoutes.split(",").map(route => route.trim());
        axios.post("http://localhost:5551/addPackageRoute", {Stops: parsedRoutes}).then((res) => {
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
        const parsedRoutes = nonParsedRoutes.split(",").map(route => route.trim());
        axios.post(`http://localhost:5551/updateOrderRoute/${boxId}`, parsedRoutes).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })

    }

    function popFirstStop() {
        axios.post(`http://localhost:5551/popFirstStop/${boxIdInput}`).then((res) => {
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
            <div>
                <input
                    type="text"
                    id="username"
                    onChange={(e) => {
                        setBoxIdInput(parseInt(e.target.value));
                    }}
                    placeholder="Enter Box ID"
                />
                <button type="submit" onClick={() => popFirstStop()}>
                    Pop First Stop
                </button>
            </div>
        </>
    );
}
