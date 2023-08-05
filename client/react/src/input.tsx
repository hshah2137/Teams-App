import {useEffect, useRef, useState, ChangeEvent} from 'react';
import { useNavigate } from 'react-router-dom';
import { Field, Textarea, FluentProvider, teamsLightTheme, Input, useId} from "@fluentui/react-components";


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

    const clickHandle = (event: React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault()
        if (link === ''){
            setError('Please enter a teams link')
            console.log('cannot proceed')

        }

        else if  (subject === '') {
            setError('Please enter  your name')
            console.log('cannot proceed')
        }
        else{
            console.log('good')
            console.log(link)
            setError("")
            navigate('/joinCall', {state: {link, subject}})
        }
    }

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

      const [subject, setSubject] = useState<String | null >();
    
 //https://teams.microsoft.com/l/meetup-join/19%3ameeting_YWNlZWEzMTMtMDM4Yy00ZjFjLThiOWUtOTQ4ZWYyMGRjODZi%40thread.v2/0?context=%7b%22Tid%22%3a%221faf88fe-a998-4c5b-93c9-210a11d9a5c2%22%2c%22Oid%22%3a%229a222fae-66e1-4dbb-845c-d10f672ec8ac%22%7d
    return(
        <FluentProvider theme = {teamsLightTheme}>
        <div>
            <h1 style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: "2vh"}}>Please enter the teams meeting link</h1>
            <form>
            <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center'}}>

                    <p style={{ display: "inline-block", marginRight: "10px" }}>Guest Name: </p>

                    <Input style={{width:'40vw'}} placeholder="Enter the name you wish to join as" id={inputId} 
                    onChange={(ev, data) =>setSubject(data.value)}/>

                    </div>
                
                <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: "5vh"}}>
                <p style={{ display: "inline-block", marginRight: "10px" }}>Teams Link: </p>
                <Textarea value={link} onChange={handleInputChange} style = {{marginLeft:"2.5vw", width: "75vw", resize: 'none'}} rows={5}
                placeholder='Enter your Teams meeting Link' />
                
                </div>
                <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: "2.5vh"}}>
                <button 
                style = {buttonStyle} 
                onClick={(event) => clickHandle(event)}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                    Confirm
                </button>
                
                </div>

            </form>
            <div style = {{marginTop: '2vh', display: 'flex',justifyContent:'center', alignItems: 'center' }}>
            <text style = {{color: 'red'}}>{errorMessage}</text>
            </div>
      </div>   
      </FluentProvider>
    );

};

export default InputPage;
