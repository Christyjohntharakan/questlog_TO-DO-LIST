// api.js
// Every call to the backend lives here, so components stay simple.
// B6: all actions go through fetch() and return JSON.

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks";

// Shared helper: sends the request, throws a readable Error if the server says no.
async function request(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || `Request failed (${res.status})`);
  }
  return data;
}

// GET /api/tasks
export const fetchTasks = () => request(API_URL);

// POST /api/tasks
export const createTask = (title, difficulty) =>
  request(API_URL, { method: "POST", body: JSON.stringify({ title, difficulty }) });

// PUT /api/tasks/:id  (changes can be { completed } or { title })
export const updateTask = (id, changes) =>
  request(`${API_URL}/${id}`, { method: "PUT", body: JSON.stringify(changes) });

// DELETE /api/tasks/:id
export const deleteTask = (id) => request(`${API_URL}/${id}`, { method: "DELETE" });
