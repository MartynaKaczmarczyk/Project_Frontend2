package com.example.Plant_tracker.repositories;

import com.example.Plant_tracker.models.UserPlant;
import com.example.Plant_tracker.models.Species;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserPlantRepository extends JpaRepository<UserPlant, Long>  {
    
    List<UserPlant> findByUserId(Long userId);

    List<UserPlant> findAllByOrderByCreatedAsc(); 

    List<UserPlant> findAllByOrderByCreatedDesc(); 

    List<UserPlant> findAllByOrderByLastWateredAsc();

    List<UserPlant> findAllByOrderByLastWateredDesc();

    List<UserPlant> findByUserIdAndSpeciesIn(Long userId, List<Species> species);

    boolean existsByName(String name);

    // List<UserPlant> findByNameStartingWithIgnoreCaseAndUser_Id(String prefix, Long userId);

    // @Query("SELECT u FROM UserPlant u WHERE LOWER(u.name) LIKE LOWER(CONCAT(:prefix, '%')) AND u.user.id = :userId")
    // List<UserPlant> searchPlants(@Param("prefix") String prefix, @Param("userId") Long userId);
    List<UserPlant> findByNameContainingIgnoreCaseAndUser_Id(String name, Long userId);

}
