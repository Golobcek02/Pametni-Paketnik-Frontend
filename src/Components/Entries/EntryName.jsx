import {useEffect, useState} from "react";
import KeyIcon from "@mui/icons-material/Key";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import WhereToVoteIcon from "@mui/icons-material/WhereToVote";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import GppBadIcon from "@mui/icons-material/GppBad";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import GppGoodIcon from "@mui/icons-material/GppGood";
import InventoryIcon from "@mui/icons-material/Inventory";

export function EntryName(props) {

    const [entry, setEntry] = useState(props.entryType)

    useEffect(() => {
        if (props.entryType === "boxOpening") {
            setEntry("Box has been opened")
        } else if (props.entryType === "orderAdded") {
            setEntry("Order was added")
        } else if (props.entryType === "orderCompleted") {
            setEntry("Order is delivered")
        } else if (props.entryType === "oneStopCloser") {
            setEntry("Order is one step closer")
        } else if (props.entryType === "boxRemovedFromOwner") {
            setEntry("Removed a box")
        } else if (props.entryType === "accessRevoked") {
            setEntry("Revoked access to user")
        } else if (props.entryType === "accessAdded") {
            setEntry("Added access to user")
        } else if (props.entryType === "boxAdded") {
            setEntry("Added box to account")
        }
    }, [])

    return (<>
        <p className="position">{entry}</p>
    </>)
}