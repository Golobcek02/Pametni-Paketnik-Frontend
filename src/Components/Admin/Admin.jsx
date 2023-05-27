import {PackageRoutes} from "./PackageRoutes";
import {AddOrder} from "./AddOrder";
import {AddBoxToMap} from "./AddBoxToMap";
import TestApi from "./TestApi";
import "./Admin.css";

export function Admin() {
    return (
        <div className="admin-container">
            <div className="admin-item">
                <h2>Package Routes</h2>
                <PackageRoutes/>
            </div>
            <div className="admin-item">
                <h2>Add Order</h2>
                <AddOrder/>
            </div>
            <div className="admin-item">
                <h2>Add Box to Map</h2>
                <AddBoxToMap/>
            </div>
            <div className="admin-item">
                <h2>Test API</h2>
                <TestApi/>
            </div>
        </div>
    );
}
