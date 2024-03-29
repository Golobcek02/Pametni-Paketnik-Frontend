import {useState} from "react";
import axios from "axios";
import Cookies from "js-cookie";

export function AddOrder(props) {
    const [boxId, setBoxId] = useState(0);
    const [pageUrl, setPageUrl] = useState("");
    const [deliveryTime, setDeliveryTime] = useState("");
    const [items, setItems] = useState("");

    function addOrder() {
        const order = {
            BoxID: parseInt(boxId),
            Status: "Pending",
            PackageRoute: null,
            PageUrl: pageUrl,
            DeliveryTime: deliveryTime,
            Items: items.split(",").map((item) => item.trim()),
        };

        axios
            .post(`${props.API_ENV}/addOrder`, order)
            .then((res) => {
                axios.post(`${props.API_ENV}/newEntry`, {
                    DeliveryId: 2,
                    BoxId: parseInt(boxId),
                    Latitude: 0,
                    Longitude: 0,
                    TimeAccessed: Date.now(),
                    LoggerId: Cookies.get('id').toString(),
                    EntryType: "orderAdded"
                }).then(res => {
                    console.log(res);
                })
                console.log(res);
                setBoxId(0);
                setPageUrl("");
                setDeliveryTime("");
                setItems("");
            })
            .catch((err) => {
                console.log(err);
            });
    }

    return (
        <div className="admin-item">
            <h2>Add Order</h2>
            <label htmlFor="boxId">Box ID:</label>
            <input
                type="text"
                id="boxId"
                value={boxId}
                onChange={(e) => setBoxId(e.target.value)}
            />
            <label htmlFor="pageUrl">Page URL:</label>
            <input
                type="text"
                id="pageUrl"
                value={pageUrl}
                onChange={(e) => setPageUrl(e.target.value)}
            />
            <label htmlFor="items">Items:</label>
            <input
                type="text"
                id="items"
                value={items}
                onChange={(e) => setItems(e.target.value)}
            />
            <button type="submit" onClick={addOrder}>
                Add Order
            </button>
        </div>
    );
}