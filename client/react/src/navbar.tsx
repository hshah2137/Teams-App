import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, NavLink} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CCDLogo from './assets/CCDlogo.png'

const ColorSchemesExample = () => {
    
    //Defines a variable which stores the selected page, default is home page
    const [selected, setSelected] = useState('home')
    // Used to determine the current location
    const location = useLocation();
    // Whenever the location changes, the 'selected' variable is updated
    useEffect(()=>{
        
        if (location.pathname === '') {
            setSelected('home') 
        }
        if (location.pathname === '/') {
            setSelected('home')
        }
        if (location.pathname === '/input') {
            setSelected('join')
        }
        if (location.pathname === '/joinCall') {
            setSelected('join')
        }
        if (location.pathname === '/validateUser') {
            setSelected('create')
        }
        if (location.pathname === '/createCall') 
        {
            setSelected('create')
        }
        
    }, [location])

    // Used to navigate to other pages
    const navigate = useNavigate();


    const handleNavLinkClick = (page: string) => {
        setSelected(page);
    };

    const goToJoin = () =>{
        navigate('/input')
    }

    const goToCreate = () =>{
        navigate('/validateUser')
    }

    const goToHome = () =>{
        navigate('/')
    }

    // Used to define the fontweight in the navbar
    const text_style = {
        fontWeight: '550' 
    };
    // used to create a purple line under the selected page, consistent with Teams
    const selectedLinkStyle = {
        borderBottom: '2px solid #7B83EB',
    };

    return (
        <>
            
            <Navbar bg="dark" data-bs-theme="dark">
                <Container>
                    <Navbar.Brand onClick = {() => {
                                        handleNavLinkClick('home')
                                        goToHome()}}>
                        <img src={CCDLogo} width="45" height ="45" />
                    </Navbar.Brand>
                    <Nav className="me-auto">
                        <NavLink
                            
                            //Conditional rendering of the style
                            style={{ ...text_style, ...(selected === 'home' ? selectedLinkStyle : {}) }}
                            onClick={() => {handleNavLinkClick('home')
                                            goToHome()}}>
                            Home
                        </NavLink>
                        <NavLink
                            
                            
                            style={{ ...text_style, ...(selected === 'join' ? selectedLinkStyle : {}) }}
                            onClick={() => {handleNavLinkClick('join')
                                            goToJoin()}}>
                            Join Meeting
                        </NavLink>
                        <NavLink
                            
                            style={{ ...text_style, ...(selected === 'create' ? selectedLinkStyle : {}) }}
                            onClick={() => {handleNavLinkClick('create')
                                            goToCreate()}}>
                            Create Meeting
                        </NavLink>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default ColorSchemesExample;
