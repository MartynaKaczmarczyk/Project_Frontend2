package com.example.Plant_tracker.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class Action {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  
    private Long idAction;
    private String type;
    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "plant_id", referencedColumnName = "id")  
    private UserPlant plant;  
}
