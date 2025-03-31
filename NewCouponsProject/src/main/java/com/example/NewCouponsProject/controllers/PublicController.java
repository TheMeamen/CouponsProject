package com.example.NewCouponsProject.controllers;

import com.example.NewCouponsProject.DTOs.AuthRequest;
import com.example.NewCouponsProject.DTOs.AuthResponse;
import com.example.NewCouponsProject.beans.Coupon;
import com.example.NewCouponsProject.beans.Customer;
import com.example.NewCouponsProject.beans.UserEntity;
import com.example.NewCouponsProject.services.AdminService;
import com.example.NewCouponsProject.services.CompanyService;
import com.example.NewCouponsProject.services.CustomerService;
import com.example.NewCouponsProject.utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * public facing API, used before login
 */
@RestController
@RequestMapping("/api")
public class PublicController {

    @Autowired
    private AdminService adminService;
    @Autowired
    private CompanyService companyService;
    @Autowired
    private CustomerService customerService;

    @Autowired
    private JwtUtil jwtUtil;

    /**
     * login function
     * @param authRequest
     * @return token
     */
    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) {
        // Validate user credentials
        String role = null;
        if (adminService.login(authRequest.getUsername(), authRequest.getPassword())) {
            role = "ADMIN";
        } if (companyService.login(authRequest.getUsername(), authRequest.getPassword())) {
            role = "COMPANY";
        } if (customerService.login(authRequest.getUsername(), authRequest.getPassword())) {
            role = "CUSTOMER";
        }

        if (role == null) {
            return ResponseEntity.status(401).body(new AuthResponse("Invalid credentials", null, null));
        }

        // Generate JWT token
        String token = jwtUtil.generateToken(authRequest.getUsername(), role);

        // Return response
        return ResponseEntity.ok(new AuthResponse("Login successful", token, role));
    }

    /**
     * used in the coupon page
     * @return
     */
    @GetMapping("/coupons")
    public ResponseEntity<List<Coupon>> getAllCoupons() {
        return ResponseEntity.ok(customerService.getAllCoupons());
    }

    /**
     * used to register new customers (only customers can register without an admin)
     * @param user
     * @return confirmation message
     */
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserEntity user) {
        try {
            // Check if user already exists
            if (adminService.existsByEmail(user.getEmail())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Email is already in use.");
            }

            // Validate and save user (you might want to encode the password here)
            Customer customer = new Customer();
            customer.setUsername(user.getUsername());
            customer.setEmail(user.getEmail());
            customer.setPassword(user.getPassword());
            customer.setCoupons(new ArrayList<Coupon>());
            adminService.addCustomer(customer);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body("User registered successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An error occurred during registration. Please try again.");
        }
    }


}
