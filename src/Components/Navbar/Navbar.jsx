import React, {useEffect, useState} from 'react';
import Cookies from "js-cookie";
import './navbar.css'

function Navbar() {
    const admin = true
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


    return (loggedIn ? <>
        <div className="container brown highlightTextOut" style={{height: "10%"}}>
            <a alt="ENTRIES" href="/entries">ENTRIES</a>
            <a alt="BOXES & ACCESSES" href="/userBoxes">BOXES & ACCESSES</a>
            {/*<a alt="ACCESS LIST" href="/accessList">ACCESS LIST</a>*/}
            <a alt="MAP" href="/map">MAP</a>
            <a alt="ORDERS" href="/userOrders">ORDERS</a>
            {admin ? <><a alt="PACKAGE ROUTES" href="/packageRoutes">PACKAGE ROUTES</a>
                <a alt="ADD ORDER" href="/addOrder">ADD ORDER</a> </> : <></>}
            <a alt="LOG OUT" style={{color: '#DF2E38'}} href="/" onClick={() => logOut()}>LOG OUT</a>
        </div>
    </> : <></>)
}

export default Navbar;


{/*<a href={"/userBoxes"}>User Boxes</a>*/
}
{/*<a href={"/"}>Access List</a>*/
}
{/*<a href={"/"}>Package Routes</a>*/
}
{/*<a href={"/"}>Orders</a>*/
}
{/*<a href={"/"}>Add order</a>*/
}
{/*<a href={"/map"}>Map</a>*/
}
{/*<a href={"/"} onClick={() => logOut()}>Sign out</a>*/
}
{/*<div className="dot"></div>*/
}
{/*<ul>*/
}
{/*    <li>*/
}
{/*        <Link to="/">Home</Link>*/
}
{/*    </li>*/
}
{/*    <li>*/
}
{/*        <Link to="/entries">Entries_old</Link>*/
}
{/*    </li>*/
}
{/*    <li>*/
}
{/*        <Link to="/userBoxes">User Boxes</Link>*/
}
{/*    </li>*/
}
{/*    <li>*/
}
{/*        <Link to="/accessList">Access List</Link>*/
}
{/*    </li>*/
}
{/*    <li>*/
}
{/*        <Link to="/packageRoutes">Package Routes</Link>*/
}
{/*    </li>*/
}
{/*    <li>*/
}
{/*        <Link to="/userOrders">Orders</Link>*/
}
{/*    </li>*/
}
{/*    <li>*/
}
{/*        <Link to="/addOrder">Add order</Link>*/
}
{/*    </li>*/
}
{/*    <li>*/
}
{/*        <Link to="/map">Map</Link>*/
}
{/*    </li>*/
}
{/*    <li>*/
}
{/*        <a href="/" onClick={() => logOut()}>Log Out</a>*/
}
{/*    </li>*/
}
{/*</ul>*/
}
{/*<button onClick={() => logOut()}>Purge</button>*/
}
// </nav>