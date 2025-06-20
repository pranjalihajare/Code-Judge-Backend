# 🧠 Coding Judge Backend

A secure and modular backend system for evaluating code submissions automatically.

## 🚀 Tech Stack

- **Node.js**, **Express.js**
- **MongoDB** + Mongoose
- **JWT** authentication
- RESTful API (OpenAPI documented)
- Secure sandboxed code execution (`child_process`)
- Optional: WebSocket for real-time status

## 🔐 Auth

- `POST /api/auth/register` — Register user
- `POST /api/auth/login` — Login & get JWT token

## 🧠 Problems (admin only for create/update)

- `POST /api/problems` — Add new problem
- `GET /api/problems` — List all
- `GET /api/problems/:id` — Get problem by ID
- `PUT /api/problems/:id` — Update problem

## 🧪 Submissions

- `POST /api/submissions` — Submit code
- `GET /api/submissions/user/:userId` — View user's submission history

## 🔒 Rate Limiting

- Max 10 submissions per hour per user

## 🧰 Setup

```bash
git clone <repo>
cd coding-judge-backend
npm install
cp .env.example .env
npm run dev
