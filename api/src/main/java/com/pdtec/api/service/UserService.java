package com.pdtec.api.service;

import com.pdtec.api.DTO.LoginDTO;
import com.pdtec.api.DTO.NewPasswordDTO;
import com.pdtec.api.DTO.UserDTO;
import com.pdtec.api.config.JwtConfig;
import com.pdtec.api.entity.User;
import com.pdtec.api.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

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

    public String login(LoginDTO loginDTO) {
        User user = userRepository.findByName(loginDTO.getName());

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!bCryptPasswordEncoder.matches(loginDTO.getPassword(), user.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        return JwtConfig.generateToken(user.getId());
    }

    public UserDTO getUserFromToken(String token) {
        Long id = JwtConfig.getIdFromToken(token);
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();
        UserDTO userDTO = new UserDTO();
        userDTO.setName(user.getName());
        userDTO.setEmail(user.getEmail());
        userDTO.setRole(user.getRole());
        userDTO.setCpf(user.getCpf());

        return userDTO;
    }

    public User updateUser(String token, User updatedUser) {
        Long id = JwtConfig.getIdFromToken(token);
        Optional<User> optionalUser = userRepository.findById(id);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("User not found");
        }

        User user = optionalUser.get();
        user.setName(updatedUser.getName());
        user.setEmail(updatedUser.getEmail());
        user.setCpf(updatedUser.getCpf());
        user.setRole(updatedUser.getRole());

        return userRepository.save(user);
    }

    public String deleteUser(String token) {
        Long id = JwtConfig.getIdFromToken(token);
        System.out.println(id);
        userRepository.deleteById(id);
        return "Usuario deletado com sucesso";
    }
}
