import React, {useState, useEffect} from 'react';
import {CircleMarker, Popup} from 'react-leaflet';
import axios from "axios";
import Cookies from "js-cookie";

export function BoxLocation() {
    const [userBoxes, setUserBoxes] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5551/getUserBoxes/${Cookies.get('id')}`).then(res => {
            console.log(res);
            setUserBoxes(res.data.allBoxes);
        }).catch(error => console.error(error));
    }, [])

    return (
        <>
            {
                userBoxes.map(box => (
                    <CircleMarker key={box.BoxId} center={[box.Latitude, box.Longitude]}
                                  pathOptions={{color: "#353a3b"}} radius={9}>
                        <Popup key={box.BoxId} keepInView={false} autoPan={false}>
                            <p>
                                Box: {box.BoxId}
                            </p>
                        </Popup>
                    </CircleMarker>

                ))
            }
        </>
    );
}