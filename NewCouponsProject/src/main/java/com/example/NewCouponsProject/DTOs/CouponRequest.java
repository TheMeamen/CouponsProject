package com.example.NewCouponsProject.DTOs;

import com.example.NewCouponsProject.beans.Coupon;
import lombok.Getter;
import lombok.Setter;

/**
 * class used in coupon update requests
 */
@Setter
@Getter
public class CouponRequest {
    private String email;
    private Coupon coupon;
}
