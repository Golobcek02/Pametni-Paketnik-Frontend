import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Login from "../User/Login";
import Register from "../User/Register";
import {Home} from "../Home";
import Entries from "../SmartBox/Entries";
import AddBox from "../SmartBox/AddBox";
import UserBoxes from "../SmartBox/UserBoxes";

function AppRouter() {
    return (
        <Routes>
            <Route exact path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route exact path="/" element={<Home/>}/>
            <Route path="/entries" element={<Entries/>}/>
            <Route path="/addbox" element={<AddBox/>}/>
            <Route path="/userBoxes" element={<UserBoxes/>}/>
        </Routes>
    );
}

export default AppRouter;
