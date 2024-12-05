import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const LoanInfo = () => {
    const { accountId } = useParams();
    const [loan, setLoan] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                if (!accountId || isNaN(accountId)) {
                    throw new Error('Invalid Account ID.');
                }
                const response = await fetch('http://localhost:8081/loans');
                if (!response.ok) {
                    throw new Error('Failed to fetch loan data.');
                }
                const loansData = await response.json();
                const foundLoan = loansData.find(loan => loan.user_account.account_id === parseInt(accountId, 10));
                if (foundLoan) {
                    setLoan(foundLoan);
                } else {
                    setError('Loan not found for the provided account ID.');
                }
            } catch (err) {
                setError(err.message);
            }
        };

        fetchLoans();
    }, [accountId]);

    if (error) {
        return <div style={styles.error}>{error}</div>;
    }

    if (!loan) {
        return <div style={styles.loading}>Loading loan information...</div>;
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
                    <tr>
                        <td style={styles.cellLabel}>Routing Number</td>
                        <td style={styles.cellValue}>{loan.user_account.routingNumber}</td>
                    </tr>
                    <tr>
                        <td style={styles.cellLabel}>Account Number</td>
                        <td style={styles.cellValue}>{loan.user_account.bankNumber}</td>
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
