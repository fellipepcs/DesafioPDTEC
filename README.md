# Desafio PDTEC

Este repositório contém o código-fonte desenvolvido como parte do Desafio PDTEC. O projeto utiliza React no frontend e Java com Spring no backend, com a versão Java 17.

## Funcionalidades:

- Autenticação JWT: Implementação de autenticação JSON Web Token (JWT) para a segurança da aplicação.
- CRUD de Usuário: Desenvolvimento das operações CRUD (Create, Read, Update, Delete) para gerenciar usuários.
- Consumo de uma API externa para consulta de CEP.

## Como executar o projeto:

1. Clone este repositório:

```bash
    git clone https://github.com/fellipepcs/DesafioPDTEC.git
```

2. Executar o docker

(Lembre-se de ter o Docker e o Docker Compose instalado em sua máquina)

```bash
    docker-compose up --build
```
Após executar já estará rodando o banco PostgreSQL na porta 5433.
E o Frontend na rota '''[http://localhost:3000/](http://localhost:3000/)'''

3 - Para rodar o backend, como o serviço está separado você deve acessar.

```bash
    cd api/
```
4 - Execute os seguintes comandos:
```bash
    ./gradlew build
```
```bash
    ./gradlew bootRun
```

Ou se preferir vá até a classe ApiAplication e execute com o auxilio de sua IDE.

Após isso, você já terá acesso ao backend na porta 8080.

E poderá desfrutar da página do desafio realizando requisições.

## Desenvolvido por:

|                                                  **Foto**                                                    |        **Nome**         |
| :---------------------------------------------------------------------------------------------------------: | :---------------------: |
|     <img src="https://avatars.githubusercontent.com/u/72713931?v=4" width="100px;" alt="Foto Fellipe"/>     |  Fellipe Pereira da Costa Silva  |
