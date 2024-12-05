package com.example.demo.dto;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class AccountDto {

        private String userId;
        private String firstName;
        private String lastName;
        private String userName;
        private String password;
        private String email;
        private String phoneNumber;

}



