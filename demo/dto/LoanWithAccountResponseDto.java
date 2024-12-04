package com.example.demo.dto;

import com.example.demo.domain.Account;
import com.example.demo.domain.Loan;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class LoanWithAccountResponseDto {
    private Loan loan;
    private Account account;
}
