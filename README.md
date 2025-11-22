# Agenda de contatos

Projeto para fins de estudo com cadastro e autenticação de usuários, CRUD de contatos e consulta de API externa [ViaCEP](https://viacep.com.br). Ele usa as tecnologias:
1. **ASP.NET**
2. **MongoDB**
3. **React.js** com [MUI - Material UI](https://mui.com/material-ui/getting-started/)
4. **Angular 20** com [Angular Material](https://material.angular.dev)
5. **Docker**
6. **JWT**
7. **Nginx** para arquivos estáticos e redirecionamento
8. **Swagger**
9. **xUnit** para testes unitários do ASP.NET
10. **Jasmine** para testes unitários do Angular


## Execução do projeto
Para executar é necessário ter o **Docker Desktop**. Entre no diretório do projeto, execute o comando `docker compose up -d --build` e o servidor será iniciado na porta 80. Para parar, use o comando `docker compose down`.


O site é acessível nas seguintes URLs:
- `http://localhost` - redireciona para o front-end React
- `http://localhost/react` - front-end React
- `http://localhost/angular` - front-end Angular
- `http://localhost/api/swagger` - documentação Swagger


## Progresso da implementação

### Concluído
- API em ASP.NET
- Front-end Angular
- Front-end React
- Pesquisa com API externa ViaCEP

### Em andamento
- Testes unitários do ASP.NET com xUnit
- Testes unitários do Angular com Jasmine

### Planejado
- Testes unitários do React com Jest


## Imagens do projeto (Angular)
### Login
![Login](docs/angular-login.jpg)

### Lista de contatos
![Lista de contatos](docs/angular-listagem.jpg)

### Cadastro de contato
![Cadastro de contato](docs/angular-cadastro.jpg)

### Pesquisa por CEP
![Pesquisa por CEP](docs/angular-cep.jpg)


## Imagens do projeto (React)
### Login
![Login](docs/react-login.jpg)

### Lista de contatos
![Lista de contatos](docs/react-listagem.jpg)

### Cadastro de contato
![Cadastro de contato](docs/react-cadastro.jpg)

### Pesquisa por CEP
![Pesquisa por CEP](docs/react-cep.jpg)


## Documentação da API (Swagger)
![Documentação da API](docs/swagger.jpg)