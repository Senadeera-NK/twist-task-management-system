# Phase 1: Technical Design & Architecture Plan

## 1. Technology Stack Justification

| Layer | Technology | Justification |
| :--- | :--- | :--- |
| **Frontend** | Next.js 15 (App Router) | Chosen for optimized rendering, built-in routing, and seamless integration with TypeScript. |
| **Backend** | **NestJS** | Chosen over Express for its **Modular Architecture**, built-in Dependency Injection, and robust support for Middleware, Guards, and Pipes. |
| **Database** | **PostgreSQL (Supabase)** | A reliable relational database that ensures data integrity and supports complex queries for task management. |
| **ORM** | **Prisma** | Provides a type-safe database client, which significantly reduces runtime errors and simplifies database migrations. |

---

## 2. High-Level Architecture
The backend is built using a **Modular Layered Architecture**. This ensures that the application is scalable and that business logic is separated from the transport layer.



1.  **Controller Layer:** Manages HTTP request/response cycles and handles input validation via DTOs.
2.  **Service Layer:** Contains the core business logic, including password hashing and task ownership verification.
3.  **Data Access Layer (Prisma):** Handles all communication with the PostgreSQL database.

---

## 3. Security Strategy (Core Focus)
To meet the 20% security rubric, the following measures have been implemented:

### A. Authentication & Identity
* **JWT Authentication:** Implemented stateless authentication using JSON Web Tokens (Access and Refresh tokens).
* **Password Security:** Industry-standard `bcrypt` is used for one-way salted hashing of user passwords.
* **Environment Safety:** All sensitive keys (Database URLs and JWT Secrets) are managed via `.env` files to prevent credential leakage.

### B. Defensive Engineering
* **Ownership Validation:** The backend strictly enforces that users can only `GET`, `UPDATE`, or `DELETE` tasks where `Task.userId === Request.user.id`.
* **Rate Limiting:** Integrated `@nestjs/throttler` to protect the API from brute-force login attempts and DoS attacks.
* **Input Sanitization:** Global `ValidationPipe` combined with `class-validator` ensures that only clean, validated data reaches the service layer.
* **Error Masking:** Implemented a global exception filter to catch internal errors and prevent sensitive stack traces from being exposed to the client.

---

## 4. Novelty Feature: "Server-Side Keyword Search"
**Feature:** Advanced Task Filtering.
* **Reasoning:** To go beyond basic CRUD, I implemented a search mechanism that allows users to filter tasks by title keywords using a case-insensitive database query. This provides a better user experience for power users with many tasks.

---

## 5. Alternative Considerations
In a production scenario, I would recommend:
1.  **CORS White-listing:** Restricting API access strictly to the production frontend domain.
2.  **Health Checks:** Adding a `/health` endpoint to monitor database and server uptime.
3.  **Dockerization:** Using Docker to ensure a consistent environment across development, staging, and production.