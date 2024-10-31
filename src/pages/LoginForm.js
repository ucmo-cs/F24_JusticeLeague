import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
  const [account, setAccount] = useState({ userId: '', password: '', role: 'Customer' });
  const [status, setStatus] = useState({ message: '', error: false });

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const accountDto = { userId: account.userId, password: account.password };
    

    try {
      const response = await fetch('http://localhost:8081/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(accountDto),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ message: data.message, error: false });

        if (data.message === "Login Successful!") {
          if (data.userType === 0) {
            // Go to customer page (e.g., navigate('/customer'))
            navigate('/customer');
          } else if (data.userType === 1) {
            // Go to admin portal (e.g., navigate('/admin'))
            navigate('/loan');
          }
        }
      } else if (response.status === 401) {
        setStatus({ message: 'Invalid user ID or password', error: true });
      } else {
        setStatus({ message: 'Something went wrong1', error: true });
      }
    } catch (error) {
      console.error('Fetch error:', error);
      setStatus({ message: 'Something went wrong2', error: true });
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prevAccount) => ({ ...prevAccount, [name]: value }));
  };

  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2 style={{ color: "#006400", paddingTop: "20px", paddingBottom: "20px" }} className="text-center">
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
              <Button style={{ backgroundColor: '#006400', width: "100%" }} variant="success" type="submit">
                Sign In
              </Button>
            </div>
            
            {status.message && (
              <div style={{ color: status.error ? 'red' : 'green', marginTop: '10px', textAlign: 'center' }}>
                {status.message}
              </div>
            )}
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginForm;
