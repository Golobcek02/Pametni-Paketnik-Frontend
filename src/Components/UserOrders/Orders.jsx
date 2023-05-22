import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
import './orders.css'

function Orders() {

    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const userId = Cookies.get("id");
        axios
            .get(`http://localhost:5551/getUserOrders/${userId}`)
            .then((res) => {
                setOrders(res.data);
                console.log(res)
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (<div className="grid-container">
        {orders.length !== 0 ? orders.map((order) => (<div className="flip-card">
            <div className="flip-card-inner">
                <div className="flip-card-front">
                    <p className="title">{order.PageUrl}</p>
                    <p>Number of items: {order.Items !== null ? order.Items.length : "banana"}</p>
                    <p>Status: {order.Status}</p>
                    <p>Box to deliver in: {order.BoxID}</p>
                </div>
                <div className="flip-card-back">
                    <p className="title">ITEMS:</p>
                    {order.Items !== null ? order.Items.join(", ") : "banana"}
                </div>
            </div>
        </div>)) : <></>}
    </div>)
}

export default Orders