package com.example.Plant_tracker.service;

import org.springframework.stereotype.Service;

import com.example.Plant_tracker.repositories.SpeciesRepository;
import com.example.Plant_tracker.models.Species;

import java.util.List;

@Service
public class SpeciesManager {

    SpeciesRepository speciesRepository;

    public SpeciesManager(SpeciesRepository speciesRepository) {
        this.speciesRepository = speciesRepository;
    }

    public List<Species> getSpecies() {
        return this.speciesRepository.findAll();
    }

    public List<Species> getSpeciesByName(List<String> speciesNames) {
        return this.speciesRepository.findByNameIn(speciesNames);
    }


    
}
