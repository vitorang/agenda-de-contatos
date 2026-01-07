# Agenda de contatos

Projeto para fins de estudo com cadastro e autenticação de usuários, CRUD de contatos e consulta de API externa [ViaCEP](https://viacep.com.br). Na pasta **docs** há capturas de telas.

As tecnologias usada são:
1. **ASP.NET**
2. **MongoDB**
3. **React.js** com [MUI - Material UI](https://mui.com/material-ui/getting-started/)
4. **Angular 20** com [Angular Material](https://material.angular.dev)
5. **Docker**
6. **JWT**
7. **Nginx**
8. **Swagger**
9. **xUnit**
10. **Testcontainers**
11. **Jasmine**


## Execução do projeto
Para executar é necessário ter o **Docker Desktop**. Entre no diretório do projeto, execute o comando `docker compose up -d --build` e o servidor será iniciado na porta 80. Para interromper, use o comando `docker compose down`.


O site é acessível nas seguintes URLs:
- `http://localhost` - redireciona para o front-end React
- `http://localhost/react` - front-end React
- `http://localhost/angular` - front-end Angular
- `http://localhost/api/swagger` - documentação Swagger


## Progresso da implementação

- ✓ API em ASP.NET
- ✓ Front-end Angular
- ✓ Front-end React
- ✓ Integração com API externa ViaCEP
- ✓ Testes unitários do ASP.NET com xUnit
- ✓ Testes de integração do ASP.NET com xUnit e Testcontainers 
- Testes unitários do Angular com Jasmine
