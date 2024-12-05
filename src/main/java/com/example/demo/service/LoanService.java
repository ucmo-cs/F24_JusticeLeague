package com.example.demo.service;

import com.example.demo.domain.Account;
import com.example.demo.domain.Loan;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.LoanRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class LoanService {

    private final LoanRepository loanRepository;
    private final AccountRepository accountRepository;

    //create loan logic
    @Transactional
    public Loan create(Loan loan, String userId) {
        Optional<Account> account = accountRepository.findByUserId(userId);

        if (account.isPresent()) {
            loan.setUser_account(account.get()); //associating user with loan
            loan.setCreated_at(new Timestamp(System.currentTimeMillis())); //set current date
            return loanRepository.save(loan);
        }else{
            throw new RuntimeException("Account not found with ID: " +userId);
        }
    }

    @Transactional(readOnly = true)
    public List<Loan> findAll() {
        return loanRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Loan findById(Long loanId) {
        Optional<Loan> loan = loanRepository.findById(loanId);
        return loan.orElse(null); //return loan if found or return null
    }

    //getting loans by user id
    @Transactional
    public List<Loan> getLoansByUserId(String userId) {
        return loanRepository.findLoansByUserId(userId);
    }
}