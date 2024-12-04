package com.example.demo.dto;
import lombok.Data;

@Data
public class LoanDto {

    private String loan_origin_amount;
    private String interest_rate;
    private String account_id;
    private String user_id;
    private String user_account_id;
    private String pay_off_date;
}

