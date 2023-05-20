import React, {useMemo, useState} from 'react';
import {MapContainer, TileLayer} from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import {AddBoxToMap} from "./AddBoxToMap";
import {BoxLocation} from "./BoxLocation";

export function Map() {
    const [map, setMap] = useState(null);

    const displayMap = useMemo(() => (
        <MapContainer
            center={[46.562511, 15.658693]}
            zoom={11}
            scrollWheelZoom={true}
            ref={setMap}
            style={{height: '100%', width: '100%'}}
        >
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <BoxLocation/>
        </MapContainer>
    ), []);

    return (
        <div style={{height: "calc(100vh - 160px)", width: "100%"}}>
            <AddBoxToMap/>
            {displayMap}
        </div>
    );
}