# Vue + TypeScript + Ruby on Rails

Este repositório contém uma aplicação web com frontend em **Vue 3 + TypeScript + Vuetify** e backend em **Ruby on Rails**, comunicando-se via API REST.

---

## 📦 Estrutura do Projeto

```
/
├── Backend/api-rails-sagat-ai-test    # API Ruby on Rails
└── Frontend/project                   # Aplicação Vue 3 + TypeScript
```

---

## 🚀 Como rodar o projeto

### 🖥️ Frontend (Vue 3 + TypeScript)

1. Acesse a pasta:

```bash
cd Frontend/project
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o projeto:

```bash
npm run serve
```

A aplicação estará disponível em `http://localhost:8080`.

---

### 🛠️ Backend (Ruby on Rails com Docker)

1. Acesse a pasta:

```bash
cd Backend/api-rails-sagat-ai-test
```

2. Certifique-se de ter o Docker e Docker Compose instalados.

3. Execute o backend com:

```bash
docker-compose up --build
```

O backend será iniciado com a API exposta (por padrão em `http://localhost:3000`).

---

## ✅ Funcionalidades Implementadas

- Login com JWT
- Cadastro de usuário
- Auto-login após cadastro
- Painel com:
  - Nome do titular
  - Número da conta e saldo
  - Alternância entre contas
  - Últimas 3 transações (enviadas e recebidas)
- Transferência entre contas (com validação)
- Extrato completo com filtros:
  - Tipo (enviada/recebida)
  - Intervalo de datas
  - Valores mínimos e máximos
- Paleta de cores personalizada baseada na identidade visual fornecida

---

## 📡 Endpoints da API utilizados

### Autenticação

- `PUT /auth/sign_in` — Login
- `POST /auth/sign_up` — Cadastro

### Contas e Transações

- `GET /users/infos` — Dados do usuário logado
- `GET /users/bank_accounts/my` — Contas do usuário
- `GET /users/bank_accounts` — Todas as contas (para validação de destino)
- `POST /users/bank_account_transfers` — Efetuar transferência
- `GET /users/bank_account_transfers/statements` — Extrato com filtros

---

## 🧠 O que faria diferente com mais tempo

- Implementaria testes automatizados (frontend e backend)
- Adicionaria mensagens de feedback com Snackbar
- Melhoraria a responsividade em telas menores
- Implementaria autenticação JWT com refresh token
- Criaria uma documentação OpenAPI (Swagger)

---

## 📄 Licença

Projeto desenvolvido com fins educacionais e demonstrativos.
