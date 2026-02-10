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

# 🧪 Testando a API

A API pode ser testada de três formas: importando coleções prontas, usando curl, ou manualmente com qualquer cliente HTTP.

## 📦 Importar Coleção (Recomendado)

### Insomnia

1. Baixe o [**Insomnia**](https://insomnia.rest/download)
2. Baixe o arquivo da coleção:
   - **📥 [Download insomnia-collection.json](./insomnia-collection.json)** (clique com botão direito → Salvar como)
3. Importe no Insomnia:
   - `Application` → `Import/Export` → `Import Data`
   - Selecione `From File`
   - Escolha o arquivo baixado
   - Clique em `Scan` e depois `Import`
4. Selecione o ambiente `Base Environment`
5. Teste os endpoints!

### Thunder Client (VS Code)

1. Instale a extensão [**Thunder Client**](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)
2. Baixe o arquivo da coleção:
   - **📥 [Download thunder-collection.json](./thunder-collection.json)** (clique com botão direito → Salvar como)
3. Importe a coleção:
   - Clique no ícone do Thunder Client (⚡)
   - `Collections` → `...` → `Import`
   - Selecione `thunder-collection.json`
4. Baixe o arquivo de ambientes:
   - **📥 [Download thunder-environment.json](./thunder-environment.json)** (clique com botão direito → Salvar como)
5. Importe os ambientes:
   - `Env` → `...` → `Import`
   - Selecione `thunder-environment.json`
6. Escolha o ambiente `Local Development` ou `Production`

---

## 🔄 Fluxo de Teste Recomendado

1. **Criar usuário**
   - Requisição: `POST Create User`
   - Body: `{ "name": "João Silva", "email": "joao@example.com" }`

2. **Fazer login (Obter sessão)**
   - Requisição: `POST Login (Get Session)`
   - Body: `{ "email": "joao@example.com" }`
   - O cookie `sessionId` é automaticamente salvo

3. **Criar refeição**
   - Requisição: `POST Create Meal`
   - Usa o `sessionId` da sessão
   - Copie o `id` retornado para os próximos testes

4. **Listar todas as refeições**
   - Requisição: `GET List All Meals`
   - Retorna todas as refeições da sua sessão

5. **Obter refeição específica**
   - Cole o `id` da refeição na variável de ambiente `meal_id`
   - Requisição: `GET Get Single Meal`

6. **Atualizar refeição**
   - Requisição: `PUT Update Meal`
   - Modifique os dados da refeição

7. **Ver métricas do usuário**
   - Requisição: `GET Get User Metrics`
   - Retorna estatísticas da dieta (total de refeições, dentro da dieta, melhor sequência)

8. **Deletar refeição**
   - Requisição: `DELETE Delete Meal`

---

## 💻 Testar com cURL

### Criar usuário:
```bash
curl -X POST http://localhost:3333/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@example.com"
  }'
```

### Login (Obter sessão):
```bash
curl -X POST http://localhost:3333/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@example.com"
  }' \
  -c cookies.txt
```

### Criar refeição:
```bash
curl -X POST http://localhost:3333/meals \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name": "Café da manhã - Ovos mexidos",
    "description": "2 ovos com pão integral e abacate",
    "date": "2026-02-09",
    "time": "08:30",
    "isOnDiet": true
  }'
```

### Listar refeições:
```bash
curl -X GET http://localhost:3333/meals \
  -b cookies.txt
```

### Obter refeição específica:
```bash
curl -X GET http://localhost:3333/meals/{MEAL_ID} \
  -b cookies.txt
```

### Atualizar refeição:
```bash
curl -X PUT http://localhost:3333/meals/{MEAL_ID} \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name": "Café da manhã - Atualizado",
    "description": "3 ovos com batata doce",
    "date": "2026-02-09",
    "time": "09:00",
    "isOnDiet": true
  }'
```

### Obter métricas do usuário:
```bash
curl -X GET http://localhost:3333/meals/metrics \
  -b cookies.txt
```

### Deletar refeição:
```bash
curl -X DELETE http://localhost:3333/meals/{MEAL_ID} \
  -b cookies.txt
```

**Nota:** `-c cookies.txt` salva os cookies e `-b cookies.txt` os envia nas requisições.

---

## 📋 Endpoints Disponíveis

| Método | Endpoint | Descrição | Requer Cookie |
|--------|----------|-----------|---------------|
| POST | `/users` | Criar usuário | Não |
| POST | `/sessions` | Login (obter sessão) | Não |
| POST | `/meals` | Criar refeição | Sim |
| GET | `/meals` | Listar todas as refeições | Sim |
| GET | `/meals/:id` | Obter refeição específica | Sim |
| PUT | `/meals/:id` | Atualizar refeição | Sim |
| DELETE | `/meals/:id` | Deletar refeição | Sim |
| GET | `/meals/metrics` | Obter métricas do usuário | Sim |

### Body do POST `/users`:
```json
{
  "name": "Nome do usuário",
  "email": "usuario@example.com"
}
```

### Body do POST `/sessions`:
```json
{
  "email": "usuario@example.com"
}
```

### Body do POST/PUT `/meals`:
```json
{
  "name": "Nome da refeição",
  "description": "Descrição da refeição",
  "date": "2026-02-09",
  "time": "08:30",
  "isOnDiet": true
}
```

---

## ⚠️ Notas Importantes

- **Sessões:** Cada usuário tem seu próprio `sessionId` via cookie
- **Isolamento:** Você só vê refeições da sua sessão
- **Autenticação:** A maioria das rotas requer autenticação (cookie sessionId)
- **Formato de data:** `AAAA-MM-DD` (ex: "2026-02-09")
- **Formato de hora:** `HH:MM` (ex: "08:30")
- **isOnDiet:** Valor booleano (`true` ou `false`)

---

## 🐛 Problemas Comuns

### Erro 401 Unauthorized:
- **Causa:** Você não enviou o cookie nas rotas autenticadas
- **Solução:** Faça login primeiro (POST `/sessions`) para receber o cookie sessionId

### Erro 404 Not Found:
- **Causa:** O ID da refeição não existe ou não pertence à sua sessão
- **Solução:** Verifique o ID listando as refeições (GET `/meals`)

### Erro de Validação:
- **Causa:** Campos ausentes ou inválidos no body da requisição
- **Solução:** Verifique os campos obrigatórios e formatos na documentação dos endpoints acima

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
