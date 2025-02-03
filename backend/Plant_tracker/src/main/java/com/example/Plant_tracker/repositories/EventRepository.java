package com.example.Plant_tracker.repositories;

import com.example.Plant_tracker.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long>{
    
}
