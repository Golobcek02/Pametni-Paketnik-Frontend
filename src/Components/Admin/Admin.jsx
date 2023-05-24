import {PackageRoutes} from "./PackageRoutes";
import {AddOrder} from "./AddOrder";
import {AddBoxToMap} from "./AddBoxToMap";
import TestApi from "./TestApi";

export function Admin() {
    return (
        <>
            <PackageRoutes/>
            <AddOrder/>
            <AddBoxToMap/>
            <TestApi/>
        </>
    )
}