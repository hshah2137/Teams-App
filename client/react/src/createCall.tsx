import * as React from "react";
import {DatePicker, defaultDatePickerErrorStrings,} from "@fluentui/react-datepicker-compat";
import { makeStyles, Dropdown,
  Option,
  shorthands,
  useId, teamsLightTheme, 
  FluentProvider, Input, Divider, Field, 
  webLightTheme, } from "@fluentui/react-components";
import type { DatePickerValidationResultData } from "@fluentui/react-datepicker-compat";
import {PersonAdd24Regular, CalendarLtr24Regular} from '@fluentui/react-icons';
import { useLocation, useNavigate } from "react-router-dom";
import axios from 'axios';
import {
  Dialog,
  DialogTrigger,
  DialogSurface,
  DialogTitle,
  DialogBody,
  DialogActions,
  DialogContent,
  Button,
} from "@fluentui/react-components";
import type { DatePickerProps } from "@fluentui/react-datepicker-compat";


const today = new Date();
//const minDate = addMonths(today, -1);
//const maxDate = addYears(today, 1);

const useStyles = makeStyles({
  root: {
    // Stack the label above the field with a gap
    //display: "grid",
    gridTemplateRows: "repeat(1fr)",
    justifyItems: "start",
    ...shorthands.gap("2px"),
    maxWidth: "400px",
    display: 'flex',
    justifyContent:'center', 
    alignItems: 'center'
  },
});

