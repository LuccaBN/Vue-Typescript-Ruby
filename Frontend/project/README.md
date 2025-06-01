# 💳 Vue + TypeScript + API Ruby | Banco Digital

Este projeto simula um sistema bancário simples com autenticação, cadastro de usuários, painel de contas, extrato de transações e transferência entre contas. Desenvolvido com **Vue 3 + TypeScript** e **Vuetify** no frontend, e **Ruby on Rails** na API backend.

## 🚀 Como rodar o projeto

### 1. Clone o repositório

```bash
git clone https://github.com/LuccaBN/Vue-Typescript-Ruby.git
cd Vue-Typescript-Ruby
```

### 2. Instale as dependências

#### Frontend

```bash
cd Frontend/project
npm install
```

#### Backend

```bash
cd ../../Backend/api-rails-sagat-ai-test
bundle install
```

### 3. Rode os servidores

#### Frontend

```bash
npm run serve
```

#### Backend

```bash
rails db:create db:migrate db:seed
rails server
```

---

## ✨ Funcionalidades Implementadas

- ✅ Tela de Login com autenticação
- ✅ Tela de Cadastro com auto-login
- ✅ Painel do usuário com:
  - Nome do titular
  - Número da conta
  - Saldo disponível
  - Últimas 3 transações
- ✅ Transferência entre contas
- ✅ Listagem completa de transações com filtros:
  - Tipo (Enviadas / Recebidas)
  - Intervalo de datas
  - Valor mínimo/máximo

---

## 🔗 Endpoints da API utilizados

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `POST` | `/auth/sign_up` | Cadastro de usuário |
| `PUT`  | `/auth/sign_in` | Login do usuário |
| `GET`  | `/users/infos` | Dados do usuário autenticado |
| `GET`  | `/users/bank_accounts/my` | Contas do usuário atual |
| `GET`  | `/users/bank_accounts` | Todas as contas (para transferências) |
| `POST` | `/users/bank_account_transfers` | Realiza uma transferência |
| `GET`  | `/users/bank_account_transfers` | Lista de transações do usuário |

---

## 🖼️ Prints das Telas (opcional)

> _(inserir prints ou GIFs aqui caso deseje, como imagens da tela de login, painel de contas, etc.)_

---

## 🔍 Melhorias que poderiam ser feitas

Se houvesse mais tempo, eu implementaria:

- 🔐 Autenticação com token JWT e refresh token
- 🧪 Testes automatizados (unitários e de integração)
- 📱 Design responsivo completo para mobile
- 🗃️ Paginação real no backend com cursor/offset
- 🔔 Feedback visual com Snackbar para ações (erro, sucesso, etc.)
- 📈 Dashboard com gráficos de movimentações

---

## 📌 Tecnologias

- [Vue 3 + Composition API](https://vuejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vuetify](https://next.vuetifyjs.com/)
- [Ruby on Rails](https://rubyonrails.org/)
- [Axios](https://axios-http.com/)

---

> Feito com 💻 por [LuccaBN](https://github.com/LuccaBN)
