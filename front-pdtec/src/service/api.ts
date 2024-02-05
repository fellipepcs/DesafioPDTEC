import axios from "axios";
import { DadosCadastro } from "../interfaces";
import { api } from "../repositories/api";

export async function login(name: string, passworc: string) {
  try {
    const login = await api.post("/user/login", {
      name: name,
      password: passworc,
    });
    localStorage.setItem("token", login.data.token);

    return login.data;
  } catch (error: any) {
    console.log(error);
    if (error.message.includes("404")) {
      return "Usuário ou senha incorretos ou inexistentes. Verifique os dados inseridos e tente novamente.";
    } else if (error.message.includes("500")) {
      return "Erro ao realizar login. Tente novamente mais tarde.";
    } else {
      return "Ocorreu um erro desconhecido. Por favor, tente novamente mais tarde.";
    }
  }
}

export async function cadastrarUsuario(dadosCadastro: DadosCadastro) {
  try {
    const response = await api.post("/user/register", dadosCadastro);
    return response.data;
  } catch (error: any) {
    if (error.message.includes("404")) {
      return "Erro ao cadastrar usuário. Nome de usuário já cadastrado.";
    }
    return "Erro ao cadastrar usuário."
  }
}

export async function getUsuario() {
  try {
    const response = await api.get("/user/");
    return response.data;
  } catch (error: any) {
    return "Erro ao buscar usuário.";
  }
}

export async function consultarCep(cep: string) {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
    return response.data;
  } catch (error) {
    return { erro: "Erro ao consultar CEP." };
  }
}

export async function editarUsuario(dadosCadastro: any) {
  try {
    const response = await api.put("/user/update/", dadosCadastro);
    return response.data;
  } catch (error: any) {
    return "Erro ao editar usuário.";
  }
}

export async function deletarUsuario() {
  try {
    const response = await api.delete("/user/delete/");
    return response.data;
  } catch (error: any) {
    return "Erro ao deletar usuário.";
  }
}

