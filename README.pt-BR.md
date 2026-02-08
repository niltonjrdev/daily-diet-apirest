[🇺🇸 English version](README.md)

# 🍽️ Daily Diet API

API REST para controle de dieta diária, permitindo o gerenciamento completo de refeições e acompanhamento de métricas nutricionais.

> 🚀 **[Ver demonstração ao vivo](https://daily-diet-apirest.onrender.com/)**

[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

---

## 📋 Sobre o Projeto

Desenvolvido como desafio do módulo de **Node.js** da [Rocketseat](https://www.rocketseat.com.br/), este projeto implementa uma API completa para controle de dieta com identificação de usuários via cookies, validação de dados e testes automatizados.

### ✨ Funcionalidades

- ✅ Criação e autenticação de usuários via cookies
- ✅ CRUD completo de refeições
- ✅ Isolamento de dados por usuário
- ✅ Métricas personalizadas:
  - Total de refeições registradas
  - Refeições dentro/fora da dieta
  - Melhor sequência de refeições na dieta
- ✅ Validação robusta com Zod
- ✅ Testes E2E completos (22 testes)

---

## 🛠️ Tecnologias

### Core

- **[Node.js](https://nodejs.org/)** - Runtime JavaScript
- **[TypeScript](https://www.typescriptlang.org/)** - Superset JavaScript tipado
- **[Fastify](https://fastify.dev/)** - Framework web de alta performance

### Banco de Dados

- **[Knex.js](http://knexjs.org/)** - Query builder SQL
- **[SQLite](https://www.sqlite.org/)** - Banco de dados (desenvolvimento)
- **[PostgreSQL](https://www.postgresql.org//)** - Banco de dados (produção)

### Validação & Testes

- **[Zod](https://zod.dev/)** - Validação de schemas
- **[Vitest](https://vitest.dev/)** - Framework de testes
- **[Supertest](https://github.com/ladjs/supertest)** - Testes HTTP

### Deploy

- **[Render](https://render.com/)** - Plataforma de hospedagem

---

## 🚀 Como Executar

### Pré-requisitos

- Node.js 20+
- npm

### Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/daily-diet-api.git

# Entre na pasta
cd daily-diet-api

# Instale as dependências
npm install

# Configure as variáveis de ambiente
cp .env.example .env

# Execute as migrations
npm run knex -- migrate:latest
```

### Executar em Desenvolvimento

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`

### Executar Testes

```bash
# Todos os testes
npm test

# Modo watch
npm run test:watch

# Teste específico
npm test test/meals/create.spec.ts
```

---

## 📡 Endpoints da API

### Usuários

| Método | Endpoint | Descrição              |
| ------ | -------- | ---------------------- |
| POST   | `/users` | Criar novo usuário     |
| GET    | `/me`    | Verificar autenticação |

### Refeições

| Método | Endpoint         | Descrição                  | Auth |
| ------ | ---------------- | -------------------------- | ---- |
| POST   | `/meals`         | Criar refeição             | ✅   |
| GET    | `/meals`         | Listar todas as refeições  | ✅   |
| GET    | `/meals/:id`     | Buscar refeição específica | ✅   |
| PUT    | `/meals/:id`     | Atualizar refeição         | ✅   |
| DELETE | `/meals/:id`     | Deletar refeição           | ✅   |
| GET    | `/meals/metrics` | Obter métricas do usuário  | ✅   |

### Exemplos de Requisições

<details>
<summary>📝 Criar Usuário</summary>
```bash
POST /users
Content-Type: application/json

{
"name": "João Silva"
}

```

**Resposta:**
```

Status: 201 Created
Set-Cookie: userId=...

````
</details>

<details>
<summary>🍕 Criar Refeição</summary>
```bash
POST /meals
Cookie: userId=...
Content-Type: application/json

{
  "name": "Almoço",
  "description": "Frango com batata doce",
  "meal_date_time": "2024-01-15 12:30:00",
  "is_on_diet": true
}
````

**Resposta:**

```
Status: 201 Created
```

</details>

<details>
<summary>📊 Obter Métricas</summary>
```bash
GET /meals/metrics
Cookie: userId=...
```

**Resposta:**

```json
{
  "totalMeals": 10,
  "mealsOnDiet": 8,
  "mealsOffDiet": 2,
  "bestSequence": 5
}
```

</details>

---

## 🏗️ Estrutura do Projeto

```
db/
└── migrations/      # Migrations do banco de dados

src/
├── env/
│   └── index.ts         # Environment variables
├── middlewares/     # Custom middlewares
│   └── check-user-id.ts
├── routes/          # Application routes
│   ├── meals.ts
│   └── users.ts
├── app.ts           # Fastify configuration
├── database.ts      # Database configuration
└── server.ts        # Server initialization

test/
├── meals/           # Testes de refeições
│   ├── create.spec.ts
│   ├── delete.spec.ts
│   ├── get.spec.ts
│   ├── list.spec.ts
│   ├── metrics.spec.ts
│   └── update.spec.ts
└── users.spec.ts    # Testes de usuários

.env
.env.example
.env.test
.gitignore
.prettierrc.json
eslint.config.js
knexfile.ts
package.json
tsconfig.json
```

---

## 🔒 Segurança

- ✅ Autenticação via cookies HTTP-only
- ✅ Uso de cookies com SameSite para mitigação de CSRF
- ✅ Validação de entrada com Zod
- ✅ Isolamento de dados por usuário
- ✅ Queries parametrizadas (proteção contra SQL Injection)

---

## 🎯 Regras de Negócio

- [x] Usuário pode criar uma conta
- [x] Usuário é identificado entre requisições
- [x] Usuário pode registrar refeições com:
  - Nome
  - Descrição
  - Data e hora
  - Status de dieta (dentro/fora)
- [x] Usuário pode editar uma refeição
- [x] Usuário pode deletar uma refeição
- [x] Usuário pode listar todas suas refeições
- [x] Usuário pode visualizar uma refeição específica
- [x] Usuário pode recuperar métricas:
  - Quantidade total de refeições
  - Refeições dentro da dieta
  - Refeições fora da dieta
  - Melhor sequência de refeições na dieta
- [x] Usuário só pode visualizar/editar/deletar suas próprias refeições

---

## 🚀 Deploy

Este projeto está configurado para deploy no [Render](https://render.com/).

### Configuração no Render

1. Conecte seu repositório GitHub
2. Configure as variáveis de ambiente:

```
   NODE_ENV=production
   DATABASE_URL=postgresql://...
```

3. Deploy automático a cada push na branch `main`

---

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

---

## 👨‍💻 Autor

**Nilton Junior**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nilton-junior-5915a2238/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/niltonjr-dev)

---

## 🙏 Agradecimentos

- [Rocketseat](https://www.rocketseat.com.br/) pelo desafio
- Comunidade Node.js

---

<p align="center">
  Projeto desenvolvido durante o módulo Node.js da Rocketseat
</p>
