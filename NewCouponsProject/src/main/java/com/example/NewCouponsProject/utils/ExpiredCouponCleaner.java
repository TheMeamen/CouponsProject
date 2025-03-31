package com.example.NewCouponsProject.utils;

import com.example.NewCouponsProject.beans.Coupon;
import com.example.NewCouponsProject.repositories.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import java.time.LocalDate;
import java.util.List;


/**
 * removes expired coupons
 */
@Component
public class ExpiredCouponCleaner {

    @Autowired
    private CouponRepository couponRepository;

    @Scheduled(cron = "0 0 0 * * ?") // Runs daily at midnight
    public void deleteExpiredCoupons() {
        LocalDate today = LocalDate.now();

        List<Coupon> expiredCoupons = couponRepository.findAllByEndDateBefore(today);
        if (!expiredCoupons.isEmpty()) {
            couponRepository.deleteAll(expiredCoupons);
            System.out.println("Deleted " + expiredCoupons.size() + " expired coupons.");
        } else {
            System.out.println("No expired coupons found to delete.");
        }
    }
}

