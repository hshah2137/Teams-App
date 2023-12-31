import { CalendarAdd24Regular } from "@fluentui/react-icons/lib/cjs/index";
import PeopleCommunity24Regular from "@fluentui/react-icons/lib/esm/components/PeopleCommunity24Regular";
import { teamsLightTheme, FluentProvider, Divider } from "@fluentui/react-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const HomePage = () => {

    const navigate = useNavigate();
    //Variables and functions for the "Create a meeting" heading, so that it is visibly lighter when the mouse is on it
    const [opacity, setOpacity] = useState(1);

    const createNavigate = () => {
        navigate('/validateUser')
    };

    const createStyle = {
        marginLeft: '5vh',
        opacity: opacity,
      };

    const handleMouseEnter = () => {
        setOpacity(0.7);
      };
    
    const handleMouseLeave = () => {
        setOpacity(1);
      };
      //Variables and functions for the "Join a meeting" heading, so that it is visibly lighter when the mouse is on it
    const joinNavigate = () => {
        navigate('/input')
    };
    const [joinOpacity, setJoinOpacity] = useState(1);

    const joinStyle = {
        marginLeft: '5vh',
        opacity: joinOpacity,
      };

    const handleMouseEnterJoin = () => {
        setJoinOpacity(0.7);
      };
    
    const handleMouseLeaveJoin = () => {
        setJoinOpacity(1);
      };

    return(
        <FluentProvider theme={teamsLightTheme}>
            <div style = {{backgroundColor: '#F5F5F5', marginTop: '3vh', textAlign: 'left'}}>
        
            <h4 style = {{marginLeft: '5vh'}}>Command Centres Design: Microsoft Teams Functionality </h4>
            <Divider style = {{paddingTop: '2vh', paddingBottom: '2vh', paddingRight: '2vw', paddingLeft: '2vw' }} />
            <div style = {{display: 'flex',justifyContent:'flex-start'}}>

            <h5 style={createStyle} 
                onClick= {createNavigate} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} >
                Create a meeting
            </h5> 
            <CalendarAdd24Regular style={{ display: "inline-block", marginLeft: "10px" }} />
            
            </div>

            <div style = {{display: 'flex', justifyContent:'flex-start', alignItems: 'flex-start', textAlign: 'left', marginLeft: '5vh'}}>
                <ol style={{ listStyleType: 'disc', listStylePosition: 'inside', }}>
                    <li>Create a meeting by entering your name, email, and other details</li>
                    <li>Choose an atendee</li>
                    <li>Receive a confirmation email with your meeting link to share</li>
                </ol>
            </div>

            <Divider style = {{paddingTop: '2vh', paddingBottom: '2vh', paddingRight: '2vw', paddingLeft: '2vw'}}/>

            <div style = {{display: 'flex',justifyContent:'flex-start'}}>
            <h5 style={joinStyle} 
                onClick= {joinNavigate} 
                onMouseEnter={handleMouseEnterJoin}
                onMouseLeave={handleMouseLeaveJoin}>
                Join a meeting
            </h5> 
            <PeopleCommunity24Regular style={{ display: "inline-block", marginLeft: "10px" }} />
            </div>

            <div style = {{display: 'flex', justifyContent:'flex-start', alignItems: 'flex-start', textAlign: 'left', marginLeft: '5vh'}}>

                <ol style={{ listStyleType: 'disc', listStylePosition: 'inside', }}>
                    <li>Join a meeting by entering your name and a teams meeting link</li>
                    <li>Please note: You join the call as a guest, and a user needs to admit you into the call via Teams</li>
                </ol>
            </div>

            <Divider style = {{paddingTop: '2vh', paddingBottom: '2vh', paddingRight: '2vw', paddingLeft: '2vw'}}/>

            </div>
        </FluentProvider>
    )
}

export default HomePage;