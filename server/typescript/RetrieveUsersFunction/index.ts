import { User } from '@microsoft/microsoft-graph-types';
import { getUsersAsync } from '../Shared/graphCall';
import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import * as querystring from 'querystring';

const listUsersAsync: AzureFunction = async function (context: Context, req: HttpRequest){
    console.log("Request received")
    const formData = querystring.parse(req.body);
    console.log('user ', formData)
    const email = formData.email
    const userPage = await getUsersAsync(email);
    const users: User[] = userPage.value;

    if (users.length === 0){
      console.log('no users')
      context.res = {
        body: { users: 'No users found'}
    };
    }
    else{
            
      context.res = {
        body: { users: users}
    };
    }
  }

export default listUsersAsync;