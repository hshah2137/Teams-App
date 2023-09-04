import { CommunicationIdentityClient } from '@azure/communication-identity';
import { AzureFunction} from "@azure/functions";

const ACSFunction: AzureFunction = async function (context, req) {
    const ACSconnectionString = process.env.ACS_CONNECTION_STRING;
    const client = new CommunicationIdentityClient(ACSconnectionString);
    const user = await client.createUser();
    const userToken = await client.getToken(user, ["voip", "chat"]);
    console.log(userToken.token)
    context.res = {
        body: { userId: user.communicationUserId, token: userToken.token }
    };
}

export default ACSFunction;