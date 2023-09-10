import { AzureFunction, Context, HttpRequest } from "@azure/functions";
import createMeeting from '../Shared/graphCall';
import * as querystring from 'querystring';
import * as nodemailer from 'nodemailer';

// function to retrieve meeting information from the frontend and create
// a meeting using the function in graphCall. This function will also send
// an automated email upon the creation of a meeting
const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest){
    context.log("Meeting information received");
    // retrieves the information from the body of the request such as 
    // the meeting subject, start and end datetime, and user is
    const formData = querystring.parse(req.body);
    console.log('form', formData)
    const subject = formData.subject
    const startTime = formData.startTime
    const userId = formData.userId
    console.log(formData.startTime)
    console.log(formData.subject)
    const endTime = formData.endTime
    // retreives the user's email and name
    const user_email = formData.email
    console.log("email: " + user_email)
    const userName = formData.name
    // retrieves the attendee's email
    const atendee = formData.atendee
    
    // creates a meeting using the createMeeting function in graphCall
    const teamsMeetingLink = await createMeeting(userId, startTime, endTime, subject);
    const body = JSON.stringify(teamsMeetingLink);
    //retrieves all the meeting information from the response
    const meeting = JSON.parse(body);
    context.log("meeting:", meeting);

    //retrieves the start and end dateime from the meeting information
    console.log("start: " + meeting.start.dateTime)
    const start_date = new Date(meeting.start.dateTime)
    const end_date = new Date(meeting.end.dateTime)
    // retrieves the time zone from the meeting information
    const timeZone = meeting.start.timeZone
    // splits the start datetime into a date and time
    const formattedStartDate = start_date.toLocaleDateString(); 
    const formattedStartTime = start_date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 
    // splits the end datetime into a date and time
    const formattedEndDate = end_date.toLocaleDateString(); 
    const formattedEndTime = end_date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); 

    console.log(formattedStartTime)
    console.log(formattedStartDate)
    // sends the meeting link back to the frontend
    context.res = {
        body: meeting.onlineMeeting.joinUrl
    }
    // retrieves the email and password from the local settings to 
    // send an automated email
    const email = process.env.EMAIL;
    const password = process.env.APP_PASSWORD;
    // creates a transport object to initiate a secure connection with the server
     const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
          user: email,
          pass: password,
        },
      });
    // creates the automated email send to the meeting creator
      const mailOptions_creator = {
        from: 'ixn.project@gmail.com',
        to: user_email,
        subject: 'Meeting Notification',
        text: 'Your meeting has been created from ' +
        formattedStartDate + ' ' + formattedStartTime + ' '
        + timeZone +' to ' + formattedEndDate + ' ' + formattedEndTime + ' '
        + timeZone + '. Use the link below to join the meeting: \n' + meeting.onlineMeeting.joinUrl,
      };
      //sends the email using the transport object
      transporter.sendMail(mailOptions_creator, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
       // creates the automated email send to the attendee
      const mailOptions_atendee = {
        from: 'ixn.project@gmail.com',
        to: atendee,
        subject: 'Meeting Notification',
        text: 'You have been invited to a meeting created by '+ userName + ', ' + user_email + '. This meeting is from ' +
          formattedStartDate + ' ' + formattedStartTime + ' '
          + timeZone + ' to ' + formattedEndDate + ' ' + formattedEndTime + ' '
          + timeZone + '. \n You can join this meeting with the following link: \n' + meeting.onlineMeeting.joinUrl,
      };
      //sends the email using the transport object
      transporter.sendMail(mailOptions_atendee, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

};

export default httpTrigger;