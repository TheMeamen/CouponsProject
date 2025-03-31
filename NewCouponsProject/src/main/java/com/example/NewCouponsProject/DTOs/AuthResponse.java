package com.example.NewCouponsProject.DTOs;

import lombok.Getter;
import lombok.Setter;

/**
 * class used in auth responess
 */
@Getter
@Setter
public class AuthResponse {
    private String message;
    private String token;
    private String role;

    public AuthResponse(String message, String token, String role) {
        this.message = message;
        this.token = token;
        this.role = role;
    }
}
