[🇧🇷 Versão em Português](README.pt-BR.md)

# 🍽️ Daily Diet API

RESTful API for daily diet tracking, enabling complete meal management and nutritional metrics monitoring.

> 🚀 **[Live Demo](https://your-project.onrender.com)** _(add link after deployment)_

[![Node.js](https://img.shields.io/badge/Node.js-20+-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue.svg)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

[🇧🇷 Versão em Português](README.md)

---

## 📋 About

Developed as a challenge for the **Node.js** module by [Rocketseat](https://www.rocketseat.com.br/), this project implements a complete diet tracking API with cookie-based user identification, data validation, and automated testing.

### ✨ Features

- ✅ User creation and cookie-based authentication
- ✅ Full CRUD for meals
- ✅ User data isolation
- ✅ Custom metrics:
  - Total meals registered
  - Meals on/off diet
  - Best diet streak
- ✅ Robust validation with Zod
- ✅ Comprehensive E2E test coverage (22 tests)

---

## 🛠️ Technologies

### Core

- **[Node.js](https://nodejs.org/)** - JavaScript runtime
- **[TypeScript](https://www.typescriptlang.org/)** - Typed JavaScript superset
- **[Fastify](https://fastify.dev/)** - High-performance web framework

### Database

- **[Knex.js](http://knexjs.org/)** - SQL query builder
- **[SQLite](https://www.sqlite.org/)** - Database (development)

### Validation & Testing

- **[Zod](https://zod.dev/)** - Schema validation
- **[Vitest](https://vitest.dev/)** - Testing framework
- **[Supertest](https://github.com/ladjs/supertest)** - HTTP testing

### Deployment

- **[Render](https://render.com/)** - Hosting platform

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/daily-diet-api.git

# Navigate to directory
cd daily-diet-api

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Run migrations
npm run knex -- migrate:latest
```

### Running in Development

```bash
npm run dev
```

API will be available at `http://localhost:3333`

### Running Tests

```bash
# All tests
npm test

# Watch mode
npm run test:watch

# Specific test
npm test test/meals/create.spec.ts
```

---

## 📡 API Endpoints

### Users

| Method | Endpoint | Description          |
| ------ | -------- | -------------------- |
| POST   | `/users` | Create new user      |
| GET    | `/me`    | Check authentication |

### Meals

| Method | Endpoint         | Description       | Auth |
| ------ | ---------------- | ----------------- | ---- |
| POST   | `/meals`         | Create meal       | ✅   |
| GET    | `/meals`         | List all meals    | ✅   |
| GET    | `/meals/:id`     | Get specific meal | ✅   |
| PUT    | `/meals/:id`     | Update meal       | ✅   |
| DELETE | `/meals/:id`     | Delete meal       | ✅   |
| GET    | `/meals/metrics` | Get user metrics  | ✅   |

### Request Examples

<details>
<summary>📝 Create User</summary>
```bash
POST /users
Content-Type: application/json

{
"name": "John Doe"
}

```

**Response:**
```

Status: 201 Created
Set-Cookie: userId=...

````
</details>

<details>
<summary>🍕 Create Meal</summary>
```bash
POST /meals
Cookie: userId=...
Content-Type: application/json

{
  "name": "Lunch",
  "description": "Grilled chicken with sweet potato",
  "meal_date_time": "2024-01-15 12:30:00",
  "is_on_diet": true
}
````

**Response:**

```
Status: 201 Created
```

</details>

<details>
<summary>📊 Get Metrics</summary>
```bash
GET /meals/metrics
Cookie: userId=...
```

**Response:**

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

## 🏗️ Project Structure

```
db/
└── migrations/      # Database migrations

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
├── meals/           # Meal tests
│   ├── create.spec.ts
│   ├── delete.spec.ts
│   ├── get.spec.ts
│   ├── list.spec.ts
│   ├── metrics.spec.ts
│   └── update.spec.ts
└── users.spec.ts    # User tests

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

## 🔒 Security

- ✅ HTTP-only cookie authentication
- ✅ SameSite cookie attribute for CSRF mitigation
- ✅ Input validation with Zod
- ✅ User data isolation
- ✅ Parameterized queries (SQL Injection protection)

---

## 🎯 Business Rules

- [x] User can create an account
- [x] User is identified between requests
- [x] User can register meals with:
  - Name
  - Description
  - Date and time
  - Diet status (on/off)
- [x] User can edit a meal
- [x] User can delete a meal
- [x] User can list all their meals
- [x] User can view a specific meal
- [x] User can retrieve metrics:
  - Total meals count
  - Meals on diet
  - Meals off diet
  - Best diet streak
- [x] User can only view/edit/delete their own meals

---

## 🚀 Deployment

This project is configured for deployment on [Render](https://render.com/).

### Render Configuration

1. Connect your GitHub repository
2. Configure environment variables:

```
   NODE_ENV=production
   DATABASE_URL=postgresql://...
```

3. Automatic deployment on every push to `main` branch

---

## 📝 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Nilton Junior**

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nilton-junior-5915a2238/)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/niltonjr-dev)

---

## 🙏 Acknowledgments

- [Rocketseat](https://www.rocketseat.com.br/) for the challenge
- Node.js community

---

<p align="center">
  Made with ❤️ during Rocketseat's Node.js module
</p>
