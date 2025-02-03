package com.example.Plant_tracker.repositories;

import com.example.Plant_tracker.models.UserPlant;
import com.example.Plant_tracker.models.Species;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserPlantRepository extends JpaRepository<UserPlant, Long>  {
    
    List<UserPlant> findByUserId(Long userId);

    List<UserPlant> findAllByOrderByCreatedAsc(); 

    List<UserPlant> findAllByOrderByCreatedDesc(); 

    List<UserPlant> findAllByOrderByLastWateredAsc();

    List<UserPlant> findAllByOrderByLastWateredDesc();

    List<UserPlant> findByUserIdAndSpeciesIn(Long userId, List<Species> species);

    boolean existsByName(String name);

    List<UserPlant> findByNameStartingWithIgnoreCaseAndUser_Id(String prefix, Long userId);
}
