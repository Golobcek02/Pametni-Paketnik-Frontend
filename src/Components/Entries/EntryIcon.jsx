import MeetingRoomIcon from '@mui/icons-material/MeetingRoom';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import WhereToVoteIcon from '@mui/icons-material/WhereToVote';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import InventoryIcon from '@mui/icons-material/Inventory';
import EuroIcon from '@mui/icons-material/Euro';
import DraftsIcon from '@mui/icons-material/Drafts';
import GppMaybeIcon from '@mui/icons-material/GppMaybe';
import GppBadIcon from '@mui/icons-material/GppBad';
import GppGoodIcon from '@mui/icons-material/GppGood';
import KeyIcon from '@mui/icons-material/Key';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import {useEffect, useState} from 'react';
import './entries.css'

export function EntryIcon(props) {
    const [icon, setIcon] = useState(<MeetingRoomIcon style={{fontSize: 50, color: '#50808E'}}/>);

    useEffect(() => {
        if (props.entryType === "boxOpening") {
            setIcon(<KeyIcon style={{fontSize: 50, color: '#4F759B'}}/>)
        } else if (props.entryType === "orderAdded") {
            setIcon(<LocalMallIcon style={{fontSize: 50, color: '#938BA1'}}/>)
        } else if (props.entryType === "orderCompleted") {
            setIcon(<WhereToVoteIcon style={{fontSize: 50, color: '#B2E4DB'}}/>)
        } else if (props.entryType === "oneStopCloser") {
            setIcon(<LocalShippingIcon style={{fontSize: 50, color: '#7A89C2'}}/>)
        } else if (props.entryType === "boxRemovedFromOwner") {
            setIcon(<GppBadIcon style={{fontSize: 50, color: '#D64045'}}/>)
        } else if (props.entryType === "accessRevoked") {
            setIcon(<GppMaybeIcon style={{fontSize: 50, color: '#8E94F2'}}/>)
        } else if (props.entryType === "accessAdded") {
            setIcon(<GppGoodIcon style={{fontSize: 50, color: '#336699'}}/>)
        } else if (props.entryType === "boxAdded") {
            setIcon(<InventoryIcon style={{fontSize: 50, color: '#1768AC'}}/>)
        }
    }, []);


    return (<>
        <div className="user-photo">
            {icon}
        </div>
    </>)
}