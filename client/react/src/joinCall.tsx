import { AzureCommunicationTokenCredential, CommunicationUserIdentifier } from '@azure/communication-common';
import { useLocation } from "react-router-dom";
import {  CallWithChatComposite, fromFlatCommunicationIdentifier, useAzureCommunicationCallWithChatAdapter} from '@azure/communication-react';
import { useState, useMemo, useEffect } from 'react';
import { FluentProvider, teamsLightTheme } from '@fluentui/react-components';

const JoinCallPage = () => {
  
    // Location is used to access state variables
    const location = useLocation();
    //Functions and variables relating to various arguments needed to join a Teams call
    const [userId, setUserId] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [teamsMeetingLink, setTeamsMeetingLink] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [displayName, setDisplay] = useState<string>('');
    // Immediately accesses the link and guest name from the previous page and stores them
    useEffect(()=>{
      const link_info = location.state;
      setTeamsMeetingLink(link_info.link)
      setDisplay(link_info.displayName)
      },[location.state])

    // credential and call adapter args are memoized to prevent unnecessary re-computations
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
      return {};}, [userId, credential, displayName, teamsMeetingLink]);

    const callAdapter = useAzureCommunicationCallWithChatAdapter(callAdapterArgs);

    //Defines a function to call the Azure function in the backend, and calls it immediately
    useEffect(() => {
      const init = async () => {
              
      setMessage('Getting ACS user');
              
        //Call Azure Function to get the ACS user identity and token
        try {
          const res = await fetch(process.env.REACT_APP_ACS_USER_FUNCTION as string);
          const user = await res.json();
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
        init();}, []);
    
    // Variable which determines whether the API has been called
    const [requestMade, SetrequestStatus] = useState(false);
    //Conditional Rendering depending on the status of certain variables
    if (callAdapter) {
        return (
          <FluentProvider theme={teamsLightTheme}>
            <div className="wrapper" style ={{backgroundColor: '#F5F5F5', height: "90vh", padding: "5%"}}>
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