import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';


function LoginForm() {
    
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState(false);
    
    
  const handleLogin =async(e)=>{
    e.preventDefault();
    
    const accountDto = {userId, password};

    try{
      const response = await fetch('http://localhost:8081/user',{
        method:'POST',
        headers: {
          'Content-Type':'application/json',
        },
        body: JSON.stringify(accountDto)
      });

      if(response.ok){
        const data = await response.text();
        setMessage(data);
        setError(false);
      }else if (response.status === 401){
        setMessage('Invalid user Id or Password');
        setError(true);
      }else{
        setMessage('Something went wrong')
        setError(true);
      }
    }catch(error){
      setMessage('Something went wrong');
      setError(true);
    }
       
    }; 

    

    return (
      <div>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="formUserId">
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter user ID"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
