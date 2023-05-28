import {PackageRoutes} from "./PackageRoutes";
import {AddOrder} from "./AddOrder";
import {AddBoxToMap} from "./AddBoxToMap";
import TestApi from "./TestApi";
import "./Admin.css";

export function Admin(props) {
    return (
        <div className="admin-container">
            <div className="admin-item">
                <h2>Package Routes</h2>
                <PackageRoutes API_ENV={props.API_ENV}/>
            </div>
            <div className="admin-item">
                <h2>Add Order</h2>
                <AddOrder API_ENV={props.API_ENV}/>
            </div>
            <div className="admin-item">
                <h2>Add Box to Map</h2>
                <AddBoxToMap API_ENV={props.API_ENV}/>
            </div>
            <div className="admin-item">
                <h2>Test API</h2>
                <TestApi API_ENV={props.API_ENV}/>
            </div>
        </div>
    );
}
