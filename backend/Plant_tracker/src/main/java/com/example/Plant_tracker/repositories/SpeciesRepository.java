package com.example.Plant_tracker.repositories;

import com.example.Plant_tracker.models.Species;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface SpeciesRepository extends JpaRepository<Species, Long> {
    List<Species> findByNameIn(List<String> names);

    Optional<Species> findByName(String name);
}
