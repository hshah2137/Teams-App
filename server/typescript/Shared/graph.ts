import { startDateTimeAsync, endDateTimeAsync } from './dateTimeFormat';
import { ClientSecretCredential } from '@azure/identity';
import { Client, PageCollection } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials';
import 'isomorphic-fetch';

let clientSecretCredential;
let appGraphClient;

function ensureGraphForAppOnlyAuth() {

  if (!clientSecretCredential) {
    clientSecretCredential = new ClientSecretCredential(
      process.env.TENANT_ID,
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET
    );
  }

  if (!appGraphClient) {
    const authProvider = new TokenCredentialAuthenticationProvider(
      clientSecretCredential, {
        scopes: [ 'https://graph.microsoft.com/.default' ]
      });

    appGraphClient = Client.initWithMiddleware({
      authProvider: authProvider
    });
  }
}

async function createNewMeetingAsync(userId, start, end, subject) {
    ensureGraphForAppOnlyAuth();
    let startTime = await startDateTimeAsync();
    let endTime = await endDateTimeAsync();
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
    
    const newEvent = await appGraphClient.api(newMeeting).post(event);
    return newEvent;     
  }
     
export default createNewMeetingAsync;

/*export async function sendEmail() {
  ensureGraphForAppOnlyAuth();
  const sendMail = {
    message: {
      subject: 'Meet for lunch?',
      body: {
        contentType: 'Text',
        content: 'The new cafeteria is open.'
      },
      toRecipients: [
        {
          emailAddress: {
            address: 'hamzah@hshah2136.onmicrosoft.com'
          }
        }
      ],
      /*ccRecipients: [
        {
          emailAddress: {
            address: 'danas@contoso.onmicrosoft.com'
          }
        }
      ]* /
    },
    //saveToSentItems: 'false'
  };
  
  const response = await appGraphClient.api('/users/29bab168-0262-4142-b8f9-8543bc0f4249/sendMail')
    .post(sendMail);
    console.log(response)
}*/

export async function getUsersAsync(email: string | string[]): Promise<PageCollection> {
  ensureGraphForAppOnlyAuth();
  // Ensure client isn't undefined
  const users = appGraphClient.api('/users')
    .select(['displayName', 'id', 'mail'])
    .filter(`imAddresses/any(i:i eq '${email}')`)
    //.top(25)
    //.orderby('displayName')
    .get();

    return users;
}