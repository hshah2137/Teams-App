import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import createNewMeetingAsync from '../Shared/graph';
import * as querystring from 'querystring';

let teamsMeetingLink;

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest){
    context.log("Request received");
    const userId = process.env.USER_ID;
    context.log('UserId', userId);

    const formData = querystring.parse(req.body);
    console.log('form', formData)
    const subject = formData.subject
    const startTime = formData.startTime
    console.log(formData.startTime)
    console.log(formData.subject)
    const endTime = formData.endTime
    
    
    teamsMeetingLink = await createNewMeetingAsync(userId, startTime, endTime, subject);
    const body = JSON.stringify(teamsMeetingLink);
    const meeting = JSON.parse(body);
    context.log("meeting:", meeting);
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: meeting.onlineMeeting.joinUrl
    }    
};

export default httpTrigger;