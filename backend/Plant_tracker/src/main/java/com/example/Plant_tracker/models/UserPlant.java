package com.example.Plant_tracker.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;

import java.util.List;



@Getter
@Setter
@NoArgsConstructor
@Entity
public class UserPlant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    private Long id;
    private String name; 
    private String description;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    @JsonIgnore
    private AppUser user;

    @ManyToOne 
    @JoinColumn(name = "species_id", referencedColumnName = "id")  
    private Species species;  

    private LocalDateTime lastWatered;
    private LocalDateTime created;

    @OneToMany(mappedBy = "plant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)  
    private List<Event> lastEvents;

    @OneToMany(mappedBy = "plant", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Action> lastActions;

}
