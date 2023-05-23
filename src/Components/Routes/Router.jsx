import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from "../User/Login";
import Register from "../User/Register";
import {Home} from "../Home/Home";
import {Entries} from "../SmartBox/Entries";
import UserBoxes from "../SmartBox/UserBoxes";
import {Map} from "../Map/Map";
import {PackageRoutes} from "../PackageRoutes/PackageRoutes";
import {DisplayOrders} from "../UserOrders/DisplayOrders";
import {AddOrder} from "../UserOrders/AddOrder";
import Orders from "../UserOrders/Orders";
import {Admin} from "../Admin/Admin";

function AppRouter() {
    return (
        <Routes>
            <Route exact path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/entries" element={<Entries/>}/>
            <Route path="/userBoxes" element={<UserBoxes/>}/>
            {/*<Route path="/accessList" element={<AccessList/>}/>*/}
            <Route path="/map" element={<Map/>}/>
            <Route path="/packageRoutes" element={<PackageRoutes/>}/>
            <Route path="/admin" element={<Admin/>}/>
            <Route path="/userOrders" element={<Orders/>}/>
            {/*<Route path="/addOrder" element={<AddOrder/>}/>*/}
        </Routes>
    );
}

export default AppRouter;