const CreateCall = () => {
  const styles = useStyles();
  const dropdownId = useId("dropdown-default");

  const options = [
    "00:00", "00:30",
    "01:00", "01:30",
    "02:00", "02:30",
    "03:00", "03:30",
    "04:00", "04:30",
    "05:00", "05:30",
    "06:00", "06:30",
    "07:00", "07:30",
    "08:00", "08:30",
    "09:00", "09:30",
    "10:00", "10:30",
    "11:00", "11:30",
    "12:00", "12:30",
    "13:00", "13:30",
    "14:00", "14:30",
    "15:00", "15:30",
    "16:00", "16:30",
    "17:00", "17:30",
    "18:00", "18:30",
    "19:00", "19:30",
    "20:00", "20:30",
    "21:00", "21:30",
    "22:00", "22:30",
    "23:00", "23:30",
  ];
  
  const inputId = useId("input-with-placeholder");

  const onFormatDate = (date?: Date): string => {
    return !date
    ? ""
    : (date.getDate()) +
        "/" +
        (date.getMonth() + 1) +
        "/" +
        (date.getFullYear() % 100);
    //return `${date?.getMonth()}/${date?.getDate()}/${date?.getFullYear()}`;
};

  const [date, setDate] = React.useState<Date | null|  undefined>(new Date())
  const [endDate, setEndDate] = React.useState<Date | null|  undefined>(new Date())

  const [error, setError] =
    React.useState<DatePickerValidationResultData["error"]>(undefined);

    const [endDateError, setEndError] =
    React.useState<DatePickerValidationResultData["error"]>(undefined);

    const handleDateChange = (date: Date  | null| undefined) => {
      setDate(date);
    };

    const handleEndDateChange = (date: Date  | null| undefined) => {
      setEndDate(date);
    };

    const [startTime, setStart]= React.useState<String | undefined>()
    const [endTime, setEnd]= React.useState<String | undefined>()

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

    const handleStartTimeChange = (option: string) => {
      setStart(option);
      console.log(option)
    };

    const handleEndTimeChange = (option: string) => {
      setEnd(option);
      console.log(option)
    };

    const convertDateTime = (date: Date, time: String) =>{
      console.log(date)
      //const dateStr = date.toUTCString();
      const dateStr = date
      const timeStr = time;
      console.log(dateStr)

      const parsedDate = new Date(dateStr);
      

      const year = parsedDate.getFullYear();
      const month = String(parsedDate.getMonth() + 1).padStart(2, '0');
      const day = String(parsedDate.getDate()).padStart(2, '0');

      const [hours, minutes] = timeStr.split(':');

// Step 4: Create the final combined date-time string in the required format
      const combinedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:00`;
      console.log(combinedDateTime);
      return combinedDateTime 
    }

  const clickHandle = (event: React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault()
    setTitle("")
    setResponseBody(""); // Save the response body to state
    setLink("")
    
    if (date && startTime && endDate && endTime !== undefined && subject !== "" && subject!= null && atendee_email !== "" && atendee_email != null){
      const finale_start = convertDateTime(date, startTime);
      const finale_end = convertDateTime(endDate, endTime);

      const date_start = new Date(finale_start)
      const date_end = new Date(finale_end)

      if (date_start >= date_end){
        console.log("start and end time cannot be the same")
        setTitle("Something went wrong")
      setResponseBody("The start date cannot be after the end date."); // Save the response body to state
      setIsDialogOpen(true);
      }
      else{
        console.log("good")
        console.log(subject)
        console.log(finale_start)
        console.log(finale_end)
        getUser(user_email, subject, finale_start, finale_end)
        //createMeeting(subject, finale_start, finale_end)
      }
    }

    else {
      setTitle("Please fill in all the fields")
      setResponseBody("All the fields must be filled before a meeting can be booked."); // Save the response body to state
      setIsDialogOpen(true);
      console.log("Please fill all the fields")
    }
     
  }
    
  const [subject, setSubject] = React.useState<String | null >();
  const [meetinglink, setLink] = React.useState(""); 

  const createMeeting = async (userId: String, subject: String, start: String, end: String, name: string, email: string, atendee: String)=>{
    try{
        const response = await axios.post('http://localhost:7071/api/TeamsMeetingFunction',
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
                          user_email +  " and " +  atendee_email + ". Please check your spam for an email with the following link: "
        setResponseBody(message); // Save the response body to state
        setIsDialogOpen(true);
        
    }
    catch(error) {
      setTitle("Something went Wrong")
      setResponseBody("We are sorry, there was an error booking your meeting. Please try again later.");
      setIsDialogOpen(true); 
      console.log(error)
    }
  }

  const location = useLocation();
  const [user_email, setUserEmail] = React.useState("");
  const [user_name, setUserName] = React.useState("");

  React.useEffect(()=>{
    //console.log(date)
    //console.log(subject)
    const user_info = location.state;
    setUserEmail(user_info.email)
    setUserName(user_info.name)
  },[])

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [responseBody, setResponseBody] = React.useState<String | null >();
  const [modalTitle, setTitle] = React.useState<String | null >();

  const navigate = useNavigate();

  const modalHandle = (event: React.MouseEvent<HTMLButtonElement>) =>{
    setIsDialogOpen(false);
    if (modalTitle === 'Success! Your meeting has been successfully created'){
      navigate('/')
    }
  }

  const [atendee_email, setEmail] = React.useState("")
  const [atendee_ID, setID] = React.useState("")

  const getUser = async (email: String, subject: String, start: String, end: String)=>{
    try{
        const response = await axios.post('http://localhost:7071/api/RetrieveUsersFunction',
        {
          email: email,
          
        },  {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        console.log(response.data)
        //console.log(response.data[0].id)
        if (response.data.users[0].id !== undefined){
          console.log(response.data.users[0].id)
        setID(response.data.users[0].id)
        const id = response.data.users[0].id
        //setEmail(response.data); // Save the response body to state
        //setIsDialogOpen(true); 
        createMeeting( id ,subject, start, end, user_name , user_email, atendee_email)
        }
        else{
          setTitle("Something went Wrong")
          setResponseBody("We are sorry, there was no user with the email: " + email); // Save the response body to state
          setIsDialogOpen(true);
          console.log("no users found")
        }
        
    }
    catch(error) {
      setTitle("Something went Wrong")
      setResponseBody("We are sorry, there was an error booking your meeting. Please try again later."); // Save the response body to state
      setIsDialogOpen(true);
      console.log(error)
    }
  }


  return (
    
    <div style ={{ backgroundColor : '#F5F5F5'}}>
      
    <FluentProvider theme={teamsLightTheme} style ={{marginBottom: '4vh', marginTop: '3vh', backgroundColor : '#F5F5F5'}}>
      <h4 style = {{alignItems: 'center', marginLeft: '5vw'}}>Enter the meeting details</h4>
      <Divider style = {{paddingTop: '2vh', paddingRight: '2vw', paddingLeft: '2vw' }} />
        <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: '4vh'}}>

        {/*<p style={{ display: "inline-block", marginRight: "10px" }}>Meeting Subject: </p>
          */}

        <CalendarLtr24Regular style={{ display: "inline-block", marginRight: "10px" }}/>

          <Input style={{width:'70vw'}} placeholder="Enter the meeting subject" id={inputId} 
          onChange={(ev, data) =>setSubject(data.value)}/>

        </div>

        <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: '4vh'}}>

          <PersonAdd24Regular style={{ display: "inline-block", marginRight: "10px" }} />
        

          <Input style={{width:'70vw'}} placeholder="Add required atendee's email" id={inputId} 
          onChange={(ev, data) =>setEmail(data.value)}/>

        </div>
      
    <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: '4vh',}}>

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
          style={{ width: '25vw'}}
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
        style = {{width: '20vw', maxHeight: '10vh'}}
        onOptionSelect={(ev, option) => handleStartTimeChange(option?.optionValue || "")} // Handle the selection change  
      >

        {options.map((option) => (
          <Option key={option}
          //onSelect={setStart} 
          style = {{backgroundColor: 'white'}}  >
            {option}
          </Option>
        ))}

      </Dropdown>


</div>

    <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: '3.5vh'}}>

    <p style={{ display: "inline-block", marginRight: "15px", marginTop: '12px' }}>End Date:</p>
    <FluentProvider theme={webLightTheme}>
    <Field validationMessage={endDateError && defaultDatePickerErrorStrings[endDateError]} >
      
        <DatePicker
        minDate={today}
        //maxDate={maxDate}
        value={endDate}
        formatDate={onFormatDate}
        placeholder="Select a date..."
        allowTextInput
        onValidationResult={(data) => setEndError(data.error)}
        //className={styles.control}
        style = {{width: '25vw'
      }}
        underlined = {true}
        isMonthPickerVisible = {false}
        onSelectDate={handleEndDateChange}

      />
    </Field>
    </FluentProvider>
    
      <p style={{ display: "inline-block", marginTop: '12px', marginRight: "15px", marginLeft: "5vw"}}>End Time:</p>
      
      <Dropdown
        aria-labelledby={dropdownId}
        placeholder="Select an end time"
        style = {{width: '20vw', maxHeight: '10vh'}}
        onOptionSelect={(ev, option) => handleEndTimeChange(option?.optionValue || "")}
      >
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
<div>

</div>
    </div>
    
  );
};

export default CreateCall;