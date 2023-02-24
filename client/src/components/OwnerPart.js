import { useState } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { Button } from "@mui/material";
import './OwnerPart.css';


const OwnerPart = (props) => {
    let [IVE, setIVE] = useState(props.isVE);
    let [input_candidate,setInput_candidate] = useState("");
    let [input_addWL,setInput_addWL] = useState("");
    let [input_removeWL,setInput_removeWL] = useState("");
    let data = "";

    const toggleIsVELocal = async () => {
        console.log("toggleIsVELocal");
        await props.toggleIsVE();
        setIVE(!IVE);
        console.log("toggleIsVELocal done");
    }

    const addCandidateLocal = async() => {
        console.log("Adding Candidate");
        console.log("Passing name : ",input_candidate);
        await props.addC(input_candidate);
        console.log("Candidate Added");
    }

    const addToWhiteList = async() => {
        console.log("Whitelisting user : ",input_addWL);
        await props.addTWL(input_addWL);
        console.log("Whitelisted!");
    }

    const removeFromWhiteList = async() => {
        console.log("UnWhitelisting user : ",input_removeWL);
        await props.remWL(input_removeWL);
        console.log("UnWhitelisted!");
    }

    // Needed elements : D)toggleVoteEnabled, D)addCandidate, D)addtowhitelist, removefromwhitelist, 

    return (
        <>
            <List className='controllItem' style={{ paddingRight: '16px' }}>
                <ListItem className='muili'>
                    <ListItemText primary="Is Voting Enabled : " />
                    <ListItemText primary={IVE ? 'True' : 'False'} />
                </ListItem>
                <Button className='muibtn' variant="contained" color="primary" onClick={toggleIsVELocal}>Toggle</Button>
            </List>

            <List className='controllItem' style={{ paddingRight: '16px' }}>
                <ListItem className='muili'>
                    <ListItemText primary="Add New Candidate : "/>
                    <TextField
                        id="standard-read-only-input"
                        label="Candidate Name"
                        variant="standard"
                        onChange={e => { setInput_candidate(e.target.value) }}
                    />
                </ListItem>

                <Button className='muibtn' variant="contained" color="primary" onClick={addCandidateLocal} >Add Candidate</Button>
            </List>

            <List className='controllItem' style={{ paddingRight: '16px' }}>
                <ListItem className='muili'>
                    <ListItemText primary="Add Users To Whitelist : "/>
                    <TextField
                        id="standard-read-only-input"
                        label="Wallet Address"
                        variant="standard"
                        onChange={e => { setInput_addWL(e.target.value) }}
                    />
                </ListItem>

                <Button className='muibtn' variant="contained" color="primary" onClick={addToWhiteList} >Whitelist Address</Button>
            </List>

            <List className='controllItem' style={{ paddingRight: '16px' }}>
                <ListItem className='muili'>
                    <ListItemText primary="Remove Users from Whitelist : "/>
                    <TextField
                        id="standard-read-only-input"
                        label="Wallet Address"
                        variant="standard"
                        onChange={e => { setInput_removeWL(e.target.value) }}
                    />
                </ListItem>

                <Button className='muibtn' variant="contained" color="primary" onClick={removeFromWhiteList} >UNWhitelist Address</Button>
            </List>
        </>
    );
}

export default OwnerPart;