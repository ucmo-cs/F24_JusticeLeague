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
        return <div>Error: {error}</div>;
    }

    if (!loan) {
        return <div>Loading...</div>; // Loading state
    }

    return (
        <div>
            <h1>Loan Information</h1>
            <p><strong>Loan ID:</strong> {loan.loan_id}</p>
            <p><strong>Loan ID:</strong> {loan.user_account.account_id}</p>
            <p><strong>Original Amount:</strong> {loan.loan_origin_amount}</p>
            <p><strong>Interest Rate:</strong> {loan.interest_rate}%</p>
            <p><strong>Created At:</strong> {new Date(loan.created_at).toLocaleString()}</p>
            <p><strong>User Name:</strong> {loan.user_account.userName}</p>
            <p><strong>Email:</strong> {loan.user_account.email}</p>
            <p><strong>Phone Number:</strong> {loan.user_account.phoneNumber}</p>
        </div>
    );
};

export default LoanInfo;
