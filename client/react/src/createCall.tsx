import * as React from "react";
import {DatePicker, defaultDatePickerErrorStrings,} from "@fluentui/react-datepicker-compat";
import type { DatePickerValidationResultData } from "@fluentui/react-datepicker-compat";
import {PersonAdd24Regular, CalendarLtr24Regular} from '@fluentui/react-icons';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import {Dropdown, Option, useId, teamsLightTheme, FluentProvider, Input, Divider, 
  Field, webLightTheme, Dialog, DialogTrigger, DialogSurface, DialogTitle, DialogBody,
  DialogActions, DialogContent, Button} from "@fluentui/react-components";
import * as EmailValidator from 'email-validator';

const CreateCall = () => {
  
  // Default ids for the values in the dropdwon list
  const dropdownId = useId("dropdown-default");
  
  // Functions and variables so that the 'Create meeting' button  appears 
  // visibly different when the mouse hovers over it
  const [opacity, setOpacity] = React.useState(1);

  const buttonStyle = {
      backgroundColor: '#464EB8',
      color: 'white',
      padding: '10px 20px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '16px',
      opacity: opacity,
    };

  const handleMouseEnter = () => {
    setOpacity(0.7);
    };

  const handleMouseLeave = () => {
    setOpacity(1);
    };

  // All the times in a day for the dropdown list
  const today = new Date();  
  const options = [
    "00:00", "00:30","01:00", "01:30",
    "02:00", "02:30","03:00", "03:30",
    "04:00", "04:30","05:00", "05:30",
    "06:00", "06:30","07:00", "07:30",
    "08:00", "08:30","09:00", "09:30",
    "10:00", "10:30","11:00", "11:30",
    "12:00", "12:30","13:00", "13:30",
    "14:00", "14:30","15:00", "15:30",
    "16:00", "16:30","17:00", "17:30",
    "18:00", "18:30","19:00", "19:30",
    "20:00", "20:30","21:00", "21:30",
    "22:00", "22:30","23:00", "23:30",
  ];
  
  const inputId = useId("input-with-placeholder");
// Variables and functions relating to the start and end date selected by the user
  const [date, setDate] = React.useState<Date | null|  undefined>(new Date());
  const [endDate, setEndDate] = React.useState<Date | null|  undefined>(new Date());

  // Formats the date to be displayed correctly in the datepicker
  const onFormatDate = (date?: Date): string => {
    return !date
    ? ""
    : (date.getDate()) +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        (date.getFullYear() % 100);
  };

  
  // Variables and functions for if there is an invalid input for the datepicker 
  // for both the start and end date
  const [error, setError] =
    React.useState<DatePickerValidationResultData["error"]>(undefined);

  const [endDateError, setEndError] =
    React.useState<DatePickerValidationResultData["error"]>(undefined);

  // Functions that update the start and end date values
  const handleDateChange = (date: Date  | null| undefined) => {
      setDate(date);
    };

  const handleEndDateChange = (date: Date  | null| undefined) => {
      setEndDate(date);
    };

  // UseStates for the start and end time selected in the relevant dropdown
  const [startTime, setStart]= React.useState<String | undefined>();
  const [endTime, setEnd]= React.useState<String | undefined>();

  // Functions to set the start and end time when selected in the 
  // dropdown
  const handleStartTimeChange = (option: string) => {
    setStart(option);
    console.log(option)
    };

  const handleEndTimeChange = (option: string) => {
      setEnd(option);
      console.log(option)
    };

  // A function which combines the date and time into one string in 
  // ISO 8601 format. This is important for when the start and end 
  // datetimes are sent to the backend to create a meeting
  const convertDateTime = (date: Date, time: String) =>{
    console.log(date)
    const dateStr = date
    const timeStr = time;
    console.log(dateStr)

    const parsedDate = new Date(dateStr);

    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
    const day = String(parsedDate.getDate()).padStart(2, '0');

    const [hours, minutes] = timeStr.split(':');

    const combinedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:00`;
    console.log(combinedDateTime);
    return combinedDateTime 
  };

  // The location and a useEffect is used to access variables passed in from the previous page
  const location = useLocation();
  const [user_email, setUserEmail] = React.useState("");
  const [user_name, setUserName] = React.useState("");

  React.useEffect(()=>{
    const user_info = location.state;
    setUserEmail(user_info.email)
    setUserName(user_info.name)
  },[])

  // Functions and variables to handle setting the meeting subject, link and atendee email
  const [subject, setSubject] = React.useState<String | null >();
  const [meetinglink, setLink] = React.useState("");
  const [atendee_email, setEmail] = React.useState("")

  // Functions and variables relating to the content of the modal, which can be an error message or
  // success message, depending on the outcome of functions called once the 'Create Meeting' button 
  // is pressed
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [responseBody, setResponseBody] = React.useState<String | null >();
  const [modalTitle, setTitle] = React.useState<String | null >();

  const navigate = useNavigate();

  const modalHandle = (event: React.MouseEvent<HTMLButtonElement>) =>{
    setIsDialogOpen(false);
    // If  a meeting is successfully created, the user is redirected to the home page
    if (modalTitle === 'Success! Your meeting has been successfully created'){
      navigate('/')
    }
  }

  // Function which is called when the 'Create Meeting' button is clicked. It first will check if the email of the 
  // atendee is valid, otherwise an error modal will appear. If it passes the check, it will check that all the 
  // fields are filed, and the dates and times will be combined. If the start date is after the end date, the 
  // error modal will appear notifying the user. Otherwise, it will call the getUser function, to retrieve the 
  // AzureID of the email passed in from the previous page
  const clickHandle = (event: React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault()
    setTitle("")
    setResponseBody(""); 
    setLink("")
    
    if (date && startTime && endDate && endTime !== undefined && subject !== "" && subject!= null && atendee_email !== "" && atendee_email != null){
      if (EmailValidator.validate(atendee_email)){
        const finale_start = convertDateTime(date, startTime);
        const finale_end = convertDateTime(endDate, endTime);

        const date_start = new Date(finale_start)
        const date_end = new Date(finale_end)

        if (date_start >= date_end){
          setTitle("Something went wrong")
          setResponseBody("The start date cannot be after the end date.");
          setIsDialogOpen(true);
        }
      else{
        console.log("success")
        console.log(subject)
        console.log(finale_start)
        console.log(finale_end)
        getUser(user_email, subject, finale_start, finale_end)
      }
    }
    else{
      setTitle("Invalid Email")
      setResponseBody("We are sorry. '" + atendee_email + "' is not a valid email");
      setIsDialogOpen(true);
    }
    }

    else {
      setTitle("Please fill in all the fields")
      setResponseBody("All the fields must be filled before a meeting can be booked."); 
      setIsDialogOpen(true);
      console.log("Please fill all the fields")
    }
    }

  // This function makes an API call to retrieve the Azure ID of the creator's email. An error message can occur
  // if the connection is bad
  const getUser = async (email: String, subject: String, start: String, end: String)=>{
    try{
        const response = await axios.post(process.env.REACT_APP_RETRIEVE_USERS_FUNCTION as string,
        {
          email: email,
          
        },  {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        console.log(response.data)
        if (response.data.users[0].id !== undefined){
          console.log(response.data.users[0].id)
          const id = response.data.users[0].id
          
          createMeeting( id ,subject, start, end, user_name , user_email, atendee_email)
        }
        // This else statement is here just in case of error handling and is unlikely to be needed as the email 
        // has to pass validation on the previous page to get to this page. It is only here in case a user navigates to 
        // this page via the browser and tries to book a meeting
        else{
          setTitle("Something went Wrong")
          setResponseBody("We are sorry, there was no user with the email '" + email + "'. Please go back to the previous page and re-enter your details."); 
          setIsDialogOpen(true);
          console.log("no users found")
        }
        
    }
    catch(error) {
      setTitle("Something went Wrong")
      setResponseBody("We are sorry, there was an error booking your meeting. Please try again later.");
      setIsDialogOpen(true);
      console.log(error)
    }
  }
    
  // This makes an API call to create a meeting. If successful, a success modla will appear with the meeting link, which the user can copy if 
  // they wish to do so
  const createMeeting = async (userId: String, subject: String, start: String, end: String, name: string, email: string, atendee: String)=>{
    try{
        const response = await axios.post(process.env.REACT_APP_TEAMS_MEETING_FUNCTION as string,
        { 
          userId: userId,
          subject: subject,
          startTime: start,
          endTime: end,
          name: name,
          email: email,
          atendee: atendee
        },  {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        console.log(response.data)
        setTitle("Success! Your meeting has been successfully created")
        setLink(response.data)
        const message = "A confirmation email has also been sent to " + 
                          user_email +  " and " +  atendee_email + " with the following link. Please note this may be in your spam:  "
        setResponseBody(message); 
        setIsDialogOpen(true);
        
    }
    catch(error) {
      setTitle("Something went Wrong")
      setResponseBody("We are sorry, there was an error booking your meeting. Please try again later.");
      setIsDialogOpen(true); 
      console.log(error)
    }
  }



  return (
      
    <FluentProvider theme={teamsLightTheme} style ={{marginBottom: '4vh', marginTop: '3vh', backgroundColor : '#F5F5F5'}}>
      
      <h4 style = {{alignItems: 'center', marginLeft: '5vw'}}>Enter the meeting details</h4>
      
      <Divider style = {{paddingTop: '2vh', paddingRight: '2vw', paddingLeft: '2vw' }} />
      
      <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: '4vh'}}>

        <CalendarLtr24Regular style={{ display: "inline-block", marginRight: "10px" }}/>

          <Input style={{width:'70vw'}} placeholder="Enter the meeting subject" id={inputId} 
          onChange={(ev, data) =>setSubject(data.value)}/>

      </div>

      <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: '4vh'}}>

        <PersonAdd24Regular style={{ display: "inline-block", marginRight: "10px" }} />
        

        <Input style={{width:'70vw'}} placeholder="Add required atendee's email" id={inputId} 
          onChange={(ev, data) =>setEmail(data.value)}/>

      </div>
      
      <div style = {{display: 'flex', marginTop: '4vh', marginLeft:'7.5vw', justifyContent:'center', alignItems: 'center', marginRight:'7.5vw'}}>

        <p style={{ marginRight: "10px", marginTop: '12px' }}>Start Date:</p>

        <FluentProvider theme={teamsLightTheme}>
        <Field validationMessage={error && defaultDatePickerErrorStrings[error]} >
        <DatePicker
          minDate={today}
          value={date}
          formatDate={onFormatDate}
          placeholder="Select a date..."
          allowTextInput
          onValidationResult={(data) => setError(data.error)}
          style={{ width: '20vw'}}
          underlined={true}
          isMonthPickerVisible={false}
          onSelectDate={handleDateChange}
        />
        </Field>
        </FluentProvider>

        <p style={{ display: "inline-block", marginTop: '12px', marginRight: "10px", marginLeft: "5vw",}}>Start Time:</p>
      
        <Dropdown
          aria-labelledby={dropdownId}
          placeholder="Select a start time"
          //style = {{width: '1vw'}}
          onOptionSelect={(ev, option) => handleStartTimeChange(option?.optionValue || "")}>
          
          {options.map((option) => (
            <Option key={option}
            
            style = {{backgroundColor: 'white'}}  >
              {option}
            </Option>
          ))}

        </Dropdown>

      </div>

      <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: '3.5vh',  marginLeft:'7.5vw',marginRight:'7.5vw'}}>

        <p style={{ display: "inline-block", marginRight: "15px", marginTop: '12px' }}>End Date:</p>
        <FluentProvider theme={webLightTheme}>
        <Field validationMessage={endDateError && defaultDatePickerErrorStrings[endDateError]} >
          
          <DatePicker
          minDate={today}
          value={endDate}
          formatDate={onFormatDate}
          placeholder="Select a date..."
          allowTextInput
          onValidationResult={(data) => setEndError(data.error)}
          style = {{width: '20vw'}}
          underlined = {true}
          isMonthPickerVisible = {false}
          onSelectDate={handleEndDateChange}/>
        </Field>
        </FluentProvider>
    
        <p style={{ display: "inline-block", marginTop: '12px', marginRight: "10px", marginLeft: "5vw"}}>End Time:</p>
      
        <Dropdown
          aria-labelledby={dropdownId}
          placeholder="Select an end time"
          //style = {{width: '15vw'}}
          onOptionSelect={(ev, option) => handleEndTimeChange(option?.optionValue || "")}>

          {options.map((option) => (
            <Option key={option} style = {{backgroundColor: 'white'}}  >
              {option}
            </Option>
          ))}
        </Dropdown>

      </div>

      <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: '3.5vh', marginBottom: '4vh'}}>

        <button 
          style = {buttonStyle} 
          onClick={(event) => clickHandle(event)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          Create Meeting
        </button>
                
      </div>

        <Dialog open={isDialogOpen}>

          <DialogSurface>
            <DialogBody>
              <DialogTitle>{modalTitle}</DialogTitle>

              <DialogContent>
              <div style={{ display: 'block', marginBottom: '10px' }}>
                {responseBody}
              </div>
              <div style={{ display: 'block' }}>
              <a href={meetinglink}>{meetinglink}</a>
              </div>
              </DialogContent>

              <DialogActions>
                <DialogTrigger disableButtonEnhancement>
                  <Button appearance="secondary" onClick={(event) => modalHandle(event)}>Close</Button>
                </DialogTrigger>

              </DialogActions>
            </DialogBody>
          </DialogSurface>
        </Dialog>

</FluentProvider>  
  );
};

export default CreateCall;