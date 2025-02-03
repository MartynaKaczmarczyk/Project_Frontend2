// //This file will inject example data when our app starts
// package com.example.Plant_tracker.server;

// import com.example.Plant_tracker.models.User;
// import com.example.Plant_tracker.models.UserPlant;
// import com.example.Plant_tracker.models.Species;
// import org.springframework.stereotype.Service;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;

// import java.time.LocalDateTime;
// import java.util.ArrayList;
// import java.util.List;
// import java.util.HashMap;


// @Service
// public class CreateData {

//     public ArrayList<User> createUsersWithPlants() {

//         Species aloe = new Species(0, "Aloe Vera");
//         Species cactus = new Species(1, "Cactus");

//         UserPlant plant1 = new UserPlant(0, "Aloe Vera Plant", aloe, LocalDateTime.now().minusDays(1),
//                 LocalDateTime.now().minusMonths(3), new ArrayList<>(), new ArrayList<>());
        
//         UserPlant plant2 = new UserPlant(1, "Small Cactus", cactus, LocalDateTime.now().minusDays(3),
//                 LocalDateTime.now().minusMonths(1), new ArrayList<>(), new ArrayList<>());

//         // Creating plants array for user
//         ArrayList<UserPlant> userPlants = new ArrayList<>();
//         userPlants.add(plant1);
//         userPlants.add(plant2);

//         User user = new User(0, "John Doe", "password123", userPlants);

//         // Creating array of users (but there is 1 user now)
//         ArrayList<User> users = new ArrayList<>();
//         users.add(user);
        
//         return users;
//     }
// }
