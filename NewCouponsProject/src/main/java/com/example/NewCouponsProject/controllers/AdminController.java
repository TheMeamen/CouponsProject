package com.example.NewCouponsProject.controllers;

import com.example.NewCouponsProject.services.AdminService;
import com.example.NewCouponsProject.beans.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * admins controller for admins uses
 */
@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;


    /**
     * Adds company
     * @param company company
     * @return void
     */
    @PostMapping("/company")
    public ResponseEntity<Void> addCompany(@RequestBody Company company) {
        adminService.addCompany(company);
        return ResponseEntity.ok().build();
    }

    /**
     * updates company
     * @param company company
     * @return void
     */
    @PutMapping("/company")
    public ResponseEntity<Void> updateCompany(@RequestBody Company company) {
        adminService.updateCompany(company);
        return ResponseEntity.ok().build();
    }

    /**
     * deletes company
     * @param id id
     * @return void
     */
    @DeleteMapping("/company/{id}")
    public ResponseEntity<Void> deleteCompany(@PathVariable Long id) {
        adminService.deleteCompany(id);
        return ResponseEntity.ok().build();
    }

    /**
     * retrieves all companies
     * @return void
     */
    @GetMapping("/companies")
    public ResponseEntity<List<Company>> getAllCompanies() {
        return ResponseEntity.ok(adminService.getAllCompanies());
    }

    /**
     * get ccompanies details by id
     * @param id id
     * @return company
     */
    @GetMapping("/company/{id}")
    public ResponseEntity<Company> getCompanyById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getCompanyById(id));
    }

    /**
     * adds customer
     * @param customer customer
     * @return void
     */
    @PostMapping("/customer")
    public ResponseEntity<Void> addCustomer(@RequestBody Customer customer) {
        adminService.addCustomer(customer);
        return ResponseEntity.ok().build();
    }

    /**
     * updates customer
     * @param customer customer
     * @return void
     */
    @PutMapping("/customer")
    public ResponseEntity<Void> updateCustomer(@RequestBody Customer customer) {
        adminService.updateCustomer(customer);
        return ResponseEntity.ok().build();
    }

    /**
     * delets customer
     * @param id id
     * @return void
     */
    @DeleteMapping("/customer/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        adminService.deleteCustomer(id);
        return ResponseEntity.ok().build();
    }

    /**
     * retrieves all customers
     * @return void
     */
    @GetMapping("/customers")
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(adminService.getAllCustomers());
    }

    /**
     * gets customer by id
     * @param id id
     * @return void
     */
    @GetMapping("/customer/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        return ResponseEntity.ok(adminService.getCustomerById(id));
    }
}

