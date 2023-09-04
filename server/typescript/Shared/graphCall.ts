import { ClientSecretCredential } from '@azure/identity';
import { Client, PageCollection } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import 'isomorphic-fetch';

let clientCredentials: ClientSecretCredential | undefined = undefined;;
let appClient: Client | undefined = undefined;

function ensureAuthentication() {

  if (!clientCredentials) {
    
    if (!process.env.TENANT_ID || !process.env.CLIENT_ID || !process.env.CLIENT_SECRET) {
      console.log('There is missing information in the settings');
      throw new Error('There is missing information in the settings');
    }
    
  else{

  
    clientCredentials = new ClientSecretCredential(
      process.env.TENANT_ID,
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET
    );}
  }

  if (!appClient) {
    const authentication = new TokenCredentialAuthenticationProvider(
      clientCredentials, {
        scopes: [ 'https://graph.microsoft.com/.default' ]
      });

    appClient = Client.initWithMiddleware({
      authProvider: authentication
    });
  }
}

async function createMeeting(userId, start, end, subject) {
    ensureAuthentication();
    const newMeeting = `/users/${userId}/calendar/events`;
    
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
    
    const newEvent = await appClient.api(newMeeting).post(event);
    return newEvent;     
  }
     
export default createMeeting;

export async function getUsersAsync(email: string | string[]): Promise<PageCollection> {
  ensureAuthentication();
  // Ensure client isn't undefined
  const users = appClient.api('/users')
    .select(['displayName', 'id', 'mail'])
    .filter(`imAddresses/any(i:i eq '${email}')`)
    .get();

    return users;
}