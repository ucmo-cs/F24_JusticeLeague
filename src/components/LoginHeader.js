import React from 'react';
import { Navbar} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';



function Header(props) {
    return (
      <Navbar expand="lg" className="custom-navbar">
      <Container>
      <Navbar.Brand>
        <img src="MyImages/CommerceBankLogo.png" alt="logo" style={{ width: '300px', height: 'auto' }} />
        </Navbar.Brand>
      </Container>
    </Navbar>
    
      );
    }
    
    
    export default Header;