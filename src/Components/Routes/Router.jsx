import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {Home} from "../Home/Home";
import {Entries} from "../Entries/Entries";
import UserBoxes from "../UserBoxesAndAccesses/UserBoxes";
import {Map} from "../Map/Map";
import {PackageRoutes} from "../Admin/PackageRoutes";
import Orders from "../UserOrders/Orders";
import {Admin} from "../Admin/Admin";
import Cookies from "js-cookie";

let env = require('../../Env.json');

const API_ENV = env.development

function AppRouter() {
    return (
        Cookies.get('username') ?
            <Routes>
                <Route exact path="/" element={<Entries API_ENV={API_ENV.API_URL}/>}/>
                <Route path="/userBoxes" element={<UserBoxes API_ENV={API_ENV.API_URL}/>}/>
                <Route path="/map" element={<Map API_ENV={API_ENV.API_URL}/>}/>
                <Route path="/packageRoutes" element={<PackageRoutes API_ENV={API_ENV.API_URL}/>}/>
                <Route path="/admin" element={<Admin API_ENV={API_ENV.API_URL}/>}/>
                <Route path="/userOrders" element={<Orders API_ENV={API_ENV.API_URL}/>}/>
            </Routes>
            :
            <Routes>
                <Route exact path="/" element={<Home API_ENV={API_ENV.API_URL}/>}/>
            </Routes>
    );
}

export default AppRouter;
