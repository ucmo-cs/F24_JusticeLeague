package com.example.demo.controller;

import com.example.demo.domain.Account;
import com.example.demo.domain.Loan;
import com.example.demo.dto.LoanDto;
import com.example.demo.dto.LoanWithAccountResponseDto;
import com.example.demo.service.LoanService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@RestController
@RequestMapping("/loans") // Base URL for loan-related endpoints
public class LoanController {

    private final LoanService loanService;

    @CrossOrigin
    @PostMapping("/{userId}")
    public ResponseEntity<?> save(@RequestBody LoanDto loanDto, @PathVariable String userId) {
        Loan loan = new ModelMapper().map(loanDto, Loan.class);
        loan.setCreated_at(new Timestamp(System.currentTimeMillis()));

        return new ResponseEntity<>(loanService.create(loan, userId), HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping("/{loanId}/withAccount")
    public ResponseEntity<?> findLoanWithAccountByLoanId(@PathVariable Long loanId) {
        Loan loan = loanService.findById(loanId);
        if (loan == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }

        Account account = loan.getUser_account();
        if (account == null) {
            return new ResponseEntity<>("Account details not found for loan", HttpStatus.NOT_FOUND);
        }

        // Build a combined response
        LoanWithAccountResponseDto response = new LoanWithAccountResponseDto(loan, account);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }


    @CrossOrigin
    @GetMapping
    public ResponseEntity<?> findAll() {
        return new ResponseEntity<>(loanService.findAll(), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/{loanId}") // Ensure this maps to the loan ID
    public ResponseEntity<?> findByLoanId(@PathVariable Long loanId) {
        Loan loan = loanService.findById(loanId);
        if (loan != null) {
            return new ResponseEntity<>(loan, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    @CrossOrigin
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Loan>> getLoansByUserId(@PathVariable String userId) {
        List<Loan> loans = loanService.getLoansByUserId(userId);
        System.out.println("Fetching loans for userId: " + userId);

        if (loans.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(loans);
    }
}
