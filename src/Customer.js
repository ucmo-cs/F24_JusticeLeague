import React, { useEffect, useState } from 'react';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function Customer() {
  const navigate = useNavigate();
  const { userId } = useParams();
  console.log("Customer userId:", userId);

  // State to store loan data
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch loans based on userId
  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await fetch(`http://localhost:8081/loans/user/${userId}`);
        if (!response.ok) {
          console.error(`Error fetching loans: ${response.status} ${response.statusText}`);
          throw new Error(`Error fetching loans: ${response.statusText}`);
        }
        const data = await response.json();
        console.log("Loans Data:", data); // Log the received data structure
        setLoans(data); // Assuming `data` is an array of loan objects
      } catch (err) {
        console.error(err);
        setError(`Failed to fetch loans: ` + err.message);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      fetchLoans();
    }
  }, [userId]);

  // Navigate to LoanInfo with accountId and loanId
  const getLoanInfo = (loan) => {
    const loanId = loan.loan_id;
    const accountId = loan.user_account ? loan.user_account.account_id : null;
  
    if (loanId && accountId) {
      navigate(`/loanInfo/${loanId}/${accountId}`);
    } else {
      console.error("Missing loanId or accountId for loan:", loan);
      alert("Unable to navigate: Missing loanId or accountId.");
    }
  };
  

  const styles = {
    button: {
      backgroundColor: '#05654d',
      borderColor: '#05654d',
    },
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      border: '2px solid grey',
      borderRadius: '10px',
      overflow: 'hidden',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    tableRow: {
      cursor: "pointer",
      borderBottom: '2px solid grey',
    },
    header: {
      backgroundColor: '#05654d',
      color: '#FFFFFF',
      fontWeight: 'bold',
      textAlign: 'center',
      padding: '10px',
      fontSize: '16px',
      borderBottom: '2px solid grey', 
      borderLeft: 'none',
      borderRight: 'none',
    },
    cell: {
      textAlign: 'center',
      padding: '10px',
      fontSize: '14px',
      borderBottom: '2px solid grey', 
      borderLeft: 'none', 
      borderRight: 'none', 
    },
  };

  return (
    <Container>
      <Row className="my-3 align-items-center">
        <Col className="text-start">
          <Button style={styles.button} onClick={() => navigate('/')}>
            Logout
          </Button>
        </Col>
        <Col className="text-end">
          <Button style={styles.button} onClick={() => navigate(`/info/${userId}`)}>
            Account Information
          </Button>
        </Col>
      </Row>

      <Row className="my-3">
        <Col>
          <h3 style={{ color: '#05654d' }}>Your Loans</h3>
          {loading ? (
            <p>Loading loans...</p>
          ) : error ? (
            <p style={{ color: 'red' }}>Error: {error}</p>
          ) : loans.length > 0 ? (
            <Table striped bordered hover responsive style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.header}>Date</th>
                  <th style={styles.header}>Amount Owed</th>
                  <th style={styles.header}>Original Amount</th>
                  <th style={styles.header}>Interest Rate</th>
                  <th style={styles.header}>Pay-off Date</th>
                </tr>
              </thead>
              <tbody>
                {loans.map((loan) => (
                  <tr
                    key={loan.loan_id}
                    style={styles.tableRow}
                    onClick={() => getLoanInfo(loan)}
                  >
                    <td style={styles.cell}>{new Date(loan.created_at).toLocaleDateString("en-US")}</td>
                    <td style={styles.cell}>{loan.amount_owed}</td>
                    <td style={styles.cell}>{parseFloat(loan.loan_origin_amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}</td>
                    <td style={styles.cell}>{loan.interest_rate}%</td>
                    <td style={styles.cell}>{loan.payoff_date}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <p>No loans found.</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default Customer;
