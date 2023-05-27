import PendingIcon from '@mui/icons-material/Pending';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import {useEffect, useState} from "react";

export function OrderIcon(props) {

    const [status, setStatus] = useState(<PendingIcon/>)

    useEffect(() => {
            if (props.orderSatus === "Completed") {
                setStatus(<CheckCircleOutlineIcon style={{fontSize: 50, color: "#006f3c"}}/>)
            } else if (props.orderSatus === "In Route"
            ) {
                setStatus(<LocalShippingIcon style={{fontSize: 50, color: "#264b96"}}/>)
            } else if (props.orderSatus === "Pending") {
                setStatus(<MoreHorizIcon style={{fontSize: 50, color: "#f9a73e"}}/>)
            }
        }
    )

    return (
        <>
            {status}
        </>
    )
}