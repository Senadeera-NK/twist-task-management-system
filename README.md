# Twist Task Management System

A full-stack, production-ready task management application built with **Next.js 15** and **NestJS**. This project demonstrates a modular architecture, secure authentication via HttpOnly cookies, and a robust CRUD implementation using PostgreSQL and Prisma.

## 🚀 Live Links
- **Frontend (Vercel):** [https://twist-task-management-system-dkp4k7kv1.vercel.app]
- **Backend API (Render):** [https://twist-task-management-system.onrender.com]

## 🛠️ Tech Stack
- **Frontend:** Next.js 15 (App Router), Tailwind CSS, Axios.
- **Backend:** NestJS (Modular Framework), Passport.js (JWT Strategy).
- **Database:** PostgreSQL (Supabase).
- **ORM:** Prisma (Type-safe access).
- **Deployment:** Vercel (Client), Render (Server).

---

## 🏗️ Project Architecture
The application follows a **Modular Layered Architecture**, ensuring high cohesion and low coupling.



- **Frontend:** Acts as the presentation layer. It utilizes a **Reverse Proxy (Next.js Rewrites)** to communicate with the backend as a "same-origin" request, solving third-party cookie restrictions.
- **Backend:** Organized into independent modules (`AuthModule`, `TasksModule`).
- **Database:** A relational schema ensures that tasks are strictly linked to specific user IDs.

---

## 🔒 Security Implementation (20% Rubric Focus)
Security was treated as a first-class citizen at every layer:

- **HttpOnly Cookie Authentication:** JWTs are stored in `HttpOnly`, `Secure`, and `SameSite=None` cookies. This mitigates **XSS** (by making the token inaccessible to JS) and enhances session security.
- **Reverse Proxy Architecture:** Using Next.js rewrites to tunnel `/api` requests ensures reliable cookie transmission and hides the backend infrastructure URL.
- **IDOR Protection:** The backend enforces strict resource ownership; users can only interact with tasks where `task.userId === authenticatedUser.id`.
- **Input Sanitization:** Global `ValidationPipe` with `class-validator` prevents malicious payloads from reaching the database.
- **Bcrypt Password Hashing:** User credentials are salted and hashed using 10 rounds of bcrypt.
- **CORS Management:** Strict origin whitelisting ensures only the authorized frontend can communicate with the API.

---

## 🌟 Novelty Feature: Hybrid Filtering System
Beyond standard CRUD, I implemented a **Hybrid Search System**.
- **Backend:** Utilizes Prisma’s `contains` filter with `mode: 'insensitive'` for efficient database-level querying.
- **Frontend:** Implemented a reactive search bar that filters tasks in real-time, providing a high-performance, seamless user experience.

---

## ⚠️ Note on Render (Free Tier)
This project is hosted on Render's free tier. If the application takes a moment to load tasks or log in, the backend may be "spinning up" from a sleep state. Please allow 30-60 seconds for the initial request to wake the server.

## 🛠️ Implementation Decisions
- **Next.js Middleware:** Used to protect dashboard routes, ensuring unauthenticated users are redirected to login before the page even renders.
- **Custom Axios Instance:** Configured with `withCredentials: true` and a relative `/api` base URL to work seamlessly with the Next.js rewrite proxy.

---

## ⚙️ Local Setup

### 1. Prerequisites
- Node.js (v18+)
- A PostgreSQL Database (Supabase recommended)

### 2. Clone the Repository
```bash
git clone [https://github.com/Senadeera-NK/twist-task-management-system.git](https://github.com/Senadeera-NK/twist-task-management-system.git)
cd twist-task-management-system