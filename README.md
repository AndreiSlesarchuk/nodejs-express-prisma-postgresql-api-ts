# 🚀 Task Manager API

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)
![Swagger](https://img.shields.io/badge/-Swagger-%23C1E1C1?style=for-the-badge&logo=swagger&logoColor=black)

A high-performance, type-safe RESTful API built with **Node.js**, **Express**, and **Prisma ORM**. Featuring automated OpenAPI documentation and enterprise-grade architecture.

---

## 🏗 Architecture & Patterns

The project follows a **Controller-Service-Repository** pattern to ensure separation of concerns:

- **Controllers**: Handle HTTP requests and response formatting.
- **Services**: Contain business logic and interact with the database via Prisma.
- **Prisma ORM**: Provides end-to-end type safety and handles migrations.
- **Swagger/OpenAPI**: Automated interactive API documentation.
- **Middleware**: Centralized error handling and request logging.

## 🔐 Security & Authentication

The API implements a robust **Double-Token Authentication** flow:

- **JWT Access Tokens**: Short-lived (15m) tokens for authorizing requests.
- **Refresh Tokens**: Long-lived tokens stored in the database and delivered via **HttpOnly, SameSite Cookies** to prevent XSS and CSRF attacks.
- **Request Validation**: All incoming data is strictly validated using **Zod** schemas before reaching the controllers.
- **Password Security**: Passwords are salted and hashed using **Bcryptjs**.

## 🛠 Tech Stack & Tools

- **Runtime**: Node.js (v20+)
- **Language**: TypeScript (Strict mode)
- **ORM**: Prisma 7.x (with Driver Adapters)
- **Authentication**: JWT (Access & Refresh Tokens)
- **Validation**: Zod (Schema-based request validation)
- **Password Hashing**: Bcryptjs
- **Caching & Sessions**: Redis
- **Docs**: Swagger UI & OpenAPI 3.0
- **Database**: PostgreSQL
- **Containerization**: Docker & Docker Compose
- **Development Tooling**: `tsx` for hot-reload, `eslint` for linting.

## 🔐 Security & Auth Flow

The API implements an enterprise-grade authentication system:
- **Dual-Token System**: Short-lived Access Tokens (15m) and long-lived Refresh Tokens (7d).
- **Secure Storage**: Refresh tokens are delivered via **HttpOnly, SameSite Cookies** to mitigate XSS and CSRF risks.
- **Database Synchronization**: Refresh tokens are stored in the database to allow session revocation on logout.
- **Schema Validation**: All input (body, params, query) is sanitized and validated by **Zod** middleware before processing.

## 🔌 API Documentation

### 🔑 Authentication
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| POST | `/api/auth/register` | Create a new user with email, username and password |
| POST | `/api/auth/login` | Authenticate user and set secure cookies |
| POST | `/api/auth/refresh` | Get a new Access Token using your Refresh Token |
| POST | `/api/auth/logout` | Revoke tokens and clear secure cookies |

### 📝 Tasks
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | `/api/tasks` | Fetch all tasks (User-specific or public) |
| POST | `/api/tasks` | Create a task (Automatic author assignment from JWT) |
| GET | `/api/tasks/{id}` | Get detailed task information |
| PATCH | `/api/tasks/{id}` | Update title, description or status |
| DELETE | `/api/tasks/{id}` | Securely remove a task |

## 🐳 Docker Development

The environment is fully containerized for consistent development:

- **Hot-Reloading**: Uses Docker Volumes to sync your local code with the container in real-time.
- **Multi-Container Setup**: Orchestrates Node.js, PostgreSQL, and Redis seamlessly.
- **Commands**:
  - `docker-compose up --build`: Start the entire stack.
  - `docker-compose down`: Stop and remove containers.

## 🚀 Getting Started

### 1. Prerequisites
- Docker & Docker Compose
- Node.js (v20+) installed locally

### 2. Setup Environment
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5433/task_manager_db?schema=public"
JWT_SECRET="your_access_token_secret"
REFRESH_TOKEN_SECRET="your_refresh_token_secret"
REDIS_URL="redis://redis:6379"
NODE_ENV="development"

### 3. Installation & Database SetupBash# Install dependencies
    npm install

# Spin up PostgreSQL in Docker
    docker-compose up -d

# Run Prisma migrations to sync database schema
    npx prisma migrate dev --name init

### 4. Running the AppBash# Development mode with hot-reload
    npm run dev

# Production build
    npm run build
    npm start

    Sample POST Body:
        JSON {
            "title": "Complete Prisma Setup",
            "description": "Ensure driver adapters are working with PostgreSQL"
        }

🛡 Global Error Handling
The API includes a centralized Error Middleware that catches all exceptions and returns a consistent JSON structure:
    JSON {
        "error": "ErrorName",
        "message": "Detailed error message"
    }
