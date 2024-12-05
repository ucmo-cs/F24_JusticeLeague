import React, {useEffect, useState} from 'react';
import { Button, Table, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function Customer() {
  const navigate = useNavigate();
  const {userId} = useParams();

  //state to store loan data
  const[loans, setLoans] = useState([]);

    // Fetch loans based on userId
    useEffect(() => {
      const fetchLoans = async () => {
        try {
          const response = await fetch(`http://localhost:8081/loans/user/${userId}`);
          //error handling
          if (!response.ok) {
            console.error(`Error fetching loans: ${response.status} ${response.statusText}`);
            throw new Error(`Error fetching loans: ${response.statusText}`);
          }
          const data = await response.json(); //putting repsonse into JSON format
          console.log("Loans Data:", data);// logging the data
          setLoans(data); // puts the loan data retrieved into an array
        } catch (err) {
          console.error(err);
        }
      };
    
      //getting loans if a valid userid is provided
      if (userId) {
        fetchLoans();
      }
    }, [userId]);
  
    //loan and customer information if user clicks on a specific loan
    const getLoanInfo = (loan) => {
      const accountId = loan.user_account ? loan.user_account.account_id : null;
      //if loan has an associated accountid, navigate to the loan
      if (accountId) {
        navigate(`/loanInfo/${accountId}`);
      } else {
        //error handling
        console.error("accountId is missing for loan:", loan);
        alert("Unable to navigate: accountId is missing for this loan.");
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
          <Button style={styles.button} onClick={()=>navigate('/')}>
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
            <Table striped bordered hover responsive style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.header}>Date</th>
                  <th style={styles.header}>Amount Owed</th>
                  <th style={styles.header}>Original Amount</th>
                  <th style={styles.header}>Interest Rate</th>
                </tr>
              </thead>
              <tbody>
              {loans.map((loan) => {
                const totalAmount = parseFloat(loan.loan_origin_amount) * (1 + loan.interest_rate / 100);

                return (
                  <tr
                    key={loan.loan_id}
                    style={styles.tableRow}
                    onClick={() => getLoanInfo(loan)}
                  >
                    <td style={styles.cell}>
                      {new Date(loan.created_at).toLocaleDateString("en-US")}
                      
                    </td>
                    <td style={styles.cell}>
                    {totalAmount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </td>
                    <td style={styles.cell}>
                      {parseFloat(loan.loan_origin_amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                    </td>
                    <td style={styles.cell}>{loan.interest_rate}%</td>

                  </tr>
                );
              })}
            </tbody>
            </Table>
        </Col>
      </Row>
    </Container>
  );
}

export default Customer;
