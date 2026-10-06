# QuestLog: a MERN To-Do List as an RPG Quest Board

A full-stack to-do list built with **MongoDB, Express.js, React and Node.js**.
Every task is a *quest* with a difficulty. Finishing quests earns XP, fills a level bar and raises your rank, from Novice Adventurer to Legend.

Built for **23CSB40B Web Technology, Assignment 2** (MBCET).

## Features

- Add, complete/uncomplete, edit and delete quests, all saved in MongoDB
- Difficulty per quest (easy +10 XP, medium +20 XP, hard +40 XP)
- Level and rank banner with an XP progress bar (100 XP per level)
- Filter tabs: All / Active / Done
- Inline edit (double-click a title or press the pencil)
- Server-side validation: blank titles are rejected with `400`
- CORS restricted to the frontend's address only

## Tech and structure

```
questlog/
├── backend/            Node.js + Express + Mongoose API
│   ├── server.js       app setup, CORS, MongoDB connection
│   ├── models/Task.js  Task schema
│   ├── routes/tasks.js REST endpoints
│   └── .env.example    variable names (copy to .env)
├── frontend/           React (Vite)
│   └── src/
│       ├── App.jsx             state + API calls
│       ├── api.js              fetch helpers
│       ├── xp.js               XP / level rules
│       └── components/         TaskForm, TaskList, TaskItem, XpBar
└── .gitignore          excludes node_modules and .env
```

## How to run

You need **Node.js 18+** and a MongoDB database (local install or a free MongoDB Atlas cluster).

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env        # on Windows: copy .env.example .env
```

Open `.env` and fill in the values:

| Variable | Meaning | Example |
|---|---|---|
| `MONGO_URI` | MongoDB connection string | `mongodb://127.0.0.1:27017/questlog` |
| `PORT` | API port (optional) | `5000` |
| `CLIENT_ORIGIN` | The only origin CORS allows | `http://localhost:3000` |

Then start it:

```bash
npm start
```

You should see `MongoDB connected` and `Server listening on port 5000`.

### 2. Frontend

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000**. The frontend talks to `http://localhost:5000/api/tasks` by default. To change that, copy `frontend/.env.example` to `frontend/.env` and edit `VITE_API_URL`.

## API reference

| Method | Endpoint | Body | Success | Errors |
|---|---|---|---|---|
| GET | `/api/tasks` | none | `200` list of tasks | `500` |
| POST | `/api/tasks` | `{ title, difficulty? }` | `201` created task | `400` empty title |
| PUT | `/api/tasks/:id` | `{ title?, completed?, difficulty? }` | `200` updated task | `400` empty title, `404` not found |
| DELETE | `/api/tasks/:id` | none | `200` message | `404` not found |

Task fields: `title` (String, required), `completed` (Boolean, default `false`), `createdAt` (Date, default now), plus the optional extra `difficulty` (`easy` / `medium` / `hard`, default `medium`).

## Screenshots

Add your screenshots to a `screenshots/` folder and list them here:

- `screenshots/add-task.png`
- `screenshots/complete-task.png`
- `screenshots/delete-task.png`
- `screenshots/merged-pull-requests.png`

## Author

Christy, Department of CSE, Mar Baselios College of Engineering and Technology.
