import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';

function Header() {
    return (
      <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand>
        <img src="MyImages/CommerceBankLogo.png" alt="logo" style={{ width: '300px', height: 'auto' }} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/loan">Loan</Nav.Link>
            <Nav.Link href="/customer">Customer</Nav.Link>
            <Nav.Link href="/info">Account</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
      );
    }
    
    export default Header;
