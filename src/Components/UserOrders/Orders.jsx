import {useEffect, useState} from "react";
import Cookies from "js-cookie";
import axios from "axios";
// import './orders.css'
import '../SmartBox/entries.css'

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
        fetch("https://ppbackend.azurewebsites.net/getUserBoxes/6467cb9d50ea550272e4c443")
            .then(x => x.text())
            .then(y => console.log(y)).catch(e => {
            console.log(e)
        });
    }, []);


    return (
        <div className="entries-container">
            {orders.length !== 0 ? (orders.map((order) => (<div className="card" key={order.id}>
                <div className="card-top-part">
                    <div className="left-part">
                        <div className="user-name">
                            <p className="name">{order.PageUrl}</p>
                            <p className="role">{order.Status}</p>
                        </div>
                        <div className="user-position">
                            <p className="position">Number of items: {order.Items.length}</p>
                        </div>
                    </div>
                    <div className="right-part">
                        <div className="user-photo">
                            {order.Status === "Completed" ? (<img src="/green.jpg" className="photo"
                                                                  alt="Green"/>) : order.Status === "Pending" ? (
                                <img src="/red.png" className="photo" alt="Red"/>) : (
                                <img src="/orange.jpg" className="photo" alt="Orange"/>)}
                        </div>
                    </div>
                </div>
                {/*<div className="card-bottom-part">*/}
                {/*    <div className="bottom-part">*/}
                {/*        <a onClick={() => deleteEntry(entry.ID)} className="link"*/}
                {/*           style={{color: "#DF2E38"}}>*/}
                {/*            Delete*/}
                {/*        </a>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>))) : (<div className="entries-container">YOU HAVE NO ENTRIES</div>)}
        </div>
    )
    // <div className="container">
    //     <div className="grid-container">
    //         {orders.length !== 0 ? orders.map((order) => (<div className="flip-card">
    //             <div className="flip-card-inner">
    //                 <div className="flip-card-front">
    //                     <p className="title">{order.PageUrl}</p>
    //                     <p>Number of items: {order.Items !== null ? order.Items.length : "banana"}</p>
    //                     <p>Status: {order.Status}</p>
    //                     <p>Box to deliver in: {order.BoxID}</p>
    //                 </div>
    //                 <div className="flip-card-back">
    //                     <p className="title">ITEMS:</p>
    //                     {order.Items !== null ? order.Items.join(", ") : "banana"}
    //                 </div>
    //             </div>
    //         </div>)) : <></>}
    //     </div>
    // </div>)
}

export default Orders