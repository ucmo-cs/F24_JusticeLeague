import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function LoginForm() {
  //accoutn state
  const [account, setAccount] = useState({ userId: '', password: '', role: 'Customer' });

  const navigate = useNavigate();

  //function to handle the login
  const handleLogin = async (e) => {
    e.preventDefault();

    //create accountDTO using the state values to send to backend
    const accountDto = { userId: account.userId, password: account.password };
    
    //send the userID and password to the backend
    try {
      const response = await fetch('http://localhost:8081/accounts/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accountDto),
      });
      //putting response into JSON format and creating a variable for it
      const data = await response.json();

      if (response.ok) {
        console.log("Response Data:", data);

        //checking to see if the data matches in the backend
        if (data.message === "Login Successful!") {
          //navigating based on user type
          if (data.userType === 0) {
            navigate(`/customer/${data.userId}`); 
          } else if (data.userType === 1) {
            navigate('/loan');
          }
        }
      //error handling
      } else if (response.status === 401) {
        console.log('Invalid user ID or password');
      }
     //if the information doesnt match whats in the backend, notify user 
    } catch (error) {
      alert('Incorrect User ID or Password.');
      console.error('Fetch error:', error);
    }
  };

  //handle chnages when user is typing
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prevAccount) => ({ ...prevAccount, [name]: value }));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2 style={{ color: "#05654d", paddingTop: "20px", paddingBottom: "20px" }} className="text-center">
            Sign In
          </h2>
          <Form onSubmit={handleLogin}>

            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Label>
                <p style={{ color: "gray" }}>Username</p>
              </Form.Label>
              <Form.Control
                name="userId"
                type="text"
                placeholder="Enter user ID"
                onChange={handleChange}
                value={account.userId}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Label>
                <p style={{ color: "gray" }}>Password</p>
              </Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Enter password"
                onChange={handleChange}
                value={account.password}
                required
              />
            </Form.Group>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Button style={{ backgroundColor: '#05654d', width: "100%" }} variant="success" type="submit">
                Sign In
              </Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
