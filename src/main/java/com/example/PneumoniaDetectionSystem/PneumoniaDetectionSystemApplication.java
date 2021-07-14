package com.example.PneumoniaDetectionSystem;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class PneumoniaDetectionSystemApplication {

	public static void main(String[] args) {
		SpringApplication.run(PneumoniaDetectionSystemApplication.class, args);
	}

}
