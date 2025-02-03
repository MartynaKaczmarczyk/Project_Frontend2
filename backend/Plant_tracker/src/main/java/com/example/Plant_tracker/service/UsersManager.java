package com.example.Plant_tracker.service;

import org.springframework.stereotype.Service;

import com.example.Plant_tracker.repositories.AppUserRepository;
import com.example.Plant_tracker.models.AppUser;

import java.util.List;
public class UsersManager {

    public AppUserRepository appUserRepository;

    public List<AppUser> getAllUsers() {
        return this.appUserRepository.findAll();
    }
    
}
