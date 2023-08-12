import {useState, ChangeEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import {Textarea, FluentProvider, teamsLightTheme, Input, useId} from "@fluentui/react-components";
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
import VideoChat24Regular from '@fluentui/react-icons/lib/esm/components/Video24Regular';
import Guest24Regular from '@fluentui/react-icons/lib/esm/components/Guest24Regular';

const InputPage = () => {
    const [link, setLink] = useState('');
    const [displayName, setDisplay] = useState('');

    const navigate = useNavigate();

    const [errorMessage, setError] = useState('');

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value != null) {
            setLink(event.target.value);   
        }
        
        
    };

    

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

    const inputId = useId("input-with-placeholder");

   

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [responseBody, setResponseBody] = useState<String | null >();
    const [modalTitle, setTitle] = useState<String | null >();


    const modalHandle = (event: React.MouseEvent<HTMLButtonElement>) =>{
        setIsDialogOpen(false);
    }

    const clickHandle = (event: React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault()
        if (link === ''){
            setResponseBody('You must enter a valid teams link to join a meeting')
            setTitle('Please fill in all the fields')
            setIsDialogOpen(true)
            console.log('cannot proceed')
        }

        else if (!link.includes('https://teams.microsoft.com/')) {
            console.log(link)
            setResponseBody(link + ' is not a valid teams link. ')
            setTitle('Invalid Teams link')
            setIsDialogOpen(true)
            console.log('cannot proceed')
        }

        else if (displayName === '') {
            setResponseBody('You must enter a guest name to join a meeting')
            setTitle('Please fill in all the fields')
            setIsDialogOpen(true)
            console.log('cannot proceed')
        }
        else if (displayName !== "" && link !== "" && displayName !== null){
            console.log(link.includes('https://teams.microsoft.com/'))
            console.log('good')
            console.log(link)
            setError("")
            navigate('/joinCall', {state: {link, displayName}})
        }
    }
 //https://teams.microsoft.com/l/meetup-join/19%3ameeting_YWNlZWEzMTMtMDM4Yy00ZjFjLThiOWUtOTQ4ZWYyMGRjODZi%40thread.v2/0?context=%7b%22Tid%22%3a%221faf88fe-a998-4c5b-93c9-210a11d9a5c2%22%2c%22Oid%22%3a%229a222fae-66e1-4dbb-845c-d10f672ec8ac%22%7d
    return(
        <FluentProvider theme = {teamsLightTheme} style = {{backgroundColor: '#F5F5F5'}}>
        <div style = {{marginTop: "3vh"}}>
            <h4 style = {{display: 'flex',  marginLeft: '5vw', textAlign: 'left'}}>Enter your name and a teams link to join a meeting</h4>
            <form>
            <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: "4vh"}}>

                    {/*<p style={{ display: "inline-block", marginRight: "10px", marginTop: '1.5vh'}}>Guest Name: </p>*/}
                    <Guest24Regular style={{ display: "inline-block", marginRight: "10px"}}/>

                    <Input style={{width:'75vw'}} placeholder="Enter the name you wish to join as" id={inputId} 
                    onChange={(ev, data) =>setDisplay(data.value)}/>

                    </div>
                
                <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: "5vh"}}>
                {/*<p style={{ display: "inline-block", marginRight: "20px" }}>Teams Link: </p>*/}
                <VideoChat24Regular style={{ display: "inline-block", marginRight: "10px"}}/>
                <Textarea value={link} onChange={handleInputChange} style = {{ width: "75vw", resize: 'none'}} rows={5}
                placeholder='Enter your Teams meeting Link' />
                
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

            </form>

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
