# 🚀 Task Manager API

![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white)

A high-performance, type-safe RESTful API built with **Node.js**, **Express**, and **Prisma ORM**. This project implements a solid backend architecture inspired by enterprise standards.

---

## 🏗 Architecture & Patterns

The project follows a **Controller-Service-Repository** pattern to ensure separation of concerns:

- **Controllers**: Handle HTTP requests and response formatting.
- **Services**: Contain business logic and interact with the database via Prisma.
- **Prisma ORM**: Provides end-to-end type safety and handles migrations.
- **Middleware**: Centralized error handling and request logging.



## 🛠 Tech Stack

- **Runtime**: Node.js (v20+)
- **Language**: TypeScript (Strict mode)
- **ORM**: Prisma 7.x (with Driver Adapters)
- **Database**: PostgreSQL
- **Development Tooling**: `tsx` for fast execution, `tsc` for builds.

## 🚀 Getting Started

### 1. Prerequisites
- Docker & Docker Compose
- Node.js (v20+) installed locally

### 2. Setup Environment
Create a `.env` file in the root directory:
```env
DATABASE_URL="postgresql://user:password@localhost:5433/task_manager_db?schema=public"

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

🔌 API Documentation
    Tasks
        Method  Endpoint    Description
        GET     /api/tasks  Fetch all tasks from DBP
        POST    /api/tasks  Create a new task (JSON body required)

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
