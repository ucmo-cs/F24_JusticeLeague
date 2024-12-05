import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { useNavigate,useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';




function Customer() {
    const navigate = useNavigate();

    //user id from URL
    const { userId } = useParams();
    const [accountData, setAccountData] = useState({
      first_name: '',
      last_name: '',
      phone_id: '',
      email_id: '',
      user_id: '',
      routing_number: '',
      bank_number: ''
  });
  
//getting the account information to populate fields
  useEffect(() => {
    fetch(`http://localhost:8081/accounts/${userId}`)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch account data');
        return response.json();
      })
      .then(data => setAccountData(data))
  }, [userId]);

  // Update local state when input fields change
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setAccountData(prevData => ({ ...prevData, [name]: value }));
  };

  //function to update account information when submitted
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8081/accounts/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(accountData)
    })
      .then(response => response.json())
      .then(() => alert('Account information updated successfully!'))
      .catch(error => console.error('Error updating account information:', error));
  };


  return (
      <Container>
        <Row className="my-3 align-items-center">
          <Col className="text-start">
            <Button style={styles.buttons} onClick={() => navigate('/')}>Logout</Button>
          </Col>
          <Col className="text-center">
            <h1 style={{ color: '#05654d' }}>Account Information</h1>
          </Col>
          <Col className="text-end">
            <Button style={styles.buttons} onClick={() => navigate(`/customer/${userId}`)}>Back</Button>
          </Col>
        </Row>
        <div style={styles.container}>
          <Form style={styles.form} onSubmit={handleSubmit}>
            <Form.Group controlId="FirstNameID">
              <Form.Label>First Name:</Form.Label>
              <Form.Control 
                type="text"
                name="firstName"
                value={accountData.firstName}
                onChange={handleInputChange}
                
              />
            </Form.Group>
            <Form.Group controlId="LastNameID">
              <Form.Label>Last Name:</Form.Label>
              <Form.Control 
                type="text"
                name="lastName"
                value={accountData.lastName}
                onChange={handleInputChange}
                
              />
            </Form.Group>
            <Form.Group controlId="PhoneNumberID">
              <Form.Label>Phone Number:</Form.Label>
              <Form.Control 
                type="text"
                name="phoneNumber"
                value={accountData.phoneNumber}
                onChange={handleInputChange}
                
              />
            </Form.Group>
            <Form.Group controlId="EmailID">
              <Form.Label>Email Address:</Form.Label>
              <Form.Control 
                type="text"
                name="email"
                value={accountData.email}
                onChange={handleInputChange}
                
              />
            </Form.Group>
            <Form.Group controlId="UsernameID">
              <Form.Label >User Name:</Form.Label>
              <Form.Control 
                type="text"
                name="userName"
                value={accountData.userName}
                onChange={handleInputChange}
                readonly = "true"
              />
            </Form.Group>
            <Form.Group controlId="UsernameID">
              <Form.Label >Routing Number: </Form.Label>
              <Form.Control 
                type="text"
                name="routingNumber"
                value={accountData.routingNumber}
                onChange={handleInputChange}
               
              />

            </Form.Group>
            <Form.Group controlId="UsernameID">
              <Form.Label >Account Number: </Form.Label>
              <Form.Control 
                type="text"
                name="bankNumber"
                value={accountData.bankNumber}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Button variant="success" type="submit" style={styles.Submitbutton} onClick={handleSubmit}>
              Update Account Information
            </Button>
          </Form>
        </div>
      </Container>
    );
    
}

const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      fontFamily: 'Arial, sans-serif',
      color: '#000000',
      marginTop: '20px',
    },
    header: {
      fontSize: '24px',
      alignItems: 'center',
      color: '', 
      marginBottom: '20px',
    },
    form: {
      width: '50%',
      alignItems: 'center',
      maxWidth: '500px',
    },
    Submitbutton: {
      width: '100%',
      alignItems: 'center',
      backgroundColor: '#05654d', 
      borderColor: '#05654d',
      fontSize: '16px'
    },
    buttons: {
      backgroundColor: '#05654d', 
      borderColor: '#05654d',
      fontSize: '16px',
    },
  };



export default Customer;