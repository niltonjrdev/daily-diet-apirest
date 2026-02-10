[🇧🇷 Versão em Português](README.pt-BR.md)

# 🍽️ Daily Diet API

RESTful API for daily diet tracking, enabling complete meal management and nutritional metrics monitoring.

> 🚀 **[Live Demo](https://daily-diet-apirest.onrender.com/)**

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
- **[PostgreSQL](https://www.postgresql.org//)** - Database (production)

### Validation & Testing

- **[Zod](https://zod.dev/)** - Schema validation
- **[Vitest](https://vitest.dev/)** - Testing framework
- **[Supertest](https://github.com/ladjs/supertest)** - HTTP testing

### Deployment

- **[Render](https://render.com/)** - Hosting platform

---

# 🧪 Testing the API

The API can be tested in three ways: importing ready-made collections, using curl, or manually with any HTTP client.

## 📦 Import Collection (Recommended)

### Insomnia

1. Download [**Insomnia**](https://insomnia.rest/download)
2. Download the collection file:
   - **📥 [Download insomnia-collection.json](./insomnia-collection.json)** (right-click → Save as)
3. Import in Insomnia:
   - `Application` → `Import/Export` → `Import Data`
   - Select `From File`
   - Choose the downloaded file
   - Click `Scan` then `Import`
4. Select the `Base Environment`
5. Test the endpoints!

### Thunder Client (VS Code)

1. Install the [**Thunder Client**](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client) extension
2. Download the collection file:
   - **📥 [Download thunder-collection.json](./thunder-collection.json)** (right-click → Save as)
3. Import the collection:
   - Click the Thunder Client icon (⚡)
   - `Collections` → `...` → `Import`
   - Select `thunder-collection.json`
4. Download the environments file:
   - **📥 [Download thunder-environment.json](./thunder-environment.json)** (right-click → Save as)
5. Import the environments:
   - `Env` → `...` → `Import`
   - Select `thunder-environment.json`
6. Choose the `Local Development` or `Production` environment

---

## 🔄 Recommended Test Flow

1. **Create user**
   - Request: `POST Create User`
   - Body: `{ "name": "John Doe", "email": "john@example.com" }`

2. **Login (Get Session)**
   - Request: `POST Login (Get Session)`
   - Body: `{ "email": "john@example.com" }`
   - The `sessionId` cookie is automatically saved

3. **Create meal**
   - Request: `POST Create Meal`
   - Uses the `sessionId` from the session
   - Copy the returned `id` for the next tests

4. **List all meals**
   - Request: `GET List All Meals`
   - Returns all meals for your session

5. **Get specific meal**
   - Paste the meal `id` in the `meal_id` environment variable
   - Request: `GET Get Single Meal`

6. **Update meal**
   - Request: `PUT Update Meal`
   - Modify the meal data

7. **View user metrics**
   - Request: `GET Get User Metrics`
   - Returns diet statistics (total meals, on diet, best sequence)

8. **Delete meal**
   - Request: `DELETE Delete Meal`

---

## 💻 Test with cURL

### Create user:
```bash
curl -X POST http://localhost:3333/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com"
  }'
```

### Login (Get Session):
```bash
curl -X POST http://localhost:3333/sessions \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com"
  }' \
  -c cookies.txt
```

### Create meal:
```bash
curl -X POST http://localhost:3333/meals \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name": "Breakfast - Scrambled eggs",
    "description": "2 eggs with whole wheat bread and avocado",
    "date": "2026-02-09",
    "time": "08:30",
    "isOnDiet": true
  }'
```

### List meals:
```bash
curl -X GET http://localhost:3333/meals \
  -b cookies.txt
```

### Get specific meal:
```bash
curl -X GET http://localhost:3333/meals/{MEAL_ID} \
  -b cookies.txt
```

### Update meal:
```bash
curl -X PUT http://localhost:3333/meals/{MEAL_ID} \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "name": "Breakfast - Updated",
    "description": "3 eggs with sweet potato",
    "date": "2026-02-09",
    "time": "09:00",
    "isOnDiet": true
  }'
```

### Get user metrics:
```bash
curl -X GET http://localhost:3333/meals/metrics \
  -b cookies.txt
```

### Delete meal:
```bash
curl -X DELETE http://localhost:3333/meals/{MEAL_ID} \
  -b cookies.txt
```

**Note:** `-c cookies.txt` saves cookies and `-b cookies.txt` sends them in requests.

---

## 📋 Available Endpoints

| Method | Endpoint | Description | Requires Cookie |
|--------|----------|-------------|----------------|
| POST | `/users` | Create user | No |
| POST | `/sessions` | Login (get session) | No |
| POST | `/meals` | Create meal | Yes |
| GET | `/meals` | List all meals | Yes |
| GET | `/meals/:id` | Get specific meal | Yes |
| PUT | `/meals/:id` | Update meal | Yes |
| DELETE | `/meals/:id` | Delete meal | Yes |
| GET | `/meals/metrics` | Get user metrics | Yes |

### POST `/users` Body:
```json
{
  "name": "User name",
  "email": "user@example.com"
}
```

### POST `/sessions` Body:
```json
{
  "email": "user@example.com"
}
```

### POST/PUT `/meals` Body:
```json
{
  "name": "Meal name",
  "description": "Meal description",
  "date": "2026-02-09",
  "time": "08:30",
  "isOnDiet": true
}
```

---

## ⚠️ Important Notes

- **Sessions:** Each user has their own `sessionId` via cookie
- **Isolation:** You only see meals from your session
- **Authentication:** Most routes require authentication (sessionId cookie)
- **Date format:** `YYYY-MM-DD` (e.g., "2026-02-09")
- **Time format:** `HH:MM` (e.g., "08:30")
- **isOnDiet:** Boolean value (`true` or `false`)

---

## 🐛 Common Issues

### 401 Unauthorized Error:
- **Cause:** You didn't send the cookie on authenticated routes
- **Solution:** Login first (POST `/sessions`) to receive the sessionId cookie

### 404 Not Found Error:
- **Cause:** The meal ID doesn't exist or doesn't belong to your session
- **Solution:** Check the ID by listing meals (GET `/meals`)

### Validation Error:
- **Cause:** Missing or invalid fields in request body
- **Solution:** Check the required fields and formats in the endpoint documentation above

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
  Project developed during Rocketseat's Node.js module from Rocketseat
</p>
