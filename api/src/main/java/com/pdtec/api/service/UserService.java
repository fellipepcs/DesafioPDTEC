package com.pdtec.api.service;

import com.pdtec.api.entity.User;
import com.pdtec.api.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UserService {

 private UserRepository userRepository;
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    public UserService(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    public String register(User user) {
        if (userRepository.existsByName(user.getName())) {
            throw new RuntimeException("Username already exists");
        }

        String encodedPassword = encodePassword(user.getPassword());
        user.setPassword(encodedPassword);

        try {
            userRepository.save(user);
            return "User registered successfully";
        } catch (Exception e) {
            throw new RuntimeException(e.getMessage());
        }
    }

    private String encodePassword(String password) {
        return bCryptPasswordEncoder.encode(password);
    }

    public String login() {
        return "User logged in";
    }

    public String updateUser() {
        return "User updated";
    }
}
