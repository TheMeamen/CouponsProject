package com.example.NewCouponsProject.utils;
import com.example.NewCouponsProject.beans.*;
import com.example.NewCouponsProject.repositories.AdminRepository;
import com.example.NewCouponsProject.repositories.CompanyRepository;
import com.example.NewCouponsProject.repositories.CouponRepository;
import com.example.NewCouponsProject.repositories.CustomerRepository;
import com.example.NewCouponsProject.services.CompanyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

/**
 * Class to initiate a bunch of dummy accounts for testing
 */
@Component
public class DummyInit implements CommandLineRunner {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private CouponRepository couponRepository;

    @Autowired
    private CompanyRepository companyRepository;

    @Autowired
    private CompanyService companyService;

    @Autowired
    private CustomerRepository customerRepository;

    @Override
    public void run(String... args) throws Exception {
        try {
            // Check if the admin account already exists
            if (adminRepository.findByEmail("admin@admin.com") == null) {
                // If not, create it with the default password (encoded)
                Admin admin = new Admin();
                admin.setName("admin");
                admin.setEmail("admin@admin.com");
                admin.setPassword("admin");
                adminRepository.save(admin);
                System.out.println("Admin account created: admin@admin.com");
            } else {
                System.out.println("Admin account already exists.");
            }
            // Check if the admin account already exists
            if (companyRepository.findByEmail("amazon@gmail.com") == null) {
                // If not, create it with the default password (encoded)
                Company amazon = new Company();
                amazon.setEmail("amazon@gmail.com");
                amazon.setName("AMAZON");
                amazon.setPassword("123456");
                companyRepository.save(amazon);
                System.out.println("Amazon account created: amazon@gmail.com");
            } else {
                System.out.println("Amazon account already exists.");
            }
            // Check if the admin account already exists
            if (couponRepository.findByTitle("Dummy Coupon") == null) {
                Company amazon = companyRepository.findByEmail("amazon@gmail.com");
                // If not, create it with the default password (encoded)
                Coupon coupon = new Coupon();
                coupon.setTitle("Dummy Coupon");
                coupon.setAmount(10);
                coupon.setCategory(Category.Food);
                coupon.setCompany(amazon);
                coupon.setImage("https://placehold.co/400");
                coupon.setPrice(20);
                coupon.setDescription("Test");
                coupon.setEndDate(LocalDate.now());
                coupon.setStartDate(LocalDate.now());
                companyService.addCoupon(amazon.getId(), coupon);
                System.out.println("Dummy coupon created.");
            } else {
                System.out.println("Dummy coupon already exists.");
            }
            if (customerRepository.findByEmail("dummy@dummy.com") == null) {
                Customer customer = new Customer();
                customer.setUsername("Roee");
                customer.setPassword("123456");
                customer.setEmail("dummy@dummy.com");
                customerRepository.save(customer);
                System.out.println("Dummy user created.");
            } else {
                System.out.println("Dummy user already exists.");
            }
        } catch (Exception e) {
            System.out.println("Shit hit the fan :" + e);
        }

    }
}
