import {useEffect, useRef, useState, ChangeEvent} from 'react';
import { useNavigate } from 'react-router-dom';



const InputPage = () => {
    const [link, setLink] = useState('');

    const navigate = useNavigate();

    const handleInputChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
        if (event.target.value != null) {
            setLink(event.target.value);   
        }
        
        
    };

    const clickHandle = (event: React.MouseEvent<HTMLButtonElement>) =>{
        event.preventDefault()
        if (link === ''){
            console.log('cannot proceed')

        }
        else{
            console.log('good')
            console.log(link)
            navigate('/joinCall', {state: {link}})
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
    
 //https://teams.microsoft.com/l/meetup-join/19%3ameeting_YWNlZWEzMTMtMDM4Yy00ZjFjLThiOWUtOTQ4ZWYyMGRjODZi%40thread.v2/0?context=%7b%22Tid%22%3a%221faf88fe-a998-4c5b-93c9-210a11d9a5c2%22%2c%22Oid%22%3a%229a222fae-66e1-4dbb-845c-d10f672ec8ac%22%7d
    return(
        <div>
            <h1 style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: "2vh"}}>Please enter the teams meeting link</h1>
            <form>
                
                <div style = {{display: 'flex',justifyContent:'center', alignItems: 'center', marginTop: "10vh"}}>
                
                <textarea value={link} onChange={handleInputChange} style = {{marginLeft:"2.5vw", width: "75vw", resize: 'none'}} rows={5} />
                
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
      </div>   
    );

};

export default InputPage;
