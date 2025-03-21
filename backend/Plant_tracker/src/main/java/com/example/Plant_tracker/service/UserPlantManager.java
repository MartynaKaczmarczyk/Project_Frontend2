package com.example.Plant_tracker.service;

import org.springframework.stereotype.Service;

import com.example.Plant_tracker.repositories.UserPlantRepository;
import com.example.Plant_tracker.models.UserPlant;
import com.example.Plant_tracker.models.Species;
import com.example.Plant_tracker.models.AppUser;
import com.example.Plant_tracker.models.Event;
import com.example.Plant_tracker.repositories.SpeciesRepository;
import com.example.Plant_tracker.repositories.AppUserRepository;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Optional;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import org.springframework.data.domain.Sort;


@NoArgsConstructor
@Service
public class UserPlantManager {
    
    UserPlantRepository userPlantRepository;
    AppUserRepository appUserRepository;
    SpeciesRepository speciesRepository;

    @Autowired
    public UserPlantManager(UserPlantRepository userPlantRepository, AppUserRepository appUserRepository, SpeciesRepository speciesRepository) {
        this.userPlantRepository = userPlantRepository;
        this.appUserRepository = appUserRepository;
        this.speciesRepository = speciesRepository;
    }


    public Optional<UserPlant> getPlantById(Long id) {
        return this.userPlantRepository.findById(id);
    }
    //zwraca WSZYSTKIE rośliny
    public List<UserPlant> getAllPlants() {
        return this.userPlantRepository.findAll();
    }

    //zwraca rośliny danego użytkownika
    public List<UserPlant> getAllUserPlants(Long userId) {
        return this.userPlantRepository.findByUserId(userId);
    }

    //filtrowanie roślinek danego użytkownika po wszystkich wymienionych species
    public List<UserPlant> getFilteredUserPlantsBySpecies(Long userId, List<Species> filters) {
        return this.userPlantRepository.findByUserIdAndSpeciesIn(userId, filters);
        }

    //dodanie roślinki
    public boolean addPlantForUser(Long userId, UserPlant newPlant) {
        AppUser user = appUserRepository.findById(userId)
            .orElseThrow(() -> new RuntimeException("User not found"));
        System.out.println(newPlant);

        if (userPlantRepository.existsByNameAndUserId(newPlant.getName(), userId)) {
            return false; // Roślina już istnieje – nie zapisujemy duplikatu
        }
        // Sprawdź, czy gatunek rośliny istnieje
        Species species = speciesRepository.findByName(newPlant.getSpecies().getName())
            .orElseThrow(() -> new RuntimeException("Species not found"));
            if (user != null && species != null) {            
                newPlant.setSpecies(species);
                newPlant.setUser(user);
                newPlant.setCreated(LocalDateTime.now());
            List<Event> newEvents = newPlant.getLastEvents();
            System.out.println(newPlant.getLastEvents());
            System.out.println(newPlant.getId());
            List<Event> eventsToAdd = new ArrayList<>(newEvents);
        
            // Dodaj każde zdarzenie do listy rośliny
            for (Event newEvent : eventsToAdd) {
                newEvent.setPlant(newPlant); 
                newPlant.getLastEvents().add(newEvent);  
            }
                newPlant.setLastEvents(eventsToAdd);
                userPlantRepository.save(newPlant);  
                
            // if (userPlantRepository.existsByNameAndUserId(newPlant.getName(), userId)) {
            //         return true;
            //     }
                // Dodaj roślinę do listy roślin użytkownika
                // user.getUserPlants().add(newPlant);
                // appUserRepository.save(user);

                
            return true;
        } 
        return false;
    }
    
    //usuwanie roślinki
    public String deletePlant(Long plantId) {
        Optional<UserPlant> optionalPlant = userPlantRepository.findById(plantId);
        if (optionalPlant.isEmpty()) {
            return "Plant not found";
        }

        UserPlant plant = optionalPlant.get();
        // //Walidacja, czy roślinka należy do usera
        // if (!plant.getUser().getId().equals(userId)) {
        //     return "You are not authorized to delete this plant";
        // }

        userPlantRepository.delete(plant);
        return "Plant successfully deleted";
    }

    public String updatePlant(Long userId, Long plantId, UserPlant updatedPlantData) {
        Optional<UserPlant> optionalPlant = userPlantRepository.findById(plantId);
        if (optionalPlant.isEmpty()) {
            return "Plant not found";
        }
        UserPlant plant = optionalPlant.get();

        // Weryfikacja, czy roślinka należy do użytkownika
        if (!plant.getUser().getId().equals(userId)) {
            return "You are not authorized to update this plant";
        }

        // Aktualizacja pól roślinki
        Optional.ofNullable(updatedPlantData.getName())
        //Taki zapis skraca labmbdę .ifPresent(name -> plant.setName(name));
            .ifPresent(plant::setName);

        Optional.ofNullable(updatedPlantData.getDescription())
            .ifPresent(plant::setDescription);

        Optional.ofNullable(updatedPlantData.getLastWatered())
            .ifPresent(plant::setLastWatered);

        Optional.ofNullable(updatedPlantData.getSpecies())
            .ifPresent(plant::setSpecies);

            Optional.ofNullable(updatedPlantData.getLastEvents())
            .ifPresent(newEvents -> {
                List<Event> eventsToAdd = new ArrayList<>(newEvents);
        
                // Dodaj każde zdarzenie do listy rośliny
                for (Event newEvent : eventsToAdd) {
                    newEvent.setPlant(plant);  // Ustawiamy roślinę dla zdarzenia
                    plant.getLastEvents().add(newEvent);  // Dodajemy zdarzenie do listy rośliny
                }
                plant.setLastEvents(eventsToAdd);  // Ustawiamy nową listę zdarzeń
            });

        userPlantRepository.save(plant);
        return "Plant updated successfully";
    }

    public List<UserPlant> getPlantsByNameRegex(String prefix, Long userId) {
        System.out.println("FFFF"+prefix+"FFFF"+ userId);
        System.out.println("FFFF"+userPlantRepository.findByNameContainingIgnoreCaseAndUser_Id(prefix, userId)+"FFFF");

        return userPlantRepository.findByNameContainingIgnoreCaseAndUser_Id(prefix, userId);
    }

    public List<UserPlant> getPlantsSortedByUserId(Long userId, Sort sort) {
        return userPlantRepository.findByUserId(userId, sort);
    }

    
    // public Species add(Species species) {
    //     return this.speciesRepository.save(species);
    // }


    //logowanie
    //sotowanie od daty dodania i od ostatniej daty podlania (porównianie z prawdziwymi danymi)
    //pole status
    //edycja rośliny nazwy i opis i gatunek wszystkiego
    //dodanie podlania z tej chwili teraz
    //podalanie wcześniejsze, gdzie można wybrać datę
    //dodanie gatunku
    //get 1 roślina by zwracała posortowane dane wg daty listy actions i events


}
