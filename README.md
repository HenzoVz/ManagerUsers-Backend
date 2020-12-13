# ManagerUsers-Backend

## Backend utilizando as seguintes tecnologias

- Nodejs Express
- Cors
- Typescript
- Typeorm
- Docker Container Postgresql
- JWT Authentication

## Padrão de Arquitetura MVC com Services Layer (Services Pattern)
- Model, interage com o banco de dados e executa ações lógicas para preparar informações.
- View, exibe dados.
- Controller, coleta a entrada do usuário, pede ao modelo os dados solicitados e os envia de volta para a visualização
- O Services Layer, vai ser usado para abstrair a lógica de negócios da camada de Model e criar DTO'S que serão mapeados pelo Controller.
