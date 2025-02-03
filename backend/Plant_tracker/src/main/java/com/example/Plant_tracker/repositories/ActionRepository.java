package com.example.Plant_tracker.repositories;

import com.example.Plant_tracker.models.Action;
import org.springframework.data.jpa.repository.JpaRepository;


public interface ActionRepository extends JpaRepository<Action, Long> {
    
}
