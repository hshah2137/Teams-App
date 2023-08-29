import {useState, ChangeEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import {Textarea, FluentProvider, teamsLightTheme, Input, useId, Divider, Dialog,
        DialogTrigger, DialogSurface, DialogTitle, DialogBody, DialogActions, DialogContent, Button} from "@fluentui/react-components";
import VideoChat24Regular from '@fluentui/react-icons/lib/esm/components/Video24Regular';
import Guest24Regular from '@fluentui/react-icons/lib/esm/components/Guest24Regular';

const InputPage = () => {

    const [link, setLink] = useState('');
    const [displayName, setDisplay] = useState('');
    const navigate = useNavigate();

    //Function for setting the value for the link
    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value != null) {
            setLink(event.target.value);   
        }  
    };
    //Variables and functions relating to the Join button appearance, it becomes visibly dimmer when the mouse is on it
    const [opacity, setOpacity] = useState(1);

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
    //Generates ID for gust name input area
    const inputId = useId("input-with-placeholder");
    
    //Functions and variables relating to an error modal
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [responseBody, setResponseBody] = useState<String | null >();
    const [modalTitle, setTitle] = useState<String | null >();


    const modalHandle = (event: React.MouseEvent<HTMLButtonElement>) =>{
        setIsDialogOpen(false);
    }

    //Function that is called when the 'join' button is clicked
    // It checks whether the input fields are null, and whether a valid link is provided
    // If a name and valid link are provided, it will proceed to /joinCall
    const clickHandle = (event: React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault()
        if (link === ''){
            setResponseBody('You must enter a valid teams link to join a meeting')
            setTitle('Please fill in all the fields')
            setIsDialogOpen(true)
            
        }

        else if (!link.includes('https://teams.microsoft.com/')) {
            
            setResponseBody(link + ' is not a valid teams link. ')
            setTitle('Invalid Teams link')
            setIsDialogOpen(true)
            
        }

        else if (displayName === '') {
            setResponseBody('You must enter a guest name to join a meeting')
            setTitle('Please fill in all the fields')
            setIsDialogOpen(true)
            
        }
        else if (displayName !== "" && link !== "" && displayName !== null){       
            navigate('/joinCall', {state: {link, displayName}})
        }
    }
 
    return(
        <FluentProvider theme = {teamsLightTheme} style = {{backgroundColor: '#F5F5F5'}}>
          <div style = {{marginTop: "3vh"}}>

            <h4 style = {{display: 'flex',  marginLeft: '5vw', textAlign: 'left'}}>Enter your name and a teams link to join a meeting</h4>

            <Divider style = {{paddingTop: '2vh', paddingRight: '2vw', paddingLeft: '2vw' }} />
              
              <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: "4vh"}}>
                <Guest24Regular style={{ display: "inline-block", marginRight: "10px"}}/>

                <Input style={{width:'75vw'}} placeholder="Enter the name you wish to join as" id={inputId} 
                    onChange={(ev, data) =>setDisplay(data.value)}/>

              </div>
                
              <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: "5vh"}}>
              
              <VideoChat24Regular style={{ display: "inline-block", marginRight: "10px"}}/>

              <Textarea value={link} onChange={handleInputChange} style = {{ width: "75vw", resize: 'none'}} rows={5}
                placeholder='Enter your Teams meeting link' />
                
              </div>

              <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: "2.5vh"}}>
           
                <button 
                  style = {buttonStyle} 
                  onClick={(event) => clickHandle(event)}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}>
                    Join
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
            
        </div>   
      </FluentProvider>
    );

};

export default InputPage;
