package com.example.NewCouponsProject.repositories;

import com.example.NewCouponsProject.beans.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    // Custom query to find an admin by email
    Admin findByEmail(String email);

    // Custom query to check login credentials
    Admin findByEmailAndPassword(String email, String password);
}
