import {useEffect, useState} from "react";

export function EntryType(props) {

    const [entry, setEntry] = useState(props.entryType)

    useEffect(() => {
        if (props.entryType === "boxOpening") {
            setEntry("Box")
        } else if (props.entryType === "orderAdded") {
            setEntry("Order")
        } else if (props.entryType === "orderCompleted") {
            setEntry("Order")
        } else if (props.entryType === "oneStopCloser") {
            setEntry("Order")
        } else if (props.entryType === "boxRemovedFromOwner") {
            setEntry("Access")
        } else if (props.entryType === "accessRevoked") {
            setEntry("Access")
        } else if (props.entryType === "accessAdded") {
            setEntry("Access")
        } else if (props.entryType === "boxAdded") {
            setEntry("Access")
        } else {
            setEntry("Misc")
        }
    }, [props])

    return (
        <>
            {entry}
        </>
    )
}