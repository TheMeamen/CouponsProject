package com.example.NewCouponsProject.DTOs;

import lombok.Getter;
import lombok.Setter;

/**
 * class used in auth requests
 */
@Getter
@Setter
public class AuthRequest {
    private String username;
    private String password;
}
