import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function Loan_bk() {
  const [loans, setLoans] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8081/loans", { method: "GET" })
      .then(res => res.json())
      .then(res => { 
        console.log("Loan data:", res); // For debugging
        setLoans(res); 
      })
      .catch(error => console.error("Error fetching loans:", error));
  }, []);

  const movePage = () => {
    navigate("/loanForm");
  };

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
      <h1 style={styles.header}>Loans Overview</h1>
      
      <Button variant="success" onClick={movePage} style={styles.button}>Create Loan</Button>
      
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
    fontFamily: 'Arial, sans-serif',
    color: '#000000', // Dark blue, Commerce Bank style
    marginTop: '20px',
  },
  header: {
    fontSize: '24px',
    color: '#000000', // Darker blue for emphasis
    marginBottom: '20px',
  },
  button: {
    marginBottom: '20px',
    backgroundColor: '#006400', // Green consistent with Commerce Bank style
    borderColor: '#006400',
    fontSize: '16px',
  },
  table: {
    width: '80%',
    maxWidth: '600px',
    marginBottom: '20px',
    borderCollapse: 'collapse',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    border: '2px solid black', // Add a black border around the entire table
  },
  tableHeader: {
    backgroundColor: '#006400', // Green for headers
    color: '#FFFFFF',
    fontWeight: 'bold',
    padding: '10px',
    fontSize: '16px',
    textAlign: 'center',
    borderBottom: '2px solid black', // Black horizontal line for header
    border: 'none', // Hide vertical lines in header
  },
  tableRow: {
    cursor: "pointer",
    borderBottom: '2px solid black', // Black horizontal line for rows
  },
  cellValue: {
    padding: '10px',
    textAlign: 'right',
    border: 'none', // Hide vertical lines
    fontSize: '14px',
  },
};

export default Loan_bk;
