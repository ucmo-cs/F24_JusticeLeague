package com.example.demo.dto;

import lombok.Data;

@Data
public class LoginResponseDto {
    private String message;
    private int userType;

    public LoginResponseDto(String message, int userType) {
        this.message = message;
        this.userType = userType;
    }
}
