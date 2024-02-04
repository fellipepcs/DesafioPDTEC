package com.pdtec.api.controller;

import com.pdtec.api.DTO.LoginDTO;
import com.pdtec.api.DTO.NewPasswordDTO;
import com.pdtec.api.DTO.UserDTO;
import com.pdtec.api.entity.User;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.pdtec.api.service.UserService;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/register")
    public ResponseEntity<Object> register (@RequestBody User user){
        try {
            String message = userService.register(user);
            return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"" + message + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Object> login (@RequestBody LoginDTO loginDTO){
        try {
            String message = userService.login(loginDTO);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("{\"token\": \"" + message + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @GetMapping("/")
    public ResponseEntity<UserDTO> getUser(@RequestHeader("Authorization") String header) {
        try {
            UserDTO userDTO = userService.getUserFromToken(header);
            if (userDTO != null) {
                return ResponseEntity.status(HttpStatus.OK).body(userDTO);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/update")
    public ResponseEntity<Object> updateUser(@RequestHeader("Authorization") String header, @RequestBody User user) {
        try {
            User message = userService.updateUser(header, user);
            return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"" + message + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @DeleteMapping("/delete")
    public ResponseEntity<Object> deleteUser(@RequestHeader("Authorization") String header) {
        try {
            String message = userService.deleteUser(header);
            return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"" + message + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

    @PutMapping("/reset-password")
    public ResponseEntity<Object> resetPassword(@RequestHeader("Authorization") String header,
                                                @RequestBody NewPasswordDTO newPassword) {
        try {
            String message = userService.resetPassword(header, newPassword);
            return ResponseEntity.status(HttpStatus.OK).body("{\"message\": \"" + message + "\"}");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("{\"error\": \"" + e.getMessage() + "\"}");
        }
    }

 }
