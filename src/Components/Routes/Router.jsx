import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Login from "../User/Login";
import Register from "../User/Register";
import {Home} from "../Home";

function AppRouter() {
    return (
        // <Router>
        <Routes>
            <Route exact path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route exact path="/" element={<Home/>}/>
        </Routes>
        // </Router>
    );
}

export default AppRouter;
