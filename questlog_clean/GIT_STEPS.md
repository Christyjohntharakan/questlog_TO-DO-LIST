# Git and GitHub steps (Part C)

Delete this file before zipping if you like. It is only a guide.
Your commit history must be built up over time, with at least 5 meaningful commits. Run these in order, committing as you go.

## 0. One-time setup

1. On GitHub, create a **public** repository named `questlog` (no README, no .gitignore, empty).
2. In the project folder (the one containing `backend/` and `frontend/`):

```bash
git init -b main
git remote add origin https://github.com/<your-username>/questlog.git
```

## 1. First commit on main (needed so pull requests have a base)

```bash
git add .gitignore README.md
git commit -m "Add README and .gitignore"
git push -u origin main
```

## 2. Backend on `feature/backend`

```bash
git checkout -b feature/backend

git add backend/package.json backend/package-lock.json backend/.env.example
git commit -m "Initialise Node project and add .env.example"

git add backend/models
git commit -m "Add Task model"

git add backend/server.js
git commit -m "Add Express server with CORS and MongoDB connection"

git add backend/routes
git commit -m "Add GET, POST, PUT and DELETE task endpoints"

git push -u origin feature/backend
```

On GitHub: **Pull requests, New pull request**, base `main`, compare `feature/backend`, create it, then **Merge pull request**.

## 3. Frontend on `feature/frontend`

```bash
git checkout main
git pull origin main
git checkout -b feature/frontend

git add frontend/package.json frontend/package-lock.json frontend/vite.config.js frontend/index.html frontend/public frontend/.env.example frontend/.gitignore frontend/.oxlintrc.json
git commit -m "Scaffold React app with Vite"

git add frontend/src/api.js frontend/src/xp.js
git commit -m "Add API helpers and XP rules"

git add frontend/src/components
git commit -m "Add TaskForm, TaskList, TaskItem and XpBar components"

git add frontend/src/App.jsx frontend/src/main.jsx frontend/src/index.css
git commit -m "Connect App state to backend and add quest board styling"

git push -u origin feature/frontend
```

Open a second pull request (`feature/frontend` into `main`) and merge it.

## 4. Screenshots and final README

```bash
git checkout main
git pull origin main
git add screenshots README.md
git commit -m "Add screenshots"
git push origin main
```

(Committing screenshots straight to main conflicts with "do not commit directly to main". If you want to be strict, do this on a small `docs/screenshots` branch and merge it with a third pull request.)

## 5. Check before submitting

- `git log --oneline` shows 5 or more commits with clear messages
- Pull requests, Closed tab shows two merged PRs. Take your screenshot here.
- `.env` is **not** on GitHub, `.env.example` is
- Paste the repo URL into the file attached to the assignment
