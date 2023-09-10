import { User } from '@microsoft/microsoft-graph-types';
import { getUsersAsync } from '../Shared/graphCall';
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as querystring from 'querystring';

const listUsersAsync: AzureFunction = async function (context: Context, req: HttpRequest){
    console.log("Request received")
    // parses the data received from the frontend
    const formData = querystring.parse(req.body);
    console.log('user ', formData)
    const email = formData.email
    // retrieves the user information
    const userPage = await getUsersAsync(email);
    // makes a call to microsoft graph using getUsersAsync from
    // the graphCall file
    const users: User[] = userPage.value;
    // retrieves the value returned
    if (users.length === 0){
      console.log('no users')
      // sends a 'no users found' message back to the 
      // if there is no user details in the users const
      context.res = {
        body: { users: 'No users found'}
    };
    }
    else{
      // sends the user details to the frontend      
      context.res = {
        body: { users: users}
    };
    }
  }

export default listUsersAsync;