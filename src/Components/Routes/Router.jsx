import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from "../User/Login";
import Register from "../User/Register";
import {Home} from "../Home";
import Entries from "../SmartBox/Entries";
import UserBoxes from "../SmartBox/UserBoxes";
import {AccessList} from "../AccessList/AccessList";
import {Map} from "../Map/Map";
import {DisplayOrders} from "../UserOrders/DisplayOrders"

function AppRouter() {
    return (
        <Routes>
            <Route exact path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/entries" element={<Entries/>}/>
            <Route path="/userBoxes" element={<UserBoxes/>}/>
            <Route path="/accessList" element={<AccessList/>}/>
            <Route path="/displayOrders" element={<DisplayOrders/>}/>
            <Route path="/map" element={<Map/>}/>
        </Routes>
    );
}

export default AppRouter;
