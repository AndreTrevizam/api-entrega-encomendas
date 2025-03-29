# API de Entrega de Encomendas

Este projeto é uma API para gerenciar entregas de encomendas, construída com Node.js, Express e Prisma. A API permite criar usuários, gerenciar sessões, registrar entregas, atualizar status de entregas e criar logs de entrega.

## Tecnologias Utilizadas

- **Node.js**: Plataforma de execução JavaScript.
- **Express**: Framework para construção de APIs.
- **Prisma**: ORM para manipulação do banco de dados PostgreSQL.
- **TypeScript**: Superset do JavaScript com tipagem estática.
- **Zod**: Biblioteca para validação de dados.
- **JWT**: Para autenticação baseada em tokens.
- **Bcrypt**: Para hashing de senhas.
- **Jest**: Para testes unitários.
- **Supertest**: Para testes de integração.

## Funcionalidades

### Usuários
- **Criar Usuário**: Endpoint para registrar novos usuários.
- **Validação**: Garante que o e-mail seja único e a senha seja criptografada antes de salvar no banco.

### Sessões
- **Login**: Gera um token JWT para autenticação.
- **Validação**: Verifica e-mails e senhas antes de autenticar.

### Entregas
- **Criar Entrega**: Apenas usuários com o papel `sale` podem criar entregas.
- **Listar Entregas**: Retorna todas as entregas, incluindo informações do usuário associado.
- **Atualizar Status**: Permite atualizar o status de uma entrega e registra um log automaticamente.

### Logs de Entrega
- **Criar Log**: Apenas usuários com o papel `sale` podem criar logs de entrega.
- **Visualizar Logs**: Usuários com o papel `sale` ou `customer` podem visualizar logs de entrega.

## Configuração do Ambiente

Crie um arquivo `.env` baseado no `.env-example`:

DATABASE_URL=<sua_url_do_banco_de_dados> JWT_SECRET=<sua_chave_secreta>

## Como Rodar o Projeto

### Pré-requisitos
- Node.js
- Docker (opcional, para rodar o banco de dados)

### Passos

1. Instale as dependências:
   ```sh
   npm install

2. Suba o banco de dados com Docker:
   ```sh
   docker-compose up -d

3. Execute as migrações:
   ```sh
   npx prisma migrate dev

4. Inicie o servidor:
   ```sh
   npm run dev

# Endpoints
## Usuários

- **POST /users**: Cria um novo usuário.

## Usuários

- **POST /sessions**: Realiza login e retorna um token JWT.

## Entregas

- **POST /deliveries**: Cria uma nova entrega (apenas para usuários com o papel sale).
- **GET /deliveries**: Lista todas as entregas.
- **PATCH /deliveries/:id/status**: Atualiza o status de uma entrega.

## Logs de entregas

- **POST /delivery-logs**: Cria um log de entrega (apenas para usuários com o papel sale).
- **GET /delivery-logs/:delivery_id/show**: Exibe os logs de uma entrega.

