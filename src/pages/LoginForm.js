import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import '../App.css';

function LoginForm() {
    

    const[account, setAccount] = useState({
        userId:"",
        password:"",
        role: ""
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
      <Container>
      <Row className="justify-content-md-center">
        <Col md={4}>
          <h2 style={{color: "#006400", paddingTop: "20px", paddingBottom: "20px"}} className="text-center">Sign In</h2>
        <Form onSubmit={submitLogin}>
        <Form.Group className="mb-3" controlId="formGroupRole">
        <Form.Label style={{display: 'flex', justifyContent: 'center'}}><p style={{color: "gray"}}>Account Type</p></Form.Label>
                            <Form.Select
                                name="role"
                                onChange={changeValue}
                                value={account.role}
                                required
                            >
                                <option value="Customer">Customer</option>
                                <option value="Admin">Admin</option>
                            </Form.Select>
                        </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupEmail">
                <Form.Label><p style={{color: "gray"}}>Username</p></Form.Label>
                <Form.Control 
                    name="userId"
                    type="text"  
                
                    onChange = {changeValue} 
                    required 
                />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formGroupPassword">
                <Form.Label><p style={{color: "gray"}}>Password</p></Form.Label>
                <Form.Control 
                    name="password"
                    type="password"
            
                    onChange = {changeValue} 
                    required 
                />
            </Form.Group>

            <div style={{width: '100%', padding: "0.75em 1em", display: "flex", alignItems: "center", justifyContent: "center"}}>
            <Button style={{ backgroundColor: '#006400' ,width: "100%", padding: "0.75em 1em" }} variant="success" type="submit">
            Sign In
            </Button>
            </div>
            {/* {message && <div className="text-danger mt-2">{message}</div>} */}
        </Form>
        </Col>
      </Row>
    </Container>
    );
}

export default LoginForm;
