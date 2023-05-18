import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
export function DisplayOrders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {

        const userId = Cookies.get("id");
        axios.get(`http://localhost:5551/getUserOrders/${userId}`)
            .then((response) => {
                console.log(response.data);
                setOrders(response.data.orders);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

   
}