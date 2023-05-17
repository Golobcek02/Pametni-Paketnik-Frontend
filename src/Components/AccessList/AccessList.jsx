import {AddedAccessList} from "./AddedAccessList";
import AddAccess from "./AddAccess";
import {useState} from "react";

export function AccessList() {

    const [accessChanged, setAccessChanged] = useState(false);

    function handleAccessChange() {
        setAccessChanged(!accessChanged);
    }

    return (
        <>
            <AddAccess onAccessChange={handleAccessChange}/>
            <AddedAccessList accessChanged={accessChanged}/>
        </>
    )
}