import { useState } from 'react';
import { List , ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import {Button} from "@mui/material";

const OwnerPart = (props) => {
    let [IVE, setIVE] = useState(props.isVE);

    const toggleIsVELocal = async () => {
        console.log("toggleIsVELocal");
        await props.toggleIsVE();
        setIVE(!IVE);
        console.log("toggleIsVELocal done");
    }

    return (
        <List>
        <ListItem>
            <ListItemText primary="Is Voting Enabled : " />
        </ListItem>
        <ListItem>
            <ListItemText primary={IVE ? 'True' : 'False'} />
        </ListItem>
        <ListItem>
        <Button variant="contained" color="primary" onClick={toggleIsVELocal}>Toggle</Button>
        </ListItem>
        </List>
    );
    }

export default OwnerPart;