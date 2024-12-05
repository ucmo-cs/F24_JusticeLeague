import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const styles = {
    img: {
      cursor: 'pointer',
      width: '300px',
      hieght: 'auto'
    }
  }
    return (
      <Navbar expand="lg" className="custom-navbar">
      <Container>
        <Navbar.Brand>
        <img src="MyImages/CommerceBankLogo.png" alt="logo" style={styles.img} 
        onClick={()=>navigate('/')}/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
          
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    
      );
    }
    
    export default Header;
