package com.example.demo.controller;

import com.example.demo.domain.Loan;
import com.example.demo.dto.LoanDto;
import com.example.demo.service.LoanService;
import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;

@AllArgsConstructor
@RestController
@RequestMapping("/loans") // Base URL for loan-related endpoints
public class LoanController {

    private final LoanService loanService;

    @CrossOrigin
    @PostMapping
    public ResponseEntity<?> save(@RequestBody LoanDto loanDto) {
        Loan loan = new ModelMapper().map(loanDto, Loan.class);
        loan.setCreated_at(new Timestamp(System.currentTimeMillis()));

        String userId = "testId"; // Retrieve from session or auth context
        return new ResponseEntity<>(loanService.create(loan, userId), HttpStatus.CREATED);
    }

    @CrossOrigin
    @GetMapping
    public ResponseEntity<?> findAll() {
        return new ResponseEntity<>(loanService.findAll(), HttpStatus.OK);
    }

    @CrossOrigin
    @GetMapping("/{loanId}") // Ensure this maps to the loan ID
    public ResponseEntity<?> findByLoanId(@PathVariable Long loanId) {
        Loan loan = loanService.findById(loanId); // Assuming you have a method to find by loanId
        if (loan != null) {
            return new ResponseEntity<>(loan, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
