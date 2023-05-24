import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {Home} from "../Home/Home";
import {Entries} from "../Entries/Entries";
import UserBoxes from "../SmartBox/UserBoxes";
import {Map} from "../Map/Map";
import {PackageRoutes} from "../Admin/PackageRoutes";
import Orders from "../UserOrders/Orders";
import {Admin} from "../Admin/Admin";
import Cookies from "js-cookie";

function AppRouter() {
    return (
        Cookies.get('username') ?
            <Routes>
                <Route exact path="/" element={<Entries/>}/>
                <Route path="/userBoxes" element={<UserBoxes/>}/>
                <Route path="/map" element={<Map/>}/>
                <Route path="/packageRoutes" element={<PackageRoutes/>}/>
                <Route path="/admin" element={<Admin/>}/>
                <Route path="/userOrders" element={<Orders/>}/>
            </Routes>
            :
            <Routes>
                <Route exact path="/" element={<Home/>}/>
            </Routes>
    );
}

export default AppRouter;
