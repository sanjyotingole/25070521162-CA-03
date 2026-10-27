# FLEXI – Student Productivity Hub (CA-03)

Full-stack web app: **React** (client) + **Node.js/Express** (server) + **MongoDB** (viewed in Compass).
Students register, log in, and manage their own academic tasks.

## Features
- Register and log in (passwords hashed with bcrypt, sessions with JWT)
- Dashboard with progress bar, filters (All / To do / Completed)
- Add, edit, complete and delete tasks (POST, GET, PUT, DELETE)
- Each user sees only their own tasks; data is stored in MongoDB
- Responsive layout for desktop and mobile

## Run locally
1. Start MongoDB and connect Compass to `mongodb://127.0.0.1:27017`
2. Server:
   ```
   cd server
   npm install
   npm run dev      (or: npm start)
   ```
3. Client (new terminal):
   ```
   cd client
   npm install
   npm run dev
   ```
4. Open http://localhost:5173

The server reads `server/.env` (copy from `.env.example`). The database `flexi` is created automatically; check the `users` and `tasks` collections in Compass.

## API
| Method | Endpoint | Purpose |
|---|---|---|
| POST | /api/auth/register | Create account |
| POST | /api/auth/login | Log in |
| GET | /api/auth/me | Current user |
| GET | /api/tasks | List my tasks |
| POST | /api/tasks | Add task |
| PUT | /api/tasks/:id | Update / mark complete |
| DELETE | /api/tasks/:id | Delete task |
