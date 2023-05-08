import React, {useEffect, useState} from 'react';
import Cookies from "js-cookie";
import {Link} from "react-router-dom";

function Navbar() {

    const [loggedIn, setLoggedIn] = useState(false)

    useEffect(() => {
        const username = Cookies.get('username');
        if (username) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, [])

    function logOut() {
        Cookies.remove('username');
        setLoggedIn(false);
    }

    return (
        loggedIn ?
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/entries">Entries</Link>
                    </li>
                </ul>
                <button onClick={() => logOut()}>Purge</button>
            </nav> :
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/register">Register</Link>
                    </li>
                    <li>
                        <Link to="/login">Login</Link>
                    </li>
                </ul>
            </nav>
    );
}

export default Navbar;