import { CalendarAdd24Regular } from "@fluentui/react-icons/lib/cjs/index";
import PeopleCommunity24Regular from "@fluentui/react-icons/lib/esm/components/PeopleCommunity24Regular";
import { makeStyles, tokens, Divider } from "@fluentui/react-components";

const HomePage = () => {

    return(
        <div style = {{backgroundColor: '#F5F5F5', marginTop: '3vh', textAlign: 'left'}}>
        
        <h4 style = {{marginLeft: '5vh'}}>Command Centres Design: Microsoft Teams Functionality </h4>
        {/*<Divider />*/}
        <div style = {{display: 'flex',justifyContent:'flex-start', 
            }}>

        

        <h5 style={{ marginLeft: '5vh' }}>
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

        {/*<Divider />*/}

        <div style = {{display: 'flex',justifyContent:'flex-start', 
            }}>
        <h5 style={{ marginLeft: '5vh' }}>
            Join a meeting
        </h5> 
        <PeopleCommunity24Regular style={{ display: "inline-block", marginLeft: "10px" }} />
        </div>
        <div style = {{display: 'flex', justifyContent:'flex-start', alignItems: 'flex-start', textAlign: 'left', marginLeft: '5vh'}}>

                <ol style={{ listStyleType: 'disc', listStylePosition: 'inside', }}>
                    <li>Join a meeting by entering your name and a teams meeting link</li>
                    
                </ol>
        </div>
        
        </div>
    )
}

export default HomePage;