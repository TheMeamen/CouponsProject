package com.example.NewCouponsProject.services;

import com.example.NewCouponsProject.DTOs.UpdateCustomerRequest;
import com.example.NewCouponsProject.beans.*;
import com.example.NewCouponsProject.repositories.CouponRepository;
import com.example.NewCouponsProject.repositories.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private CouponRepository couponRepository;

    public boolean login(String email, String password) {
        return customerRepository.findByEmailAndPassword(email, password) != null;
    }

    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    public void purchaseCoupon(Long customerId, Long couponId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
        Coupon coupon = couponRepository.findById(couponId)
                .orElseThrow(() -> new IllegalArgumentException("Coupon not found"));

        // Business logic: Ensure coupon isn't already purchased
        if (customer.getCoupons().contains(coupon)) {
            throw new IllegalStateException("Coupon already purchased");
        }
        customer.getCoupons().add(coupon);
        coupon.setAmount(coupon.getAmount() - 1);
        customerRepository.save(customer);
        couponRepository.save(coupon);
    }

    public List<Coupon> getPurchasedCoupons(Long customerId) {
        Customer customer = customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
        return customer.getCoupons();
    }

    public Customer getCustomerDetails(Long customerId) {
        return customerRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
    }

    public Customer getCustomerDetails(String email) {
        return customerRepository.findByEmail(email);
    }

    public void updateCustomer(Customer customer) {
        customerRepository.save(customer);
    }
}

