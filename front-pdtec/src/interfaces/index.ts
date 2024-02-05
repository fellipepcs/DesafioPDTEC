export interface DadosCadastro {
    name: string;
    email: string;
    password: string;
    cpf: string;
    role: string;
}

export interface DadosCep {
    cep: string
    logradouro: string
    complemento: string
    bairro: string
    localidade: string
    uf: string
    ibge: string
    gia: string
    ddd: string
    siafi: string
  }
  
  export interface User {
    name: string
    email: string
    role: string
    cpf: string
  }
  