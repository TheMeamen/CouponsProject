package com.example.NewCouponsProject.repositories;
import java.time.LocalDate;
import java.util.List;

import com.example.NewCouponsProject.beans.Admin;
import com.example.NewCouponsProject.beans.Category;
import com.example.NewCouponsProject.beans.Coupon;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CouponRepository extends JpaRepository<Coupon, Long> {
    // Find all coupons by a specific company
    List<Coupon> findAllByCompanyId(Long companyId);

    // Find all coupons by category
    List<Coupon> findByCategory(Category category);

    // Find all coupons by price less than or equal to a specified value
    List<Coupon> findByPriceLessThanEqual(double maxPrice);

    // Find all coupons by company and category
    List<Coupon> findByCompanyIdAndCategory(Long companyId, Category category);

    // Find all coupons by company and price less than or equal to a specified value
    List<Coupon> findByCompanyIdAndPriceLessThanEqual(Long companyId, double maxPrice);

    // Custom query example: Find all active coupons (assuming Coupon has an expiration date field)
    List<Coupon> findByEndDateAfter(java.time.LocalDate currentDate);

    // Used by cleaner
    List<Coupon> findAllByEndDateBefore(LocalDate today);

    // Returns coupon by title
    Coupon findByTitle(String title);

    boolean existsByTitle(String title);
}
