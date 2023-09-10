import { User } from '@microsoft/microsoft-graph-types';
import { getUsersAsync } from '../Shared/graphCall';
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as querystring from 'querystring';

const listUsersAsync: AzureFunction = async function (context: Context, req: HttpRequest){
  
    console.log("Request received")
    // parse the request body to retrieve the user's name and email
    const formData = querystring.parse(req.body);
    console.log('user ', formData)
    const email = formData.email
    const userName = formData.name
    // uses the getUsersAsync function from graphCall to find
    // if any users have the same email as the one provided
    const userPage = await getUsersAsync(email);
    const users: User[] = userPage.value;
    if (users.length === 0){
      // if no users were found, a message is sent to the frontend
      // saying no users were found
      console.log('no users')
      context.res = {
        body: { users: 'No users found'}
    };
    }
    else{
      
      //retrieves the user details from the  const
      const retrieved = users[0]
      //checks if the name of the user sent from the frontend is 
      // the same as the name retrieved from microsoft graph
      if (retrieved.displayName.toLowerCase() !== userName){
        //if they are not, a message is sent saying the details do not match
        context.res = {
          body: { message: "Incorrect Details"}
      }}
      
      else{
        context.res = {
        body: { message: "Details match"}
      }
      
    };

    }
  }

export default listUsersAsync;