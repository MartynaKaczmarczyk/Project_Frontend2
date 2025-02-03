package com.example.Plant_tracker.models;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.ArrayList;


@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AppUser implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String password;
    private String email;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<UserPlant> userPlants = new ArrayList<>(); 

    // Implementacja metod z interfejsu UserDetails
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(); // Brak ról lub autoryzacji w tym przykładzie
    }

    @Override
    public String getPassword() {
        return password; // Zwraca hasło
    }

    @Override
    public String getUsername() {
        return email; // Zwraca email jako nazwę użytkownika
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; // Konto jest zawsze aktywne
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; // Konto nigdy nie jest zablokowane
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; // Dane logowania nigdy nie wygasają
    }

    @Override
    public boolean isEnabled() {
        return true; // Konto jest aktywne
    }
}
