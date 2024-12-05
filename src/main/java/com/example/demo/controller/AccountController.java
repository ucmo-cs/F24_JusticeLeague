package com.example.demo.controller;

import com.example.demo.domain.Account;
import com.example.demo.dto.AccountDto;
import com.example.demo.dto.LoginResponseDto;
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
@RequestMapping("/accounts") //base URL for all endpoints
public class AccountController {

    private final AccountService accountService;
    private final AccountRepository accountRepository;

    @CrossOrigin
    @PostMapping
    //to create a new account
    //maps Accountdto to an account using modelmapper
    public ResponseEntity<?> save(@RequestBody AccountDto accountDto) {
        Account account = new ModelMapper().map(accountDto, Account.class);
        account.setCreated_at(new Timestamp(System.currentTimeMillis()));
        //putting new account into the database
        return new ResponseEntity<>(accountService.create(account), HttpStatus.CREATED);
    }

    @CrossOrigin
    @PostMapping("/user")
    //handle user login
    public ResponseEntity<?> login(@RequestBody AccountDto accountDto) {
        System.out.println("user id : " + accountDto.getUserId());
        System.out.println("user password : " + accountDto.getPassword());

        //looking up user id in the repository
        Optional<Account> acct = accountRepository.findByUserId(accountDto.getUserId());

        //check if the user exists and the passwords match
        if (acct.isPresent() && acct.get().getPassword().equals(accountDto.getPassword())) {
            System.out.println("Login Successful!");
            LoginResponseDto response = new LoginResponseDto("Login Successful!", acct.get().getUser_type(),acct.get().getUserId());
            return ResponseEntity.ok(response);
        } else {
            System.out.println("Login Failed!");
            return ResponseEntity.status(401).body("Invalid user Id or Password");
        }
    }

    @CrossOrigin
    @GetMapping("/{userId}")
    //finding the account by user ID
    public ResponseEntity<?> findByUserId(@PathVariable String userId) {
        Account account = accountService.findByUserId(userId);
        if (account != null) {
            return new ResponseEntity<>(account, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    //update account by user id
    @PutMapping("/{userId}")
    public ResponseEntity<Account> updateAccount(
            @PathVariable String userId,
            @RequestBody Account accountDetails) {
        try {
            //sending the new information to the database
            Account updatedAccount = accountService.updateAccount(userId, accountDetails);
            return ResponseEntity.ok(updatedAccount);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }
}
