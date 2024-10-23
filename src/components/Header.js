import React from 'react';
import {Card, Nav, Navbar} from 'react-bootstrap';
//import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';




import NavDropdown from 'react-bootstrap/NavDropdown';


function Header(props) {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">Commerce Bank</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/loan">Loan</Nav.Link>
                <Nav.Link href="/customer">Customer</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      );
    }
    
    
    export default Header;