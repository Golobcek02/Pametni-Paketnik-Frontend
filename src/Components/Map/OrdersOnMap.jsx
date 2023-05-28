import './map.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function OrdersOnMap(props) {
    const [orders, setOrders] = useState([]);
    const [pendingOrders, setPendingOrders] = useState(false)

    useEffect(() => {
        axios
            .get(`${props.API_ENV}/getUserOrders/${Cookies.get('id')}`)
            .then((res) => {
                console.log('res', res.data);
                setOrders(res.data);
                for (const order of res.data) {
                    if (order.Status === 'In Route') {
                        setPendingOrders(true)
                        break;
                    }
                }
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    return (<>
        {pendingOrders ? (<div className="box">
            <h2>Your Orders In Route</h2>
            <div className="user-orders">
                {orders.map((order, i) => (order.Items.length !== 0 && order.Status === "In Route" ? (<div key={i}>
                    <p style={{color: '#DF2E38'}}>Order for box: {order.BoxID}</p>
                    <span className="order-website">Website from order: {order.PageUrl}</span>
                </div>) : null))}
            </div>
        </div>) : (<div className="box" style={{color: '#DF2E38'}}>YOU HAVE NO ORDERS IN ROUTE</div>)}
    </>);

}

export default OrdersOnMap;
