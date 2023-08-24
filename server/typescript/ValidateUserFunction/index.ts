import { User } from '@microsoft/microsoft-graph-types';
import { getUsersAsync } from '../Shared/graph';
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as querystring from 'querystring';

const listUsersAsync: AzureFunction = async function (context: Context, req: HttpRequest){
  
    console.log("Request received")
    const formData = querystring.parse(req.body);
    console.log('user ', formData)
    const email = formData.email
    const userName = formData.name
    const userPage = await getUsersAsync(email);
    const users: User[] = userPage.value;
    if (users.length === 0){
      console.log('no users')
      context.res = {
        body: { users: 'No users found'}
    };
    }
    else{

  
      const retrieved = users[0]
      if (retrieved.displayName.toLowerCase() !== userName){
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