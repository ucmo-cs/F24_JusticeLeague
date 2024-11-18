package com.example.demo.dto;

import lombok.Data;

@Data
public class LoginResponseDto {
    private String message;
    private int userType;
    private String userId;

    public LoginResponseDto(String message, int userType, String userId) {
        this.message = message;
        this.userType = userType;
        this.userId = userId;
    }
}
