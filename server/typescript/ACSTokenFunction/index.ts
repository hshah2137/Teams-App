import { CommunicationIdentityClient } from '@azure/communication-identity';

module.exports = async function (context, req) {
    // Get ACS connection string from local.settings.json (or App Settings when in Azure)
    const ACSconnectionString = process.env.ACS_CONNECTION_STRING;
    const tokenClient = new CommunicationIdentityClient(ACSconnectionString);
    const user = await tokenClient.createUser();
    const userToken = await tokenClient.getToken(user, ["voip", "chat"]);
    context.res = {
        body: { userId: user.communicationUserId, ...userToken }
    };
}