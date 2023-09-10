import { CommunicationIdentityClient } from '@azure/communication-identity';
import { AzureFunction} from "@azure/functions";

// Function for creating a new user identity and retrieving
// an access token using the azure communication services resource
const ACSFunction: AzureFunction = async function (context, req) {
    // retrieves the connection string for the resource from the settings
    const ACSconnectionString = process.env.ACS_CONNECTION_STRING;
    // Communication identity client provides methods which allows users 
    // to be created and tokens to be retrieved
    const client = new CommunicationIdentityClient(ACSconnectionString);
    const user = await client.createUser();
    // retrieves token for voice and chat capabilities
    const userToken = await client.getToken(user, ["voip", "chat"]);
    console.log(userToken.token)
    // sends the userid and token back to the frontend
    context.res = {
        body: { userId: user.communicationUserId, token: userToken.token }
    };
}

module.exports = ACSFunction;