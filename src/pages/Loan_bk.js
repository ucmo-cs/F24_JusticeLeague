import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function Loan_bk() {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();

  //fetching the loans from API endpoint
  useEffect(() => {
    fetch("http://localhost:8081/loans", { method: "GET" })
      .then(res => res.json())
      .then(res => { 
        console.log("Loan data:", res); 
        setLoans(res); 
      })
      //error handling
      .catch(error => console.error("Error fetching loans:", error));
  }, []);

  //navigates to loan creation form
  const movePage = () => {
    navigate("/loanForm");
  };

  //if user clicks on a loan it will give user info and loan info
  const goToLoanInfo = (loan) => {
    const accountId = loan.user_account ? loan.user_account.account_id : null;
    if (accountId) {
      navigate(`/loanInfo/${accountId}`);
    } else {
      console.error("accountId is missing for loan:", loan);
      alert("Unable to navigate: accountId is missing for this loan.");
    }
  };

  return (
    <div style={styles.container}>
      
      <div style={styles.buttonContainer}>
      <Button style={styles.button} onClick={() => window.location.href = 'http://localhost:3000'}>
          Logout
        </Button>
        <Button variant="success" onClick={movePage} style={styles.button}>Create Loan</Button>
      </div>

      
      <Table striped bordered hover style={styles.table}>
        <thead>
          <tr>
            <th style={styles.tableHeader}>Loan ID</th>
            <th style={styles.tableHeader}>Loan Amount</th>
            <th style={styles.tableHeader}>Interest Rate</th>
            <th style={styles.tableHeader}>Username</th>
            <th style={styles.tableHeader}>Created At</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(loan => (
            <tr
              key={loan.loan_id}
              style={styles.tableRow}
              onClick={() => goToLoanInfo(loan)}
            >
              <td style={styles.cellValue}>{loan.loan_id}</td>
              <td style={styles.cellValue}>
                {parseFloat(loan.loan_origin_amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
              </td>
              <td style={styles.cellValue}>{loan.interest_rate}%</td>
              <td style={styles.cellValue}>{loan.user_account ? loan.user_account.userName : "N/A"}</td>
              <td style={styles.cellValue}>{new Date(loan.created_at).toLocaleDateString("en-US")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    color: '#000000', 
    marginTop: '20px',
  },
  header: {
    fontSize: '30px',
    color: '#000000', 
    marginBottom: '20px',
  },
  button: {
    backgroundColor: '#05654d',
    borderColor: '#05654d',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: '20px',
  },
  table: {
    width: '80%',
    maxWidth: '800%',
    marginBottom: '20px',
    borderCollapse: 'collapse',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    border: '2px solid grey',
    borderRadius: '10px',
    overflow: 'hidden', 
  },
  tableHeader: {
    backgroundColor: '#05654d',
    color: '#FFFFFF',
    fontWeight: 'bold',
    padding: '15px',
    fontSize: '18px',
    textAlign: 'center', 
    borderBottom: '2px solid grey',
    border: 'none',
  },
  tableRow: {
    cursor: "pointer",
    borderBottom: '2px solid grey',
  },
  cellValue: {
    padding: '15px',
    textAlign: 'center', 
    border: 'none', 
    fontSize: '14px',
  },
};


export default Loan_bk;
