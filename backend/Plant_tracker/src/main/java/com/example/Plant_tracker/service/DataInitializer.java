package com.example.Plant_tracker.service;

import org.springframework.stereotype.Component;

import com.example.Plant_tracker.repositories.UserPlantRepository;
import com.example.Plant_tracker.repositories.AppUserRepository;
import com.example.Plant_tracker.repositories.SpeciesRepository;

import com.example.Plant_tracker.models.UserPlant;
import com.example.Plant_tracker.models.Species;
import com.example.Plant_tracker.models.AppUser;

import org.springframework.boot.CommandLineRunner;
import org.springframework.beans.factory.annotation.Autowired;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;


@Component
public class DataInitializer implements CommandLineRunner {

    private final AppUserRepository appUserRepository;
    private final SpeciesRepository speciesRepository;
    private final UserPlantRepository userPlantRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    public DataInitializer(AppUserRepository appUserRepository, 
                           SpeciesRepository speciesRepository, 
                           UserPlantRepository userPlantRepository) {
        this.appUserRepository = appUserRepository;
        this.speciesRepository = speciesRepository;
        this.userPlantRepository = userPlantRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        String userEmail = "john.doe@example.com";
        String plantName1 = "Ficus Benjamin";
        String plantName2 = "Desert Cactus";

        appUserRepository.deleteAll();   
        speciesRepository.deleteAll();   
        userPlantRepository.deleteAll(); 

        // Sprawdzanie, czy użytkownik już istnieje
        Optional<AppUser> existingUser = appUserRepository.findByEmail(userEmail);
        if (existingUser.isPresent()) {
            System.out.println("User with email " + userEmail + " already exists. Skipping creation.");
            return;
        }

        // Tworzenie nowego użytkownika
        AppUser user = new AppUser();
        user.setName("John Doe");
        user.setEmail(userEmail);
        user.setPassword("password123"); // W rzeczywistości hasła powinny być hashowane!

        // Przygotowanie gatunków roślin
        Species species1 = speciesRepository.findByName("Ficus")
                .orElseGet(() -> {
                    Species newSpecies = new Species();
                    newSpecies.setName("Ficus");
                    return speciesRepository.save(newSpecies);
                });

        Species species2 = speciesRepository.findByName("Cactus")
                .orElseGet(() -> {
                    Species newSpecies = new Species();
                    newSpecies.setName("Cactus");
                    return speciesRepository.save(newSpecies);
                });

        // Sprawdzanie i tworzenie roślin
        if (userPlantRepository.existsByName(plantName1)) {
            System.out.println("Plant with name " + plantName1 + " already exists. Skipping creation.");
        } else {
            UserPlant plant1 = new UserPlant();
            plant1.setName(plantName1);
            plant1.setDescription("A lovely ficus.");
            plant1.setSpecies(species1);
            plant1.setLastWatered(LocalDateTime.now().minusDays(2));
            plant1.setCreated(LocalDateTime.now());
            plant1.setUser(user); 
            user.getUserPlants().add(plant1);
        }

        if (userPlantRepository.existsByName(plantName2)) {
            System.out.println("Plant with name " + plantName2 + " already exists. Skipping creation.");
        } else {
            UserPlant plant2 = new UserPlant();
            plant2.setName(plantName2);
            plant2.setDescription("A sturdy cactus.");
            plant2.setSpecies(species2);
            plant2.setLastWatered(LocalDateTime.now().minusWeeks(1));
            plant2.setCreated(LocalDateTime.now());
            plant2.setUser(user); 
            user.getUserPlants().add(plant2);
        }
        
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Zapis użytkownika wraz z roślinami do bazy danych
        appUserRepository.save(user);

        System.out.println("Data initialized: user and plants added.");
    }
}
