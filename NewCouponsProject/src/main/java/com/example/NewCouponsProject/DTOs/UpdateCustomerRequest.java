package com.example.NewCouponsProject.DTOs;

import lombok.Getter;
import lombok.Setter;

/**
 * class used in customer update requests
 */
@Getter
@Setter
public class UpdateCustomerRequest {
    private String name;
    private String email;
    private String password;
}
