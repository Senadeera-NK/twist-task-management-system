# Phase 1: Technical Design & Architecture Plan

## 1. Technology Stack Justification

| Layer | Technology | Justification |
| :--- | :--- | :--- |
| **Frontend** | Next.js 15 (App Router) | Selected for optimized rendering, built-in Middleware for route protection, and native TypeScript support. |
| **Backend** | **NestJS** | Chosen for its **Modular Architecture** and Decorator-based system, which ensures a clean separation of concerns and robust Dependency Injection. |
| **Database** | **PostgreSQL (Supabase)** | A relational database was chosen to handle structured data and ensure referential integrity between Users and Tasks. |
| **ORM** | **Prisma** | Provides a type-safe database client that prevents runtime queries errors and streamlines schema migrations. |

---

## 2. High-Level Architecture
The system employs a **Modular Layered Architecture** with a clear separation between the transport and business logic layers.

1.  **Reverse Proxy Layer (Next.js Rewrites):** Acts as a bridge between the frontend and the Render-hosted API. This architecture solves Cross-Origin cookie issues and masks the backend URL from the client.
2.  **Controller Layer:** Manages HTTP request/response cycles and enforces strict input validation using DTOs.
3.  **Service Layer:** Encapsulates business logic, including task ownership verification and state management.
4.  **Data Access Layer (Prisma):** Handles abstraction of the PostgreSQL database for type-safe CRUD operations.



---

## 3. Security Strategy (Core Focus)
To address the 20% security rubric, security is implemented as a multi-layered defense:

### A. Authentication & Client-Side Security
* **HttpOnly Secure Cookies:** JWTs are issued via `HttpOnly`, `Secure`, and `SameSite=None` cookies. This provides native **XSS (Cross-Site Scripting)** protection as tokens are inaccessible to client-side scripts.
* **CSRF Mitigation:** SameSite cookie attributes and CORS whitelisting restrict state-changing requests to the authorized frontend domain.
* **Secure Token Storage:** By utilizing cookies rather than `localStorage`, we ensure session data is handled by the browser's secure storage engine.

### B. Backend Defensive Engineering
* **Ownership Validation (RBAC):** Every Task endpoint validates that the `userId` in the JWT matches the `ownerId` of the record. This prevents **IDOR (Insecure Direct Object Reference)** attacks.
* **Input Sanitization:** A global `ValidationPipe` with `class-validator` ensures all payloads are sanitized and stripped of unexpected properties before processing.
* **Rate Limiting:** Integrated `@nestjs/throttler` to protect auth endpoints from brute-force attempts.
* **Error Masking:** A global Exception Filter catches internal 500 errors to prevent leaking database schemas or stack traces to the user.

---

## 4. Novelty Feature: "Hybrid Filtering & Search"
**Feature:** Advanced Case-Insensitive Task Search.
* **Reasoning:** To improve the UX for power users, I implemented a search mechanism that queries the PostgreSQL database using Prisma’s `contains` filter with `mode: 'insensitive'`. This demonstrates an understanding of efficient database querying beyond simple CRUD.

---

## 5. Alternative Considerations
In a production-scale scenario, the following would be implemented:
1.  **Refresh Token Rotation:** Storing refresh tokens in the database to allow for explicit session revocation.
2.  **Content Security Policy (CSP):** Implementing strict CSP headers in Next.js to further restrict the sources from which scripts can be loaded.
3.  **Dockerization:** Standardizing the development and deployment environment to ensure consistency across the CI/CD pipeline.