# Chat Carol

Uma aplicação de chat com funcionalidades adicionais, como busca de imagens de gatos e consulta de CEPs.

## Funcionalidades

- Chat em tempo real usando Socket.io.
- Busca de imagens de gatos usando a API `thecatapi`.
- Consulta de endereços usando a API `viacep`.
- Tela de login para identificar o usuário.
- CRUD para gerenciar usuários com Swagger para documentação.

## Tecnologias Utilizadas

- Node.js
- Express
- Socket.io
- Mongoose
- Swagger
- Materialize CSS para o front-end
- Axios para chamadas de API

## Como Rodar a Aplicação

1. Clone o repositório:
    ```sh
    git clone https://github.com/seu-usuario/chat-carol.git
    ```
2. Navegue até a pasta do projeto:
    ```sh
    cd chat-carol
    ```
3. Instale as dependências:
    ```sh
    npm install
    ```
4. Inicie o servidor:
    ```sh
    npm start
    ```
5. Abra o navegador e acesse:
    ```sh
    http://localhost:3000/frontend/public/login.html
    ```

## Documentação da API

A documentação da API pode ser acessada em:
    ```sh
    http://localhost:3000/api-docs
    ```

## Estrutura do Projeto

```plaintext
chat-carol/
├── backend/
│   ├── app.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── userRoutes.js
│   ├── controllers/
│   │   └── userController.js
│   ├── services/
│   │   └── externalApiService.js
│   ├── swagger/
│   │   └── swagger.json
│   └── config/
│       └── database.js
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   ├── login.html
│   │   └── css/
│   │       └── styles.css
│   └── src/
│       ├── main.js
│       └── chat.js
├── package.json
├── package-lock.json
└── README.md
