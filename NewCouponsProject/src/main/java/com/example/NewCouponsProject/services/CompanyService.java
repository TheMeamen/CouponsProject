package com.example.NewCouponsProject.services;

import com.example.NewCouponsProject.beans.*;
import com.example.NewCouponsProject.repositories.CompanyRepository;
import com.example.NewCouponsProject.repositories.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CompanyService {

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CouponRepository couponRepository;

    public boolean login(String email, String password) {
        return companyRepository.findByEmailAndPassword(email, password) != null;
    }

    @Transactional
    public void addCoupon(Long companyId, Coupon coupon) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("Company not found"));

        company.addCoupon(coupon);
        companyRepository.save(company);
    }

    public void updateCoupon(Long companyId, Coupon coupon) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("Company not found"));

        // Ensure the coupon belongs to the company
        if (coupon.getCompany().getId() != company.getId()) {
            throw new IllegalStateException("Coupon does not belong to this company");
        }

        couponRepository.save(coupon);
    }

    public void deleteCoupon(Long companyId, Long couponId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("Company not found"));

        Coupon coupon = couponRepository.findById(couponId)
                .orElseThrow(() -> new IllegalArgumentException("Coupon not found"));

        // Ensure the coupon belongs to the company
        if (coupon.getCompany().getId() != company.getId()) {
            throw new IllegalStateException("Coupon does not belong to this company");
        }

        couponRepository.delete(coupon);
    }

    public List<Coupon> getCompanyCoupons(Long companyId) {
        return couponRepository.findAllByCompanyId(companyId);
    }

    public Company getCompanyDetails(Long companyId) {
        return companyRepository.findById(companyId)
                .orElseThrow(() -> new IllegalArgumentException("Company not found"));
    }

    public Company getCompanyDetails(String email) {
        return companyRepository.findByEmail(email);
    }

}
