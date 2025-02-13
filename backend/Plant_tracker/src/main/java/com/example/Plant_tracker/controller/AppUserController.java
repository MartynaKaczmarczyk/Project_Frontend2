

package com.example.Plant_tracker.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.example.Plant_tracker.repositories.AppUserRepository;
import com.example.Plant_tracker.service.UsersManager;

import java.util.Base64;
import com.example.Plant_tracker.models.AppUser;
import java.util.Optional;



import java.util.List;


@RestController
@RequestMapping("/users")
public class AppUserController {

    @Autowired
    AppUserRepository appUserRepository;

    @Autowired
    UsersManager manager;

    @GetMapping
    public List<AppUser> getUsers() {
        return appUserRepository.findAll();
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestHeader("Authorization") String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Basic ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
        }

        String decoded = new String(Base64.getDecoder().decode(authHeader.substring(6)));
        String[] credentials = decoded.split(":");

        String username = credentials[0];
        String password = credentials[1];

        Optional<AppUser> user = manager.getUserByEmailAndPassword(username, password);

        if (user.isPresent()) {
            Long id = user.get().getId();  
            return ResponseEntity.ok(id);  
        } else {
            return ResponseEntity.status(401).body("Invalid credentials");
        }
    }

}
