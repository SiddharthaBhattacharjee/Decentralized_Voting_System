import { useState } from 'react';
import { List, ListItem, ListItemAvatar, ListItemText, TextField } from '@mui/material';
import { Button } from "@mui/material";
import './OwnerPart.css';
import DisabledOverlay from './Disabled';

const VoteBox = (props) => {
    let ivFlag = props.isVEd;
    let candidate = props.cand;
    let candidateIndex = props.ci;
    let candidateVotes = props.cv;
    let isVEn = props.isVEn;

    let [voted, setVoted] = useState(ivFlag);

    const processVote = async () => {
        console.log("Voting for ", candidate, " , Index : ", candidateIndex);
        await props.vote(candidateIndex);
        console.log("Vote casted!");
        setVoted(true);
    }

    return (
        <>
            {
                isVEn ? (
                    <></>
                ) : (<DisabledOverlay />)
            }{
                voted ? (
                    <List className='controllItem' style={{ paddingRight: '16px' }}>
                        <ListItem className='muili'>
                            <ListItemText primary={candidate} />
                        </ListItem>
                        <ListItemText primary={candidateVotes.toString()} />
                    </List>
                ) : (
                    <List className='controllItem' style={{ paddingRight: '16px' }}>
                        <ListItem className='muili'>
                            <ListItemText primary={candidate} />
                        </ListItem>
                        <Button className='muibtn' variant="contained" color="primary" onClick={processVote}>Vote</Button>
                    </List>
                )}
        </>

    );
}

export default VoteBox;