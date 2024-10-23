package com.example.demo.service;

import com.example.demo.domain.Account;
import com.example.demo.domain.Loan;
import com.example.demo.repository.AccountRepository;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.Optional;

import java.util.List;

@AllArgsConstructor
@Service
public class AccountService {

    private final AccountRepository accountRepository;

    @Transactional
    public Account create(Account acct) {
        return accountRepository.save(acct);
    }
    @Transactional
    public Account findByUserId(String userId) {
        return accountRepository.findByUserId(userId).orElse(null);
    }

}
