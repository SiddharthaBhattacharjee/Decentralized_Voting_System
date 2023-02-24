import { bgcolor, display } from "@mui/system";
import metamaskimg from '../images/metamask.png';

const Top = (props) => {
    let uid = props.uid;
    return (
        <div style={{
            width: "100%",
            height: "10vh",
            position: "fixed",
            backgroundColor:"black",
            backgroundBlendMode:"lighten",
            color:"white",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft:"20px",
            paddingRight:"60px"
        }}>
            <div style={{fontWeight:"bolder",
        fontSize:"30px"}}>
                VoteChain
            </div>
            <div style={{width:"28.5%"}}>
                <img src={metamaskimg} alt="metamask"/> {uid}
            </div>
        </div>
    )
}

export default Top;