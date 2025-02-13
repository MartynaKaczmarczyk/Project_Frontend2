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

        // Czyszczenie danych (opcjonalne)
        userPlantRepository.deleteAll();
        speciesRepository.deleteAll();
        appUserRepository.deleteAll();

        // Sprawdzanie, czy użytkownik już istnieje
        if (appUserRepository.findByEmail(userEmail).isPresent()) {
            System.out.println("User already exists. Skipping initialization.");
            return;
        }

        // Tworzenie nowego użytkownika
        AppUser user = new AppUser();
        user.setName("John Doe");
        user.setEmail(userEmail);
        user.setPassword(passwordEncoder.encode("password123"));
        
        // **Najpierw zapisujemy użytkownika do bazy**
        user = appUserRepository.save(user);

        // Tworzenie lub pobranie gatunków roślin
        Species species1 = speciesRepository.findByName("Ficus")
                .orElseGet(() -> speciesRepository.save(new Species("Ficus")));

        Species species2 = speciesRepository.findByName("Cactus")
                .orElseGet(() -> speciesRepository.save(new Species("Cactus")));

        // **Tworzenie roślin, ale zapisywanie ich osobno**
        if (!userPlantRepository.existsByName(plantName1)) {
            UserPlant plant1 = new UserPlant();
            plant1.setName(plantName1);
            plant1.setDescription("A lovely ficus.");
            plant1.setSpecies(species1);
            plant1.setLastWatered(LocalDateTime.now().minusDays(2));
            plant1.setCreated(LocalDateTime.now());
            plant1.setUser(user);  
            
            userPlantRepository.save(plant1); // **Zapisujemy roślinę bezpośrednio**
        }

        if (!userPlantRepository.existsByName(plantName2)) {
            UserPlant plant2 = new UserPlant();
            plant2.setName(plantName2);
            plant2.setDescription("A sturdy cactus.");
            plant2.setSpecies(species2);
            plant2.setLastWatered(LocalDateTime.now().minusWeeks(1));
            plant2.setCreated(LocalDateTime.now());
            plant2.setUser(user);

            userPlantRepository.save(plant2); // **Zapisujemy roślinę bezpośrednio**
        }

        System.out.println("Data initialized: user and plants added.");
    }
}
