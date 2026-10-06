// App.jsx
// Owns all the state. Child components only display things and report clicks.
import { useEffect, useState } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api";
import { totalXp, xpFor } from "./xp";
import XpBar from "./components/XpBar";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]); // B2: tasks live in state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | done
  const [toast, setToast] = useState(""); // "+20 XP" popup

  // B2: fetch every task from the backend once, when the page loads
  useEffect(() => {
    fetchTasks()
      .then(setTasks)
      .catch(() => setError("Cannot reach the quest server. Is the backend running?"))
      .finally(() => setLoading(false));
  }, []);

  // Show a short popup, then hide it
  function flash(message) {
    setToast(message);
    setTimeout(() => setToast(""), 1600);
  }

  // Each handler returns true/false so the child knows whether it worked.

  // B3: add a quest
  async function handleAdd(title, difficulty) {
    try {
      const created = await createTask(title, difficulty);
      setTasks((prev) => [created, ...prev]); // no reload, just update state
      setError("");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  // B4: toggle complete / incomplete
  async function handleToggle(task) {
    try {
      const updated = await updateTask(task._id, { completed: !task.completed });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      if (updated.completed) flash(`Quest complete! +${xpFor(updated)} XP`);
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  // Edit the title (PUT with a new title)
  async function handleRename(id, title) {
    try {
      const updated = await updateTask(id, { title });
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)));
      setError("");
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  }

  // B5: delete a quest
  async function handleDelete(id) {
    try {
      await deleteTask(id);
      setTasks((prev) => prev.filter((t) => t._id !== id));
      setError("");
    } catch (err) {
      setError(err.message);
    }
  }

  const visible = tasks.filter((t) =>
    filter === "all" ? true : filter === "done" ? t.completed : !t.completed
  );
  const doneCount = tasks.filter((t) => t.completed).length;

  return (
    <main className="app">
      <header className="masthead">
        <h1>QuestLog</h1>
        <p className="muted">Turn your to-do list into an adventure.</p>
      </header>

      <XpBar xp={totalXp(tasks)} done={doneCount} total={tasks.length} />

      <TaskForm onAdd={handleAdd} />

      {error && (
        <div className="banner" role="alert">
          {error}
        </div>
      )}

      <nav className="tabs" aria-label="Filter quests">
        {[
          ["all", `All (${tasks.length})`],
          ["active", `Active (${tasks.length - doneCount})`],
          ["done", `Done (${doneCount})`],
        ].map(([key, label]) => (
          <button
            key={key}
            className={filter === key ? "tab on" : "tab"}
            onClick={() => setFilter(key)}
          >
            {label}
          </button>
        ))}
      </nav>

      {loading ? (
        <p className="empty">Unrolling the quest scroll...</p>
      ) : (
        <TaskList
          tasks={visible}
          filter={filter}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onRename={handleRename}
        />
      )}

      {toast && <div className="toast" role="status">{toast}</div>}

      <footer className="footer">
        Built by Christy John Tharakan · MBCET · Web Technology
      </footer>
    </main>
  );
}