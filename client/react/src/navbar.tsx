import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Container, Nav, NavLink} from 'react-bootstrap';
import { SetStateAction, useState, useEffect } from 'react';
import { FluentProvider } from '@fluentui/react-components';
import { useLocation } from 'react-router-dom';

const ColorSchemesExample = () => {

    //const [selected, setSelected] = useState('join'); // Default selected link

    const [selected, setSelected] = useState('home')
    
    const location = useLocation();
  
    useEffect(()=>{
        //console.log(location)
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



    const handleNavLinkClick = (page: string) => {
        setSelected(page);
    };

    const text_style = {
        fontWeight: '550' 
    };

    const selectedLinkStyle = {
        borderBottom: '2px solid #7B83EB',
    };

    return (
        <>
            
                <Navbar bg="dark" data-bs-theme="dark">
                    <Container>
                        {/*<Navbar.Brand href="#home">Navbar</Navbar.Brand>*/}
                        <Nav className="me-auto">
                            <NavLink
                                href="/"
                                className={`nav-link ${selected === 'home' ? 'selected' : ''}`}
                                style={{ ...text_style, ...(selected === 'home' ? selectedLinkStyle : {}) }}
                                onClick={() => handleNavLinkClick('home')}
                            >
                                Home
                            </NavLink>
                            <NavLink
                                href="/input"
                                className={`nav-link ${selected === 'join' ? 'selected' : ''}`}
                                style={{ ...text_style, ...(selected === 'join' ? selectedLinkStyle : {}) }}
                                onClick={() => handleNavLinkClick('join')}
                            >
                                Join Meeting
                            </NavLink>
                            <NavLink
                                href="/validateUser"
                                className={`nav-link ${selected === 'create' ? 'selected' : ''}`}
                                style={{ ...text_style, ...(selected === 'create' ? selectedLinkStyle : {}) }}
                                onClick={() => handleNavLinkClick('create')}
                            >
                                Create Meeting
                            </NavLink>
                        </Nav>
                    </Container>
                </Navbar>
        </>
    );
}

export default ColorSchemesExample;
