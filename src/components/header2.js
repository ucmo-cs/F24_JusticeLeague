import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import logo from '../images/CommerceBankLogo.png';


function Header2(props) {
    return (
      <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand>
          <img src={logo} alt="logo" style={{ width: '300px', height: 'auto' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/customer">Customer</Nav.Link>
            <Nav.Link href="/info">Info</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
      );
    }
    
    
    export default Header2;
