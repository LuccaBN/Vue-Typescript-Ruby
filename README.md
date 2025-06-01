
# 💼 Vue + TypeScript + Ruby on Rails – Projeto Fullstack

Este projeto é um sistema completo de gestão bancária com frontend em **Vue 3 + TypeScript** e backend em **Ruby on Rails**, conectados por meio de uma API RESTful.

---

## 📂 Estrutura do Projeto

```
VuejsTypeScript/
│
├── Frontend/
│   └── project/  ← Aplicação Vue 3 + TypeScript (Vuetify)
│
├── Backend/
│   └── api-rails-sagat-ai-test/  ← API Rails com autenticação e gestão de contas
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js 18+
- Yarn ou NPM
- Ruby 3.x
- Rails 7+
- PostgreSQL ou SQLite
- Docker (opcional)

### 1. Backend (Rails)

```bash
cd Backend/api-rails-sagat-ai-test
bundle install
rails db:create db:migrate db:seed
rails s
```

A API estará rodando em `http://localhost:3000`.

### 2. Frontend (Vue)

```bash
cd Frontend/project
npm install
npm run serve
```

A aplicação Vue estará disponível em `http://localhost:8080`.

---

## ✅ Funcionalidades Implementadas

### Frontend

- Tela de login e cadastro com validação
- Autenticação com token JWT
- Dashboard com contas bancárias do usuário
- Transferência entre contas
- Listagem de movimentações
- Criação de novas contas

### Backend

- Autenticação de usuários (`/auth/sign_in`, `/auth/sign_up`)
- Gerenciamento de contas bancárias
- Endpoint para transferência entre contas
- Restrições e validações no modelo de transação

---

## 📡 Endpoints Utilizados

| Método | Endpoint                         | Descrição                            |
|--------|----------------------------------|----------------------------------------|
| POST   | `/auth/sign_in`                  | Login de usuário                       |
| POST   | `/auth/sign_up`                  | Cadastro de usuário                    |
| GET    | `/users/infos`                   | Busca dados do usuário logado         |
| GET    | `/users/bank_accounts/my`        | Contas bancárias do usuário           |
| GET    | `/users/bank_accounts`           | Todas as contas cadastradas           |
| POST   | `/users/bank_account_transfers`  | Realiza transferência entre contas    |

---

## 🛠️ O que faria diferente com mais tempo

- Criaria testes automatizados (unitários e e2e)
- Implementaria validações mais robustas no frontend
- Melhoraria o layout responsivo para mobile
- Adicionaria loading spinners nas requisições
- Usaria Vuex ou Pinia para melhor gerenciamento de estado
- Refatoraria o backend com serializers (como ActiveModel::Serializer ou Fast JSON API)

---

## 📸 Imagens das Telas (opcional)

Você pode adicionar imagens com:

```md
![Login](./prints/login.png)
![Dashboard](./prints/dashboard.png)
```

---

## 🧑‍💻 Desenvolvido por

**LuccaBN**  
🔗 https://github.com/LuccaBN/Vue-Typescript-Ruby
