//Basic CRUD for users

package com.example.Plant_tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Plant_tracker.service.UserPlantManager;
import com.example.Plant_tracker.service.SpeciesManager;

import com.example.Plant_tracker.models.AppUser;
import com.example.Plant_tracker.models.UserPlant;
import com.example.Plant_tracker.models.Species;

import java.util.Optional;
import java.util.List;
import org.springframework.data.domain.Sort;

@RestController
@RequestMapping("/plants")
public class UserPlantsController {


    @Autowired
    UserPlantManager userPlantManager;

    @Autowired
    SpeciesManager speciesManager;

    @GetMapping
    public List<UserPlant> getAllPlants() {
        return userPlantManager.getAllPlants();
    }

    @GetMapping("/allUsersPlants/{userId}")
    public List<UserPlant> getAllUserPlants(@PathVariable Long userId) {
        return userPlantManager.getAllUserPlants(userId);
    }

    @GetMapping("/{plantId}")
    public ResponseEntity<UserPlant> getPlantById(@PathVariable Long plantId) {
        Optional<UserPlant> plant = userPlantManager.getPlantById(plantId);

        if (plant.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                                 .body(null);  
        }

        return ResponseEntity.ok(plant.get());
    }

    //Przykład: http://localhost:8080/plants/filter/123/1,2,3
    @GetMapping("/filter/{userId}/{speciesNames}")
    public List<UserPlant> getFilteredUserPlants(
            @PathVariable Long userId,
            @PathVariable List<String> speciesNames) {
        List<Species> speciesEntities = speciesManager.getSpeciesByName(speciesNames);
        return userPlantManager.getFilteredUserPlantsBySpecies(userId, speciesEntities);
    }

    @GetMapping("/species")
    public List<Species> getSpecies() {
        return speciesManager.getSpecies();
    }

    //Nowa roślinka dla użytkownika
    @PostMapping("/{userId}")
    public ResponseEntity<String> addUserPlant(@PathVariable Long userId, @RequestBody UserPlant newPlant) {
       // Znajdź użytkownika po ID
        if (userPlantManager.addPlantForUser(userId, newPlant)) {
            return ResponseEntity.status(HttpStatus.CREATED).body("Plant added successfully!");
        };
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Plant not created!");
        
    }

    //http://localhost:8080/plants/{userId}/{plantId}
    @DeleteMapping("/{plantId}")
    public ResponseEntity<String> deletePlant(@PathVariable Long plantId){
    System.out.println(plantId + "iddd");
        String response = userPlantManager.deletePlant(plantId);
        if (response.equals("Plant not found")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Plant not found");
        }
        return ResponseEntity.ok("Plant successfully deleted");
    }


    @PutMapping("/{userId}/{plantId}")
    public ResponseEntity<String> updatePlant(
        @PathVariable Long userId,
        @PathVariable Long plantId,
        @RequestBody UserPlant updatedPlantData
        ) {
        String response = userPlantManager.updatePlant(userId, plantId, updatedPlantData);
        if (response.equals("Plant not found")) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Plant not found");
        }
        if (response.equals("You are not authorized to delete this plant")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("You are not authorized to delete this plant");
        }
        return ResponseEntity.ok("Plant updated successfully");
        }

    @GetMapping("/search/{userId}")
    public List<UserPlant> getPlantsByNamePrefix(@PathVariable Long userId, @RequestParam String prefix) {
        return userPlantManager.getPlantsByNameRegex(prefix, userId);
    }

    @GetMapping("/plants/{userId}")
    public List<UserPlant> getSortedUserPlants(
        @PathVariable Long userId,
        @RequestParam(defaultValue = "asc") String sortOrder) {

        Sort sort = Sort.by(Sort.Order.by("lastWatered"));
    if ("desc".equalsIgnoreCase(sortOrder)) {
        sort = sort.descending();
    } else {
        sort = sort.ascending();
    }

    return userPlantManager.getPlantsSortedByUserId(userId, sort);
}
    
    

}

// sortowanie po roślinach wymagających opieki
// kiedy jest niepodlewana od dawwna
// moja roślinka ma sprawdzać, czy ostatnie podlanie było dawniej niż ww tej bazie danych


// HSQLDB
//pobrać hsql ze strony

