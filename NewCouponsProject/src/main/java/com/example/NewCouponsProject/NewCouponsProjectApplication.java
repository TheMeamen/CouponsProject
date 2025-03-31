package com.example.NewCouponsProject;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

/**
 * start the application here, please read the readme beforehand.
 */
@SpringBootApplication
@EnableScheduling
public class NewCouponsProjectApplication {
	public static void main(String[] args) {
		SpringApplication.run(NewCouponsProjectApplication.class, args);
	}
}

