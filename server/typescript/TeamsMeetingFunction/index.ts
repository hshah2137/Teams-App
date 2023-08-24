import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import createNewMeetingAsync from '../Shared/graph';
import * as querystring from 'querystring';
import * as nodemailer from 'nodemailer';

let teamsMeetingLink;

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest){
    context.log("Request received");
    const formData = querystring.parse(req.body);
    console.log('form', formData)
    const subject = formData.subject
    const startTime = formData.startTime
    const userId = formData.userId
    console.log(formData.startTime)
    console.log(formData.subject)
    const endTime = formData.endTime

    const user_email = formData.email
    console.log("email: " + user_email)
    const userName = formData.name
    
    const atendee = formData.atendee
    
    teamsMeetingLink = await createNewMeetingAsync(userId, startTime, endTime, subject);
    const body = JSON.stringify(teamsMeetingLink);
    const meeting = JSON.parse(body);
    context.log("meeting:", meeting);

    console.log("start: " + meeting.start.dateTime)
    const start_date = new Date(meeting.start.dateTime)
    const end_date = new Date(meeting.end.dateTime)
    const timeZone = meeting.start.timeZone

    const formattedStartDate = start_date.toLocaleDateString(); // Format the start date
    const formattedStartTime = start_date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format the start time

    const formattedEndDate = end_date.toLocaleDateString(); // Format the end date
    const formattedEndTime = end_date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); // Format the end time

    console.log(formattedStartTime)
    console.log(formattedStartDate)
    
    context.res = {
        body: meeting.onlineMeeting.joinUrl
    }

     const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'ixn.project@gmail.com',
          pass: 'rclnxpoxybheyjes',
        },
      });
    
      const mailOptions_creator = {
        from: 'ixn.project@gmail.com',
        to: user_email,
        subject: 'Meeting Notification',
        text: 'Your meeting has been created from ' +
        formattedStartDate + ' ' + formattedStartTime
        + ' to ' + formattedEndDate + ' ' + formattedEndTime
        + '. Use the link below to join the meeting: \n' + meeting.onlineMeeting.joinUrl,
      };
      
      transporter.sendMail(mailOptions_creator, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      const mailOptions_atendee = {
        from: 'ixn.project@gmail.com',
        to: atendee,
        subject: 'Meeting Notification',
        text: 'You have been invited to a meeting created by '+ userName + ', ' + user_email + '. This meeting is from ' +
          formattedStartDate + ' ' + formattedStartTime
          + ' to ' + formattedEndDate + ' ' + formattedEndTime + 
        '. \n You can join this meeting with the following link: \n' + meeting.onlineMeeting.joinUrl,
      };
      
      transporter.sendMail(mailOptions_atendee, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

};

export default httpTrigger;