package com.example.Plant_tracker.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.example.Plant_tracker.repositories.AppUserRepository;
import com.example.Plant_tracker.models.AppUser;
import java.util.Optional;
import lombok.NoArgsConstructor;
import java.util.List;

@NoArgsConstructor
@Service
public class UsersManager {

    public AppUserRepository appUserRepository;

    @Autowired
    public UsersManager(AppUserRepository appUserRepository) {
        this.appUserRepository = appUserRepository;
    }

    public List<AppUser> getAllUsers() {
        return this.appUserRepository.findAll();
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Optional<AppUser> getUserByEmailAndPassword(String email, String password) {
        Optional<AppUser> appUser = appUserRepository.findByEmail(email);

        if (appUser.isPresent()) {
            AppUser user = appUser.get();
            if (passwordEncoder.matches(password, user.getPassword())) {
                return Optional.of(user);  
            }
        }

        return Optional.empty();  
    }
    
}
