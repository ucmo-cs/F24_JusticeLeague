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

    //create account
    @Transactional
    public Account create(Account acct) {
        return accountRepository.save(acct);
    }
    //find account by userID
    @Transactional
    public Account findByUserId(String userId) {
        return accountRepository.findByUserId(userId).orElse(null);
    }

    //logic for updating the account
    public Account updateAccount(String userId, Account updatedAccount) {
        //find the existing account by user id
        Account existingAccount = accountRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Account not found for userId: " + userId));

        //update fields with provided data
        existingAccount.setFirstName(updatedAccount.getFirstName());
        existingAccount.setLastName(updatedAccount.getLastName());
        existingAccount.setPhoneNumber(updatedAccount.getPhoneNumber());
        existingAccount.setEmail(updatedAccount.getEmail());

        //save and return updated account
        return accountRepository.save(existingAccount);
    }
}