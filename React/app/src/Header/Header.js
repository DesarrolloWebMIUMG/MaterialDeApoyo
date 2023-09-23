import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

function Header(){
    return(
        <Navbar className='navbar-light'>
            <Container>
             <Navbar.Brand > Tienda en linea </Navbar.Brand>
            </Container>
        </Navbar>
    );
}

export default Header;