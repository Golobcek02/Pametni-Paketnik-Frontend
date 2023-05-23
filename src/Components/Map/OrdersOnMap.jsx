import './map.css';
import {useEffect, useState} from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function OrdersOnMap(props) {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:5551/getUserOrders/${Cookies.get('id')}`)
            .then((res) => {
                console.log('res', res.data);
                setOrders(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    // {order.Items[i].join(', ')}

    return (
        <>
            {orders.length !== 0 ? (
                <div className="box">
                    <h2>Your Orders In Route</h2>
                    <div className="user">
                        {orders.map((order, i) => (
                            order.Items.length !== 0 && order.Status === "In Route" ?
                                <div key={i}>
                                    <p style={{color: '#DF2E38'}}>Order for box: {order.BoxID}</p>
                                    <span className="username">Website from order: {order.PageUrl}</span>
                                </div>
                                : <></>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="box">ni neke</div>
            )}
        </>
    );
}

export default OrdersOnMap;
