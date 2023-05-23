import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {Home} from "../Home/Home";
import {Entries} from "../Entries/Entries";
import UserBoxes from "../SmartBox/UserBoxes";
import {Map} from "../Map/Map";
import {PackageRoutes} from "../Admin/PackageRoutes";
import Orders from "../UserOrders/Orders";
import {Admin} from "../Admin/Admin";

function AppRouter() {
    return (<Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route path="/entries" element={<Entries/>}/>
        <Route path="/userBoxes" element={<UserBoxes/>}/>
        <Route path="/map" element={<Map/>}/>
        <Route path="/packageRoutes" element={<PackageRoutes/>}/>
        <Route path="/admin" element={<Admin/>}/>
        <Route path="/userOrders" element={<Orders/>}/>
    </Routes>);
}

export default AppRouter;
