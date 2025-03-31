package com.example.NewCouponsProject.beans;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDate;

/**
 * Bean class Coupon
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Coupon {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private Category category;
    private String title, description;
    private LocalDate startDate, endDate;
    private int amount;
    private double price;
    private String image;
    @ManyToOne
    @JoinColumn(name = "company_id", nullable = false)
    private Company company;
}
