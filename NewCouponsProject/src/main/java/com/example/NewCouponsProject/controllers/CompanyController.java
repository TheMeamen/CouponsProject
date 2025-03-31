package com.example.NewCouponsProject.controllers;

import com.example.NewCouponsProject.DTOs.CouponRequest;
import com.example.NewCouponsProject.DTOs.UpdateCustomerRequest;
import com.example.NewCouponsProject.services.CompanyService;
import com.example.NewCouponsProject.beans.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * CompanyController for companies uses
 */
@RestController
@RequestMapping("/company")
public class CompanyController {

    @Autowired
    private CompanyService companyService;

    /**
     * adds a new coupon under given company
     * @param couponRequest coupon details
     * @return coupon
     */
    @PostMapping("/coupon")
    public ResponseEntity<Void> addCoupon(@RequestBody CouponRequest couponRequest) {
        Company company = companyService.getCompanyDetails(couponRequest.getEmail());
        companyService.addCoupon(company.getId(), couponRequest.getCoupon());
        return ResponseEntity.ok().build();
    }

    /**
     * updates coupon
     * @param email email
     * @param coupon coupon
     * @return void
     */
    @PutMapping("/coupon")
    public ResponseEntity<Void> updateCoupon(@RequestParam String email, @RequestBody Coupon coupon) {
        Company company = companyService.getCompanyDetails(email);
        companyService.updateCoupon(company.getId(), coupon);
        return ResponseEntity.ok().build();
    }

    /**
     * deletes give coupon
     * @param email company's email
     * @param id coupons id
     * @return void
     */
    @DeleteMapping("/coupon/{id}")
    public ResponseEntity<Void> deleteCoupon(@RequestParam String email, @PathVariable Long id) {
        Company company = companyService.getCompanyDetails(email);
        companyService.deleteCoupon(company.getId(), id);
        return ResponseEntity.ok().build();
    }

    /**
     * returns all of the company's coupons as a list
     * @param email email
     * @return list of coupons
     */
    @GetMapping("/coupons")
    public ResponseEntity<List<Coupon>> getCompanyCoupons(@RequestParam String email) {
        Company company = companyService.getCompanyDetails(email);
        return ResponseEntity.ok(companyService.getCompanyCoupons(company.getId()));
    }

    /**
     * retrieves companies details
     * @param id id
     * @return company
     */
    @GetMapping("/{id}")
    public ResponseEntity<Company> getCompanyDetails(@PathVariable Long id) {
        return ResponseEntity.ok(companyService.getCompanyDetails(id));
    }


}

