import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function SaveLoan() {
  const [loan, setLoan] = useState({
    loan_origin_amount: "",
    interest_rate: "",
    user_id: "", // Updated to user_id for consistency
    created_at: new Date().toISOString().substring(0, 10),
  });

  const navigate = useNavigate();

  const submitLoan = (e) => {
    e.preventDefault();

    // Ensure `user_id` is part of the URL dynamically
    const url = `http://localhost:8081/loans/${loan.user_id}`;
    
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        loan_origin_amount: loan.loan_origin_amount,
        interest_rate: loan.interest_rate,
        created_at: loan.created_at,
      })
    })
      .then(res => {
        console.log("Response:", res);
        if (res.status === 201) {
          return res.json();
        } else {
          throw new Error("Submission failed");
        }
      })
      .then(res => {
        if (res) {
          navigate('/Loan');
        }
      })
      .catch(error => {
        console.error("Error submitting loan:", error);
        alert('Submission failed');
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
      <h1 style={styles.header}>Create New Loan</h1>
      
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

        <Form.Group className="mb-3" controlId="formUserId">
          <Form.Label>User ID</Form.Label>
          <Form.Control 
            type="text"
            name="user_id" 
            value={loan.user_id} 
            onChange={changeValue} 
            placeholder="Enter User ID" 
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
    backgroundColor: ' #05654d', 
    borderColor: ' #05654d',
    fontSize: '16px',
  }
};

export default SaveLoan;
