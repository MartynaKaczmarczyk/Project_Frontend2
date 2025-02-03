package com.example.Plant_tracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import com.example.Plant_tracker.server.CreateDataSql; 



@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.example.Plant_tracker.repositories")
public class PlantTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(PlantTrackerApplication.class, args);
	}



}
