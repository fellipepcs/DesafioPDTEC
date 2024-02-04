import { api } from "../repositories/api";

export async function login(email: string, senha: string) {
  try {
    const login = await api.post("/user/login", {
      username: email,
      password: senha,
    });
    localStorage.setItem("token", login.data.token);

    return login.data;
  } catch (error: any) {
    if (error.message.includes("400")) {
      return "Usuário ou senha incorretos ou inexistentes. Verifique os dados inseridos e tente novamente.";
    } else if (error.message.includes("500")) {
      return "Erro ao realizar login. Tente novamente mais tarde.";
    } else {
      return "Ocorreu um erro desconhecido. Por favor, tente novamente mais tarde.";
    }
  }
}

// export async function cadastrarUsuario(dadosCadastro: DadosCadastro) {
//   try {
//     const response = await api.post("/user/cadastrar", dadosCadastro);
//     return response.data;
//   } catch (error: any) {
//     if (error.message.includes("422")) {
//       return "Erro ao cadastrar usuário. Verifique os dados inseridos e tente novamente.";
//     } else {
//       return "Erro ao cadastrar usuário. Tente novamente mais tarde.";
//     }
//   }
// }
