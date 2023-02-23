import { useState } from 'react';
import { List , ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import {Button} from "@mui/material";
import './OwnerPart.css';

const OwnerPart = (props) => {
    let [IVE, setIVE] = useState(props.isVE);

    const toggleIsVELocal = async () => {
        console.log("toggleIsVELocal");
        await props.toggleIsVE();
        setIVE(!IVE);
        console.log("toggleIsVELocal done");
    }

    return (
        <List className='controllItem'>
        <ListItem className = 'muili'>
            <ListItemText primary="Is Voting Enabled : " />
            <ListItemText  primary={IVE ? 'True' : 'False'} />
        </ListItem>
        <Button className='muibtn' variant="contained" color="primary" onClick={toggleIsVELocal}>Toggle</Button>
        </List>
    );
    }

export default OwnerPart;