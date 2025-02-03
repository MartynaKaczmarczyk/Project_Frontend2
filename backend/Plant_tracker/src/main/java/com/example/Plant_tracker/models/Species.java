package com.example.Plant_tracker.models;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Species {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    private Long id;
    private String name;

    @JsonIgnore
    @OneToMany(mappedBy = "species", cascade = CascadeType.ALL, fetch = FetchType.LAZY) 
    private List<UserPlant> userPlants;  
}
