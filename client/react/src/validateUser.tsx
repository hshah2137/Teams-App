import * as React from "react";
import {
  addMonths,
  addYears,
  DatePicker,
  defaultDatePickerErrorStrings,
} from "@fluentui/react-datepicker-compat";
import { Field, makeStyles, Dropdown,
  Option,
  shorthands,
  useId, teamsLightTheme, FluentProvider, Input, Label} from "@fluentui/react-components";
import type { DatePickerValidationResultData } from "@fluentui/react-datepicker-compat";
import type { DropdownProps } from "@fluentui/react-components";
import { Person24Regular, Mail24Regular} from '@fluentui/react-icons';
import { useNavigate } from "react-router-dom";
import ColorSchemesExample from "./navbar";

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


const CheckUser = () => {

    const navigate = useNavigate()

    const inputId = useId("input-with-placeholder");
    const [email, setEmail] = React.useState("");
    const [name, setName] = React.useState("");
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

  const clickHandle = (event: React.MouseEvent<HTMLButtonElement>) =>{
    event.preventDefault()
    if (email !== "" && name !== ""){
        getUser(email, name)
    }
    else{
        setTitle("Please fill in all the fields")
          setResponseBody("You must fill in all the fields to continue"); // Save the response body to state
          setIsDialogOpen(true);
          console.log("no users found")
    }
    
    
  }

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [responseBody, setResponseBody] = React.useState<String | null >();
  const [modalTitle, setTitle] = React.useState<String | null >();

  const modalHandle = (event: React.MouseEvent<HTMLButtonElement>) =>{
    setIsDialogOpen(false);
  }

  const getUser = async (email: String, name: String)=>{
    try{
        const response = await axios.post('http://localhost:7071/api/ValidateUserFunction',
        {
          email: email,
          name: name
        },  {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        })
        console.log(response.data)
        if (response.data.message === "Details match") {
            console.log("success")
            navigate('/createCall', {state: {name, email}})
        }

        else{
            setTitle("Something went Wrong")
          setResponseBody("We are sorry, there are no users with these details. Please double check your spelling"); // Save the response body to state
          setIsDialogOpen(true);
          console.log("no users found")
        }
    }
    catch(error) {
      setTitle("Something went Wrong")
      setResponseBody("We are sorry, there was an error checking your details. Please try again later."); // Save the response body to state
      setIsDialogOpen(true);
      console.log(error)
    }
  }

  return(
    
  <div>
    {/*<h1 style = {{alignItems: 'center'}}>Create a meeting: Enter your Details</h1>*/}
      <FluentProvider theme={teamsLightTheme} style ={{marginBottom: '4vh', backgroundColor: '#F5F5F5' }}>
        
      <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: '4vh'}}>
      <Person24Regular style={{ display: "inline-block", marginRight: "10px" }} />

        <Input style={{width:'70vw'}} placeholder="Please enter your name" id={inputId} 
        onChange={(ev, data) =>setName(data.value)}/>

    </div>

    <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: '4vh'}}>

        
    <Mail24Regular style={{ display: "inline-block", marginRight: "10px" }} />

        <Input style={{width:'70vw'}} placeholder="Please enter your outlook email" id={inputId} 
        onChange={(ev, data) =>setEmail(data.value)}/>

    </div>
    <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: '4vh', marginBottom: '4vh'}}>

<button 
          style = {buttonStyle} 
          onClick={(event) => clickHandle(event)}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}>
          Next
      </button>
      
      </div>

      <Dialog open={isDialogOpen}>

        <DialogSurface>
          <DialogBody>
            <DialogTitle>{modalTitle}</DialogTitle>
            <DialogContent>
              {responseBody}
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
    
    </div>
  );
};

export default CheckUser;