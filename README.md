# QuestLog

**A MERN stack to-do list styled as an RPG quest board.**
Every task is a *quest*. Finish quests to earn XP, fill your level bar and climb from Novice Adventurer to Legend.

Built with **MongoDB, Express.js, React and Node.js**.

> Course: 23CSB40B Web Technology, Assignment 2: MERN Stack To-Do List Application
> Department of Computer Science and Engineering, Mar Baselios College of Engineering and Technology (MBCET), Thiruvananthapuram

---

## Table of contents

1. [Features](#features)
2. [Screenshots](#screenshots)
3. [Tech stack](#tech-stack)
4. [Project structure](#project-structure)
5. [Getting started](#getting-started)
6. [Environment variables](#environment-variables)
7. [API reference](#api-reference)
8. [How it works](#how-it-works)
9. [Git workflow](#git-workflow)
10. [Troubleshooting](#troubleshooting)
11. [Author](#author)

---

## Features

**Core (assignment requirements)**
- Create, read, update and delete tasks, saved permanently in MongoDB
- Mark a task complete or incomplete; completed tasks are struck through
- Tasks load from the backend when the page opens
- The screen updates instantly with no page reload
- Server-side validation: empty titles are rejected with status `400`
- Proper status codes (`201` on create, `404` when a task is not found)
- CORS restricted to the frontend's address only
- Secrets kept out of Git (`.env` is ignored, `.env.example` is committed)

**Extras**
- Difficulty per quest: easy (+10 XP), medium (+20 XP), hard (+40 XP)
- Level and rank banner with an animated XP bar (100 XP per level)
- Filter tabs: All, Active and Done
- Edit a title in place (double-click it, or use the pencil button)
- "+XP" popup when a quest is completed
- Friendly error banner when the backend cannot be reached
- Keyboard and screen reader friendly (labelled buttons, progress bar roles)
- Responsive layout that works on phones

---

## Screenshots

| Add a quest | Complete a quest |
|---|---|
| ![Adding a quest](screenshots/add-task.png) | ![Completing a quest](screenshots/complete-task.png) |

| Delete a quest | Merged pull requests |
|---|---|
| ![Deleting a quest](screenshots/delete-task.png) | ![Merged pull requests](screenshots/merged-pull-requests.png) |

---

## Tech stack

| Layer | Technology |
|---|---|
| Database | MongoDB (local or MongoDB Atlas) with Mongoose |
| Backend | Node.js, Express.js, dotenv, cors |
| Frontend | React 19, Vite, plain CSS |
| Version control | Git and GitHub (feature branches and pull requests) |

---

## Project structure

```
questlog/
├── backend/
│   ├── models/
│   │   └── Task.js          Mongoose schema for a quest
│   ├── routes/
│   │   └── tasks.js         REST endpoints (GET, POST, PUT, DELETE)
│   ├── server.js            Express app, CORS, MongoDB connection
│   ├── package.json
│   └── .env.example         Variable names only (copy to .env)
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── TaskForm.jsx    Form to add a quest
│   │   │   ├── TaskList.jsx    Renders the list or an empty state
│   │   │   ├── TaskItem.jsx    One quest: checkbox, edit, delete
│   │   │   └── XpBar.jsx       Level, rank and XP progress bar
│   │   ├── App.jsx             State, data fetching, event handlers
│   │   ├── api.js              fetch() helpers for the backend
│   │   ├── xp.js               XP, level and rank rules
│   │   ├── index.css           Styling
│   │   └── main.jsx            React entry point
│   ├── index.html
│   ├── vite.config.js
│   └── .env.example
├── screenshots/
├── .gitignore               Excludes node_modules and .env
└── README.md
```

---

## Getting started

### Prerequisites

- **Node.js 18 or newer** (check with `node -v`)
- **MongoDB**, either:
  - a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster, or
  - MongoDB Community Server installed locally
- **Git**

### 1. Clone the repository

```bash
git clone https://github.com/<Christyjohntharakan>/questlog.git
cd questlog
```

### 2. Start the backend

```bash
cd backend
npm install
```

Create your environment file from the example:

```bash
# Mac / Linux
cp .env.example .env

# Windows
copy .env.example .env
```

Open `backend/.env` and set `MONGO_URI` (see [Environment variables](#environment-variables)), then run:

```bash
npm start
```

You should see:

```
MongoDB connected
Server listening on port 5000
```

Quick check: opening `http://localhost:5000/api/tasks` in a browser should show `[]`.

### 3. Start the frontend

Open a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

> The frontend must run on port 3000. The backend only accepts requests from that address (see `CLIENT_ORIGIN`).

### Using a local MongoDB

If you installed MongoDB Community Server, start it and use a local connection string:

```bash
mongod --dbpath C:\data\db        # Windows example; use any empty folder
```

```
MONGO_URI=mongodb://127.0.0.1:27017/questlog
```

---

## Environment variables

### `backend/.env`

| Variable | Required | Description | Example |
|---|---|---|---|
| `MONGO_URI` | Yes | MongoDB connection string | `mongodb://127.0.0.1:27017/questlog` |
| `PORT` | No | Port the API listens on (default `5000`) | `5000` |
| `CLIENT_ORIGIN` | No | The only origin CORS allows (default `http://localhost:3000`) | `http://localhost:3000` |

For Atlas, the string looks like:

```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/questlog?retryWrites=true&w=majority
```

Remove the `<` and `>` when you fill in your values. If your password has special characters such as `@`, `#` or `:`, URL-encode them (`@` becomes `%40`) or choose a simpler password.

### `frontend/.env` (optional)

| Variable | Description | Default |
|---|---|---|
| `VITE_API_URL` | Full URL of the tasks endpoint | `http://localhost:5000/api/tasks` |

Restart `npm run dev` after changing it.

**Never commit `.env`.** It is listed in `.gitignore`. Only `.env.example` (variable names without values) is committed.

---

## API reference

Base URL: `http://localhost:5000/api/tasks`

| Method | Endpoint | Request body | Success response | Error responses |
|---|---|---|---|---|
| GET | `/api/tasks` | none | `200` array of tasks, newest first | `500` |
| POST | `/api/tasks` | `{ "title": "...", "difficulty": "hard" }` | `201` the created task | `400` empty title |
| PUT | `/api/tasks/:id` | any of `title`, `completed`, `difficulty` | `200` the updated task | `400` empty title, `404` not found |
| DELETE | `/api/tasks/:id` | none | `200` `{ "message": "Task deleted", "id": "..." }` | `404` not found |

### Task model

| Field | Type | Rules |
|---|---|---|
| `title` | String | required |
| `completed` | Boolean | default `false` |
| `createdAt` | Date | default: current time |
| `difficulty` | String | optional extra: `easy`, `medium` or `hard` (default `medium`) |

### Validation

On both POST and PUT the title is converted with `String()`, trimmed, and rejected with `400` if it ends up empty. Malformed or unknown ids return `404` instead of crashing the server.

### Example requests

```bash
# Create a quest
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Slay the bug","difficulty":"hard"}'

# Mark it complete (replace <id>)
curl -X PUT http://localhost:5000/api/tasks/<id> \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'

# Delete it
curl -X DELETE http://localhost:5000/api/tasks/<id>
```

---

## How it works

1. **Page load.** `App.jsx` calls `fetchTasks()` inside `useEffect` with an empty dependency array, so it runs once. The result is stored with `useState`.
2. **Adding.** `TaskForm` sends the title and difficulty to `POST /api/tasks`. When the server replies with the new task, `App` adds it to state and the list re-renders. The page never reloads.
3. **Completing and editing.** `PUT /api/tasks/:id` returns the updated task, which replaces the old one in state.
4. **Deleting.** `DELETE /api/tasks/:id` succeeds, then the task is filtered out of state.
5. **XP and levels.** XP is not stored in the database. It is calculated from the tasks: the sum of the XP of every completed quest. Level is `floor(XP / 100) + 1`, and the rank title comes from the level (`xp.js`).

State lives in `App.jsx`. Child components only display data and report user actions, which keeps the data flow easy to follow.

---

## Git workflow

- `main` holds the complete, working application and receives changes only through pull requests.
- `feature/backend` holds the Express and MongoDB work.
- `feature/frontend` holds the React work.
- `docs/screenshots` holds the screenshots.
- Each branch was merged into `main` with a pull request.

---

## Troubleshooting

| Problem | Likely cause and fix |
|---|---|
| `MONGO_URI is missing` | `backend/.env` is missing or empty. Copy `.env.example` to `.env` and fill it in. |
| `bad auth` or `Authentication failed` | Wrong username or password in the connection string. |
| `querySrv ... ENOTFOUND` | The connection string is malformed (often an `@` or `<` `>` left in the password). |
| `Could not connect to any servers` | Atlas IP access list does not include your IP (add `0.0.0.0/0` for testing), or your network blocks MongoDB. |
| `ECONNREFUSED 127.0.0.1:27017` | Local MongoDB is not running. Start `mongod` first. |
| Red banner "Cannot reach the quest server" | The backend is not running, or is on a different port than the frontend expects. |
| CORS error in the browser console | The frontend is not on `http://localhost:3000`, or `CLIENT_ORIGIN` does not match. |
| `EADDRINUSE` | Port already in use. Change `PORT` in `backend/.env` and set `VITE_API_URL` to match. |

---

## Author

**Christy**
Third-year B.Tech Computer Science and Engineering
Mar Baselios College of Engineering and Technology, Thiruvananthapuram

Repository: `https://github.com/Christyjohntharakan/questlog`
