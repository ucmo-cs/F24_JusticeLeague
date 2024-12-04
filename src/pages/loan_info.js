import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';

const LoanInfo = () => {
    const { loanId, accountId } = useParams(); // Get loanId and accountId from the URL
    const [loan, setLoan] = useState(null); // Single loan object
    const [account, setAccount] = useState(null); // Account details object
    const [error, setError] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        const fetchLoanWithAccountDetails = async () => {
            try {
                const response = await fetch(`http://localhost:8081/loans/${loanId}/withAccount`);
                if (!response.ok) {
                    throw new Error('Failed to fetch loan and account details');
                }
                const data = await response.json();
                setLoan(data.loan);
                setAccount(data.account);
            } catch (err) {
                setError(err.message);
            }
        };
    
        if (loanId) fetchLoanWithAccountDetails();
    }, [loanId]);
    
    if (error) {
        return <div style={styles.error}>Error: {error}</div>;
    }

    if (!loan || !account) {
        return <div style={styles.loading}>Loading...</div>; // Loading state
    }
    
    const handleBackClick = () => {
        const userType = localStorage.getItem('userType');
        console.log('userType: ', userType);
        
        if (userType === '1') {  
            navigate('/loan'); 
        } else if (userType === '0') {  
            navigate(`/customer/${account.userId}`); 
        }
    };
    

    return (
        <div style={styles.container}>
            <div style={styles.headerContainer}>
                <Button style={styles.buttons} onClick={() => navigate('/')}>Logout</Button>
                <h1 style={styles.header}>Loan Information</h1>
                <Button style={styles.buttons} onClick={handleBackClick}>Back</Button>
            </div>

            {/* Loan Details Table */}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th colSpan="2" style={styles.tableHeader}>Loan Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={styles.cellLabel}>Loan ID</td>
                        <td style={styles.cellValue}>{loan.loan_id}</td>
                    </tr>
                    <tr>
                        <td style={styles.cellLabel}>Original Amount</td>
                        <td style={styles.cellValue}>
                            {parseFloat(loan.loan_origin_amount).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                        </td>
                    </tr>
                    <tr>
                        <td style={styles.cellLabel}>Interest Rate</td>
                        <td style={styles.cellValue}>{loan.interest_rate}%</td>
                    </tr>
                    <tr>
                        <td style={styles.cellLabel}>Created At</td>
                        <td style={styles.cellValue}>{new Date(loan.created_at).toLocaleString()}</td>
                    </tr>
                </tbody>
            </table>

            {/* Account Details Table */}
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th colSpan="2" style={styles.tableHeader}>Account Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={styles.cellLabel}>Account ID</td>
                        <td style={styles.cellValue}>{account.account_id}</td>
                    </tr>
                    <tr>
                        <td style={styles.cellLabel}>User ID</td>
                        <td style={styles.cellValue}>{account.userId}</td>
                    </tr>
                    <tr>
                        <td style={styles.cellLabel}>User Name</td>
                        <td style={styles.cellValue}>{account.userName}</td>
                    </tr>
                    <tr>
                        <td style={styles.cellLabel}>Email</td>
                        <td style={styles.cellValue}>{account.email}</td>
                    </tr>
                    <tr>
                        <td style={styles.cellLabel}>Phone Number</td>
                        <td style={styles.cellValue}>{account.phoneNumber}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontFamily: 'Arial, sans-serif',
        color: '#05654d',
        marginTop: '20px',
    },
    headerContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        padding: '0 20px',
    },
    header: {
        fontSize: '24px',
        color: '#05654d',
        marginBottom: '20px',
    },
    table: {
        width: '45%',
        maxWidth: '800%',
        marginBottom: '20px',
        borderCollapse: 'collapse',
        border: '2px solid grey',
        borderRadius: '10px',
        overflow: 'hidden',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    tableHeader: {
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
    cellLabel: {
        backgroundColor: '#f0f4f8',
        fontWeight: 'bold',
        padding: '10px',
        textAlign: 'left',
        border: '1px solid #ddd',
        width: '40%',
    },
    cellValue: {
        padding: '10px',
        textAlign: 'right',
        border: '1px solid #ddd',
    },
    loading: {
        fontSize: '18px',
        color: '#666',
        textAlign: 'center',
    },
    error: {
        fontSize: '18px',
        color: 'red',
        textAlign: 'center',
    },
    buttons: {
        backgroundColor: '#05654d',
        borderColor: '#05654d',
        fontSize: '16px',
    },
};

export default LoanInfo;
