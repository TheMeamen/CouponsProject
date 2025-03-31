package com.example.NewCouponsProject.controllers;

import com.example.NewCouponsProject.DTOs.UpdateCustomerRequest;
import com.example.NewCouponsProject.services.CustomerService;
import com.example.NewCouponsProject.beans.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CustomerController for customer users
 */
@RestController
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService customerService;


    /**
     * used to purchase a new coupon
     * @param email email
     * @param couponId couponid
     * @return nada
     */
    @PostMapping("/purchase")
    public ResponseEntity<Void> purchaseCoupon(@RequestParam String email, @RequestParam Long couponId) {
        Customer customer = customerService.getCustomerDetails(email);
        customerService.purchaseCoupon(customer.getId(), couponId);
        return ResponseEntity.ok().build();
    }

    /**
     * returns all the previous purchases of given customer
     * @param email email
     * @return list of coupons
     */
    @GetMapping("/purchased")
    public ResponseEntity<List<Coupon>> getPurchasedCoupons(@RequestParam String email) {
        Customer customer = customerService.getCustomerDetails(email);
        return ResponseEntity.ok(customer.getCoupons());
    }

    /**
     * retrieves customers detail for editing
     * @param email email
     * @return customer
     */
    @GetMapping("/profile/{email}")
    public ResponseEntity<Customer> getCustomerDetails(@PathVariable String email) {
        return ResponseEntity.ok(customerService.getCustomerDetails(email));
    }

    /**
     * updates given customer with given data
     * @param request customer details
     * @return nothing
     */
    @PutMapping("/update")
    public ResponseEntity<Void> updateCustomerProfile(@RequestBody UpdateCustomerRequest request) {
        try {
            Customer customer = customerService.getCustomerDetails(request.getEmail());
            customer.setUsername(request.getName());
            customer.setPassword(request.getPassword());
            customerService.updateCustomer(customer);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }
}

