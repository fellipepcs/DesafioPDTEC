package com.pdtec.api.DTO;

import lombok.Getter;

@Getter
public class UserDTO {
    private String name;
    private String email;
    private String role;
    private String cpf;

    public void setRole(String role) {
        this.role = role;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
