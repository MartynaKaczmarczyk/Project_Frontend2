

package com.example.Plant_tracker.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import com.example.Plant_tracker.repositories.AppUserRepository;

import com.example.Plant_tracker.models.AppUser;



import java.util.List;


@RestController
@RequestMapping("/users")
public class AppUserController {

    @Autowired
    AppUserRepository appUserRepository;

    @GetMapping
    public List<AppUser> getUsers() {
        return appUserRepository.findAll();
    }

}
