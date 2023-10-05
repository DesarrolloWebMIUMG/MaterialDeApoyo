import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Navbar from 'react-bootstrap/Navbar';
import { useAuth } from '../AuthContext/AuthContext';
import { Link } from 'react-router-dom';

export default function Header() {
    const { state, usuario } = useAuth();
    
    return (
        <Navbar className="bg-body-tertiary">
        <Container>
            <Navbar.Brand >Desarrollo Web</Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse className="justify-content-end">
            <Navbar.Text>
                {state.isAuthenticated?(
                    <Button href="/" variant="danger">Logout</Button>
                ):""}  
                
            </Navbar.Text>
            </Navbar.Collapse>
        </Container>
        </Navbar>
      );
    }