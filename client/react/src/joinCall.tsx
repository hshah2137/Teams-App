import { AzureCommunicationTokenCredential, CommunicationUserIdentifier } from '@azure/communication-common';
import { useLocation } from "react-router-dom";
import {  
  CallWithChatComposite, 
  fromFlatCommunicationIdentifier, 
  useAzureCommunicationCallWithChatAdapter,
} from '@azure/communication-react';
import { useState, useMemo, useEffect } from 'react';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

const JoinCallPage = () => {

    //const [link, setLink]= useState('')

    const location = useLocation();

    //const displayName = 'Guest'
    const [userId, setUserId] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [teamsMeetingLink, setTeamsMeetingLink] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [displayName, setDisplay] = useState<string>('');
    

    const credential = useMemo(() => {
        if (token) {
          return new AzureCommunicationTokenCredential(token)
        }
        return;
        }, [token]);

    const callAdapterArgs = useMemo(() => {
            if (userId && credential && displayName && teamsMeetingLink) {
              return {
                userId: fromFlatCommunicationIdentifier(userId) as CommunicationUserIdentifier,
                displayName,
                credential,
                locator: { meetingLink: teamsMeetingLink },
                endpoint: "https://communication-resource-ixn.unitedstates.communication.azure.com/"
              }
            }
            return {};
        }, [userId, credential, displayName, teamsMeetingLink]);

          const callAdapter = useAzureCommunicationCallWithChatAdapter(callAdapterArgs);
          //const callAdapter = useAzureCommunicationCallAdapter(callAdapterArgs);

          useEffect(() => {
            const init = async () => {
              
              setMessage('Getting ACS user');
              
              //Call Azure Function to get the ACS user identity and token
              try {
                const res = await fetch(process.env.REACT_APP_ACS_USER_FUNCTION as string);
              const user = await res.json();
              console.log(res)
              SetrequestStatus(true)
              setUserId(user.userId);
              setToken(user.token);
              console.log(user.token);

              setMessage("Checking Teams link")
                
              }
              catch (error) {
                setMessage("Sorry, there are connection problems at the moment. Please try again later")
                console.log(error)
              }
    
            }
            init();
          }, []);
    

    useEffect(()=>{
        const link_info = location.state;
        setTeamsMeetingLink(link_info.link)
        setDisplay(link_info.displayName)
    },[location.state]
    )

    const [requestMade, SetrequestStatus] = useState(false)

    //const userID = fromFlatCommunicationIdentifier('8:acs:66a9f55d-36c9-4cb7-b90e-4148b1363ade_0000001a-3b27-85e0-3ef0-8b3a0d0034e0')

    if (callAdapter) {
        return (
          
            <FluentProvider theme={teamsLightTheme}>
            <div className="wrapper" style ={{backgroundColor: '#F5F5F5', height: "90vh", padding: "5%"
          }}>
              <CallWithChatComposite
              
                adapter={callAdapter}
                
              />
            </div>
          </FluentProvider>
        );
      }
      if (!credential && requestMade === true) {
        return <>Failed to construct credential. Provided token is malformed.</>;
      }
      if (message) {
        return <div style = {{marginTop: '3vh'}}>{message}</div>;
      }
      return <div>Initializing...</div>;
   
}

export default JoinCallPage;