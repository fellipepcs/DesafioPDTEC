package com.pdtec.api.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.pdtec.api.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{
}
