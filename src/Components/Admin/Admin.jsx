import {PackageRoutes} from "../PackageRoutes/PackageRoutes";
import {AddOrder} from "../UserOrders/AddOrder";

export function Admin() {
    return (
        <>
            <PackageRoutes/>
            <AddOrder/>
        </>
    )
}