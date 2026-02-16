# Phase 1: Technical Design & Architecture Plan

## 1. Technology Stack Justification

| Layer | Technology | Justification |
| :--- | :--- | :--- |
| **Frontend** | Next.js 15 (App Router) | Chosen for Server-Side Rendering (SSR) capabilities and robust routing. |
| **Backend** | NestJS | Chosen over Express for its **opinionated architecture**, built-in Dependency Injection, and superior TypeScript support. |
| **Database** | PostgreSQL + Prisma | Ensures data integrity via a relational schema and provides a type-safe ORM. |
| **Validation** | Zod | Used for schema validation on both Client and Server to ensure data contract consistency. |

---

## 2. High-Level Architecture
The application follows a **Modular Layered Architecture**. This ensures that the business logic is decoupled from the transport layer (HTTP/API).



1.  **Presentation Layer (Next.js):** Client-side state management and UI components.
2.  **Controller Layer (NestJS):** Handles request/response mapping and DTO validation.
3.  **Service Layer:** The core business logic (e.g., Task ownership verification).
4.  **Data Access Layer (Prisma):** Abstracted database interactions.

---

## 3. Security Strategy (Core Focus)
To meet the 20% security rubric, the following measures are planned:

### A. Authentication & Identity
* **JWT Authentication:** Stateless authentication using JSON Web Tokens.
* **Secure Cookies:** Tokens will be issued via **HttpOnly** cookies to prevent JavaScript-based XSS token theft.
* **Password Security:** Implementation of `bcrypt` for one-way salted hashing.

### B. Defensive Engineering
* **RBAC (Role-Based Access Control):** Specifically, **Resource Ownership Checks**. The backend will verify that `Task.userId === Request.user.id` for every `PUT/DELETE` operation.
* **Rate Limiting:** Guarding the `/auth` endpoints against brute-force attacks using `nestjs/throttler`.
* **Input Sanitization:** Using Zod to strip unknown fields (preventing Mass Assignment attacks) and sanitizing strings to prevent NoSQL/SQL Injection.

---

## 4. Novelty Feature: "Optimistic Task Persistence"
**Feature:** I will implement **Optimistic UI Updates** using React Hooks/TanStack Query.
* **Reasoning:** This enhances UX by showing the task as "Completed" instantly on the UI, while the server syncs in the background. It demonstrates an understanding of modern state management and "perceived performance."

---

## 5. Alternative Considerations
In a large-scale production scenario, I would recommend:
1.  **Redis:** For session blacklisting (in case a JWT needs to be revoked).
2.  **Docker:** For containerization to ensure "it works on my machine" translates to production.
3.  **Winston/Pino:** For structured logging to monitor for security anomalies.