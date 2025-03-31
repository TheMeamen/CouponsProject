package com.example.NewCouponsProject.repositories;

import com.example.NewCouponsProject.beans.Customer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Long> {
    // Custom query to find a customer by email
    Customer findByEmail(String email);

    // Custom query to check login credentials
    Customer findByEmailAndPassword(String email, String password);

    // Custom query to search a customer by email
    boolean existsByEmail(String email);
}
