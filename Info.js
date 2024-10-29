import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';



export default function Customer() {
  return (

    
    <Container>
      <Row className="align-items-center">
        <Col xs="auto">
          <Button variant="secondary" style={{backgroundColor: "darkgreen"}}>Back</Button>
        </Col>
        <Col className="text-center">
          <Image src="MyImages/CommerceBankLogo.png" alt=""/>

        </Col>
        <Col xs="auto">
          <Button variant="secondary" style={{backgroundColor: "darkgreen"}}>Logout</Button>
        </Col>
      </Row>
      <Row className="align-items-center mt-5">
        <Col></Col>
        <Col></Col>
        <Col>ACCOUNT INFORMATION</Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Form.Group controlId="firstName">
            <Form.Label>First Name:</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name:</Form.Label>
            <Form.Control type="text" />
          </Form.Group>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Form.Group controlId="emailaddress">
            <Form.Label>Email Address:</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Form.Group controlId="phonenumber">
            <Form.Label>Phone Number:</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Form.Group controlId="bankroutingnumber">
            <Form.Label>Bank Routing Number:</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Form.Group controlId="bankaccountnumber">
            <Form.Label>Bank Account Number:</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          <Form.Group controlId="automaticpaymentamount">
            <Form.Label>Automatic Payment Amount:</Form.Label>
            <Form.Control type="text"  />
          </Form.Group>
        </Col>
        <Col></Col>
      </Row>
    </Container>

    

  );
  
  
}


function BackButton(){

}


//export default Customer;