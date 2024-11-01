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
        console.log("Loan data:", res); // Add this line to inspect loan structure
        setLoans(res); 
      })
      .catch(error => console.error("Error fetching loans:", error));
  }, []);
  

  const movePage = () => {
    navigate("/loanForm");
  };

  const goToLoanInfo = (loan) => {
    const accountId = loan.user_account ? loan.user_account.account_id : null; // Adjusted to access account_id correctly
    if (accountId) {
      navigate(`/loanInfo/${accountId}`);
    } else {
      console.error("accountId is missing for loan:", loan);
      alert("Unable to navigate: accountId is missing for this loan.");
    }
  };
  
  

  return (
    <div>
      <Button variant="success" onClick={movePage}>Create</Button>{' '}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Loan ID</th>
            <th>Loan Amount</th>
            <th>Interest Rate</th>
            <th>Username</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {loans.map(loan => (
            <tr
              key={loan.account_id}
              style={{ cursor: "pointer" }}
              onClick={() => goToLoanInfo(loan)} // Pass the entire loan object here
            >
              <td>{loan.loan_id}</td>
              <td>${loan.loan_origin_amount}</td>
              <td>{loan.interest_rate}%</td>
              <td>{loan.user_account ? loan.user_account.userName : "N/A"}</td>
              <td>{new Date(loan.created_at).toLocaleDateString("en-US")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Loan_bk;
