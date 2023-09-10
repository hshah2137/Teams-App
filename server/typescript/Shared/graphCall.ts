import { ClientSecretCredential } from '@azure/identity';
import { Client, PageCollection } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import 'isomorphic-fetch';

let clientCredentials: ClientSecretCredential | undefined = undefined;;
let appClient: Client | undefined = undefined;
// initialises variables which store the authentication credentials 
// and the microsoft graph client instance
function ensureAuthentication() {

  if (!clientCredentials) {
    
    if (!process.env.TENANT_ID || !process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
      // if there is missing information in the settings, an error is thrown
      console.log('There is missing information in the settings');
      throw new Error('There is missing information in the settings');
    }
    
  else{
    // if the clientCredentials havent been initialised
    // the credentials are retrieved from the local settings and used
    // to initialise it
    clientCredentials = new ClientSecretCredential(
      process.env.TENANT_ID,
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET
    );}
  }

  if (!appClient) {
    // If the appClient variable is undefined, a new authentication provider is 
    // created using the client credentials. This is used to create a new 
    // microsoft graph client so that the microsoft graph API can be accessed
    const authentication = new TokenCredentialAuthenticationProvider(clientCredentials, {
        scopes: [ 'https://graph.microsoft.com/.default' ]
      });

    appClient = Client.initWithMiddleware({
      authProvider: authentication
    });
  }
}

// Function which takes an email as a parameter, and searches all users
// in the directory to see if any have the same email as the one provided
export async function getUsersAsync(email: string | string[]): Promise<PageCollection> {
  ensureAuthentication();
  // Ensure microsoft graph client isn't undefined
  const users = appClient.api('/users')
    .select(['displayName', 'id', 'mail'])
    .filter(`imAddresses/any(i:i eq '${email}')`)
    .get();
  // gets the users name, azure id and email and sends it back 
    return users;
}

// function to create a teams meeting and write it to the calendar
// of the user whose user id is provided as a r. The start
// and end datetime and meeting subject are also provided 
async function createMeeting(userId, start, end, subject) {
    ensureAuthentication();
    // spepcifes the api where the event details are posted to
    const newMeeting = `/users/${userId}/calendar/events`;
    // the event details
    const event = {
      subject: subject,
      start: {
          dateTime: start,
          timeZone: 'UTC'
      },
      end: {
          dateTime: end,
          timeZone: 'UTC'
      },
      isOnlineMeeting: true
    };
    // send post request to the api with meeting details
    const newEvent = await appClient.api(newMeeting).post(event);
    // returns the meeting information
    return newEvent;     
  }
     
export default createMeeting;
