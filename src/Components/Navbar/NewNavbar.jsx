import React, {useEffect, useState} from 'react';
import './styles.css';
import {NavLink} from 'react-router-dom';
import AppRouter from '../Routes/Router';
import Cookies from "js-cookie";

function Sidebar() {
    const [activeItem, setActiveItem] = useState('/entries');
    const admin = true
    const [loggedIn, setLoggedIn] = useState(false)

    function handleClick(url) {
        setActiveItem(url);
    }

    function logOut() {
        Cookies.remove('username');
        setLoggedIn(false);
    }

    useEffect(() => {
        const username = Cookies.get('username');
        if (username) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [])

    return (
        loggedIn ?
            <div className="wrapper">
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <h3>Direct4Me</h3>
                    </div>

                    <ul className="list-unstyled components">
                        <p>Dashboard</p>
                        <li className={activeItem === '/entries' ? 'active' : ''}>
                            <NavLink to="/entries" onClick={() => handleClick('/entries')}>
                                ENTRIES
                            </NavLink>
                        </li>
                        <li className={activeItem === '/userBoxes' ? 'active' : ''}>
                            <NavLink to="/userBoxes" onClick={() => handleClick('/userBoxes')}>
                                BOXES & ACCESSES
                            </NavLink>
                        </li>
                        <li className={activeItem === '/map' ? 'active' : ''}>
                            <NavLink to="/map" onClick={() => handleClick('/map')}>
                                MAP
                            </NavLink>
                        </li>
                        <li className={activeItem === '/userOrders' ? 'active' : ''}>
                            <NavLink to="/userOrders" onClick={() => handleClick('/userOrders')}>
                                ORDERS
                            </NavLink>
                        </li>
                    </ul>

                    <ul className="list-unstyled CTAs">
                        {admin ?
                            <li style={{listStyle: 'none'}}>
                                <a href="https://bootstrapious.com/tutorial/files/sidebar.zip" className="download">
                                    ADMIN
                                </a>
                            </li> : <></>}
                        <li style={{listStyle: 'none'}}>
                            <a href="/" onClick={() => logOut()} className="download">
                                LOG OUT
                            </a>
                        </li>
                    </ul>
                </nav>

                <div id="content">
                    <AppRouter/>
                </div>
            </div> :
            <div id="content">
                <AppRouter/>
            </div>
    )
}

export default Sidebar;