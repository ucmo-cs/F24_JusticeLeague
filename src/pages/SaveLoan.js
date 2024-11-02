// SaveLoan.js
import React, { useEffect, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SaveLoan() {
  const [loan, setLoan] = useState({
    loan_origin_amount: "",
    interest_rate: "",
    account_id: "",
    created_at: new Date().toISOString().substring(0, 10), // Automatically set current date
  });

  const navigate = useNavigate();

  const submitLoan = (e) => {
    e.preventDefault();

    fetch("http://localhost:8081/loan", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loan)
    })
      .then(res => {
        console.log("Response:", res);
        if (res.status === 201) {
          return res.json();
        } else {
          return null;
        }
      })
      .then(res => {
        if (res !== null) {
          navigate('/Loan');
        } else {
          alert('Submission failed');
        }
      });
  }

  const changeValue = (e) => {
    setLoan({
      ...loan,
      [e.target.name]: e.target.value
    });
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Create New Loan (Does Not Currently Work)</h1>
      
      <Form onSubmit={submitLoan} style={styles.form}>
        <Form.Group className="mb-3" controlId="formLoanOriginAmount">
          <Form.Label>Loan Amount</Form.Label>
          <Form.Control 
            type="number"
            name="loan_origin_amount" 
            value={loan.loan_origin_amount} 
            onChange={changeValue}  
            placeholder="Enter loan amount" 
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formInterestRate">
          <Form.Label>Interest Rate (%)</Form.Label>
          <Form.Control 
            type="number"
            name="interest_rate" 
            value={loan.interest_rate} 
            onChange={changeValue} 
            placeholder="Enter interest rate" 
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAccountId">
          <Form.Label>Account ID (Until we connect this to account/user)</Form.Label>
          <Form.Control 
            type="number"
            name="account_id" 
            value={loan.account_id} 
            onChange={changeValue} 
            placeholder="Enter associated account ID" 
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCreatedAt">
          <Form.Label>Creation Date</Form.Label>
          <Form.Control 
            type="text"
            name="created_at"
            value={loan.created_at} 
            onChange={changeValue} 
            disabled
            readOnly 
          />
        </Form.Group>

        <Button variant="success" type="submit" style={styles.submitButton}>
          Submit
        </Button>
      </Form>
    </div>
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
    color: '#000000', 
    marginBottom: '20px',
  },
  form: {
    width: '80%',
    maxWidth: '500px',
  },
  submitButton: {
    width: '100%',
    backgroundColor: '#006400', 
    borderColor: '#006400',
    fontSize: '16px',
  }
};

export default SaveLoan;
