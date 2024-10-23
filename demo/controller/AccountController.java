package com.example.demo.controller;


import com.example.demo.domain.Account;
import com.example.demo.dto.AccountDto;
import com.example.demo.repository.AccountRepository;
import com.example.demo.service.AccountService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.Optional;

@AllArgsConstructor
@RestController
public class AccountController {

    private final AccountService accountService;
    private final AccountRepository accountRepository;

    @CrossOrigin
    @PostMapping("/account")
    public ResponseEntity<?> save(@RequestBody AccountDto accountDto) {

        Account account = new ModelMapper().map(accountDto, Account.class);
        account.setCreated_at(new Timestamp(System.currentTimeMillis()));

        return new ResponseEntity<>(accountService.create(account), HttpStatus.CREATED);

    }
    @CrossOrigin
    @PostMapping("/user")
    public ResponseEntity<?> login(@RequestBody AccountDto accountDto) {

        System.out.println("user id : " + accountDto.getUserId());
        System.out.println("user password : " + accountDto.getPassword());

        Optional<Account> acct = accountRepository.findByUserId(accountDto.getUserId());

        //check if user exists and if the passwords matches
        if(acct.isPresent() && acct.get().getPassword().equals(accountDto.getPassword())) {
            System.out.println("Login Successful!");
            return ResponseEntity.ok("Login Successful!");
        }else{
            System.out.println("Login Failed!");
            return ResponseEntity.status(401).body("Invalid user Id or Password");
        }
    }

    @CrossOrigin
    @GetMapping("/account/{userId}")
    public ResponseEntity<?> findByUserId(@PathVariable String userId) {
        Account account = accountService.findByUserId(userId);
        if (account != null) {
            return new ResponseEntity<>(account, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

}


