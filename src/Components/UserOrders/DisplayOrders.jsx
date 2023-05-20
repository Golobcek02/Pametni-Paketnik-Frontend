import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export function DisplayOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const userId = Cookies.get("id");
        axios
            .get(`http://localhost:5551/getUserOrders/${userId}`)
            .then((res) => {
                const receivedOrders = res.data.orders;
                console.log("Number of orders received:", receivedOrders.length);
                setOrders(res.data.orders);
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div>
            <h1>User Orders</h1>
            {orders.map((order) => (
                <div key={order.ID}>
                    <p>Order ID: {order.ID}</p>
                    <p>Status: {order.Status}</p>
                    {order.PageUrl && <p>Page URL: {order.PageUrl}</p>} {/* Conditional rendering for PageUrl */}
                    <p>Delivery Time: {order.DeliveryTime ? order.DeliveryTime : 'pending'}</p>
                    {order.Items && (
                        <div>
                            <p>Items:</p>
                            <ul>
                                {order.Items.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )} {/* Conditional rendering and mapping for Items */}
                </div>
            ))}
        </div>
    );
}