import {PackageRoutes} from "./PackageRoutes";
import {AddOrder} from "./AddOrder";
import {AddBoxToMap} from "./AddBoxToMap";

export function Admin() {
    return (
        <>
            <PackageRoutes/>
            <AddOrder/>
            <AddBoxToMap/>
        </>
    )
}