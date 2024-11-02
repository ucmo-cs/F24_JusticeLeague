// LoanInfo.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LoanInfo = () => {
    const { accountId } = useParams(); // Get accountId from the URL
    const [loan, setLoan] = useState(null); // Single loan object
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await fetch('http://localhost:8081/loans'); // Fetch all loans
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const loansData = await response.json();
                console.log('Fetched loans:', loansData);

                // Find the loan by the provided accountId
                const foundLoan = loansData.find(loan => loan.user_account.account_id === parseInt(accountId, 10));
                
                if (foundLoan) {
                    setLoan(foundLoan); // Set the found loan
                } else {
                    setError('Loan not found'); // Handle not found case
                }
            } catch (error) {
                setError('There was a problem with the fetch operation: ' + error.message);
                console.error('Error fetching loans:', error);
            }
        };

        fetchLoans();
    }, [accountId]); // Effect runs when accountId changes

    if (error) {
        return <div style={styles.error}>Error: {error}</div>;
    }

    if (!loan) {
        return <div style={styles.loading}>Loading...</div>; // Loading state
    }

    return (
        <div style={styles.container}>
            <h1 style={styles.header}>Loan Information</h1>
            
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

            <table style={styles.table}>
                <thead>
                    <tr>
                        <th colSpan="2" style={styles.tableHeader}>Account Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={styles.cellLabel}>Account ID</td>
                        <td style={styles.cellValue}>{loan.user_account.account_id}</td>
                    </tr>
                    <tr>
                        <td style={styles.cellLabel}>User ID</td>
                        <td style={styles.cellValue}>{loan.user_account.userId}</td>
                    </tr>
                    <tr>
                        <td style={styles.cellLabel}>User Name</td>
                        <td style={styles.cellValue}>{loan.user_account.userName}</td>
                    </tr>
                    <tr>
                        <td style={styles.cellLabel}>Email</td>
                        <td style={styles.cellValue}>{loan.user_account.email}</td>
                    </tr>
                    <tr>
                        <td style={styles.cellLabel}>Phone Number</td>
                        <td style={styles.cellValue}>{loan.user_account.phoneNumber}</td>
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
        color: '#000000', // Dark blue, Commerce Bank style
        marginTop: '20px',
    },
    header: {
        fontSize: '24px',
        color: '#000000', // Lighter blue for emphasis
        marginBottom: '20px',
    },
    table: {
        width: '80%',
        maxWidth: '600px',
        marginBottom: '20px',
        borderCollapse: 'collapse',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
    },
    tableHeader: {
        backgroundColor: '#006400', // Light blue, Commerce Bank style
        color: '#FFFFFF', 
        fontWeight: 'bold',
        padding: '10px',
        fontSize: '18px',
        textAlign: 'center',
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
};

export default LoanInfo;
