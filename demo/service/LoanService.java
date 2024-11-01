package com.example.demo.service;

import com.example.demo.domain.Account;
import com.example.demo.domain.Loan;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.LoanRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class LoanService {

    private final LoanRepository loanRepository;
    private final AccountRepository accountRepository;

    @Transactional
    public Loan create(Loan loan, String userId) {
        Account account = accountRepository.findByUserId(userId).orElse(null);

        if (account != null) {
            loan.setUser_account(account);
        }

        return loanRepository.save(loan);
    }

    @Transactional(readOnly = true)
    public List<Loan> findAll() {
        return loanRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Loan findById(Long loanId) {
        Optional<Loan> loan = loanRepository.findById(loanId);
        return loan.orElse(null); // Return the loan if found, otherwise return null
    }
}
