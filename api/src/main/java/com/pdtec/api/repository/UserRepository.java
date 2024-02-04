package com.pdtec.api.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.pdtec.api.entity.User;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long>{
    Boolean existsByName(String name);
    User findByName(String name);
    Optional<User> findById(Long id);
}
