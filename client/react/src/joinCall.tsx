import { ContosoCallContainer } from "./justCall";
import { AzureCommunicationTokenCredential, CommunicationUserIdentifier } from '@azure/communication-common';
import { useLocation } from "react-router-dom";
import {  
  CallComposite,
  CallWithChatComposite, 
  fromFlatCommunicationIdentifier, 
  useAzureCommunicationCallAdapter,
  CallAndChatLocator,
  useAzureCommunicationCallWithChatAdapter,
  CallWithChatCompositeOptions
} from '@azure/communication-react';
import React, { useState, useMemo, useEffect } from 'react';

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
              const res = await fetch(process.env.REACT_APP_ACS_USER_FUNCTION as string);
              const user = await res.json();
              setUserId(user.userId);
              setToken(user.token);
              console.log(user.token)
    
            }
            init();
          }, []);
    

    useEffect(()=>{
        const link_info = location.state;
        setTeamsMeetingLink(link_info.link)
        setDisplay(link_info.subject)
    }
    )

    //const userID = fromFlatCommunicationIdentifier('8:acs:66a9f55d-36c9-4cb7-b90e-4148b1363ade_0000001a-3b27-85e0-3ef0-8b3a0d0034e0')

    if (callAdapter) {
        return (
          
            
            <div className="wrapper" style ={{paddingTop:"5%"}}>
              <CallWithChatComposite
                adapter={callAdapter}
              />
            </div>
          
        );
      }
      if (!credential) {
        return <>Failed to construct credential. Provided token is malformed.</>;
      }
      if (message) {
        return <div>{message}</div>;
      }
      return <div>Initializing...</div>;
   
}

export default JoinCallPage;