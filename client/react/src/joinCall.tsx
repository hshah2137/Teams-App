import { AzureCommunicationTokenCredential, CommunicationUserIdentifier } from '@azure/communication-common';
import { useLocation } from "react-router-dom";
import {  CallWithChatComposite, fromFlatCommunicationIdentifier, useAzureCommunicationCallWithChatAdapter} from '@azure/communication-react';
import { useState, useMemo, useEffect } from 'react';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';
import { Theme, PartialTheme, Spinner, initializeIcons } from '@fluentui/react';

const JoinCallPage = () => {
  
    // Location is used to access state variables
    const location = useLocation();
    //Functions and variables relating to various arguments needed to join a Teams call
    const [userID, setUser] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [link, setLink] = useState<string>('');
    const [displayName, setDisplay] = useState<string>('');
    // Immediately accesses the link and guest name from the previous page and stores them
    useEffect(()=>{
      const link_info = location.state;
      setLink(link_info.link)
      setDisplay(link_info.displayName)
      setUser(link_info.userId);
      setToken(link_info.token);
      console.log(link_info)
      },[location.state])

    // credential and adapter args are memoized to prevent unnecessary re-computations
    const credential = useMemo(() => {
        if (token) {
          return new AzureCommunicationTokenCredential(token)
        }       
          return;     
        }, [token]);

    const teamsArgs = useMemo(() => {
      if (userID && credential && displayName && link) {
          return {
            userId: fromFlatCommunicationIdentifier(userID) as CommunicationUserIdentifier,
            displayName,
            credential,
            locator: { meetingLink: link },
            endpoint: "https://communication-resource-ixn.unitedstates.communication.azure.com/"
          }
        }
      return {};}, [userID, credential, displayName, link]);
    // adapter is created using information from previous page. 
    // This is needed for the video calling component
    const adapter = useAzureCommunicationCallWithChatAdapter(teamsArgs);

    //Conditional Rendering depending on the status of certain variables
    
    if (!adapter) {
      return <Spinner label="Connecting..." />;
    }
  
    return (
      <CallWithChatComposite
        adapter={adapter}
      />
    );
   
}

export default JoinCallPage;