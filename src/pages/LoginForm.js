import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';

function LoginForm() {
    

    const[account, setAccount] = useState({
        userId:"",
        password:"",
          });  
     
      const navigate = useNavigate();
    
    
      const submitLogin =(e)=>{
        e.preventDefault();
    
    
        fetch("http://localhost:8081/user", {
            method:"POST",
            headers:{
              "Content-Type" : "application/json"
            },
            body: JSON.stringify(account)
          })
          .then(res=>{
              console.log(1,res);
              if(res.status === 201){
                return res.json();
              }else{
                return null;
              }
            })
          .then(res=>{
            console.log(res)
            if(res!==null){
                navigate('/Loan');
            }else{
              alert('fails');
            }
         
          });
       
    }
    
    const changeValue=(e)=>{
        console.log(e);
        setAccount({
         ...account, [e.target.name]:e.target.value  
        });
        console.log(e.target.name + " name "  );
        console.log(e.target.value + " value " );
      }
    

    return (
        <Form onSubmit={submitLogin}>
            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                    name="userId"
                    type="text" 
                    placeholder="Enter user id" 
                
                    onChange = {changeValue} 
                    required 
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    name="password"
                    type="password" 
                    placeholder="Password" 
            
                    onChange = {changeValue} 
                    required 
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Login
            </Button>
            {/* {message && <div className="text-danger mt-2">{message}</div>} */}
        </Form>
    );
}

export default LoginForm;
