package com.example.NewCouponsProject.repositories;

import com.example.NewCouponsProject.beans.Company;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CompanyRepository extends JpaRepository<Company, Long> {
    // Custom query to find a company by email
    Company findByEmail(String email);

    // Custom query to check login credentials
    Company findByEmailAndPassword(String email, String password);

    // Custom query to search for company by email
    boolean existsByEmail(String email);
}
