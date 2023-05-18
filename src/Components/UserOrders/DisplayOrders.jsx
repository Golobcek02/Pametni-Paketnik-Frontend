import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export function DisplayOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const userId = Cookies.get("id");
        axios.get(`http://localhost:5551/getUserOrders/${userId}`)
            .then((response) => {
                setOrders(response.data.orders);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <div>
            <h1>User Orders</h1>
            {orders.map((order) => (
                <div key={order.ID}>
                    <p>Order ID: {order.ID}</p>
                    <p>Status: {order.Status}</p>
                    <p>Route: {order.PackageRoute.Stops.join(", ")}</p>
                </div>
            ))}
        </div>
    );
}