import { User } from '@microsoft/microsoft-graph-types';
import { getUsersAsync } from '../Shared/graph';
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

    
    console.log(users)
      // Output each user's details
      for (const user of users) {
        console.log(`User: ${user.displayName ?? 'NO NAME'}`);
        console.log(`  ID: ${user.id}`);
        console.log(`  Email: ${user.mail ?? 'NO EMAIL'}`);
      }
  
      // If @odata.nextLink is not undefined, there are more users
      // available on the server
      const moreAvailable = userPage['@odata.nextLink'] != undefined;
      console.log(`\nMore users available? ${moreAvailable}`);
      context.res = {
        body: { users: users}
    };
    }
  }

export default listUsersAsync;