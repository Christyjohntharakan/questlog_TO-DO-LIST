// TaskItem.jsx
// One quest card: checkbox (B4), inline title edit, delete button (B5).
import { useState } from "react";
import { xpFor } from "../xp";

export default function TaskItem({ task, onToggle, onDelete, onRename }) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(task.title);

  // Save the edited title; ignore it if nothing changed.
  async function saveEdit() {
    const next = draft.trim();
    if (!next || next === task.title) {
      setDraft(task.title);
      setEditing(false);
      return;
    }
    const ok = await onRename(task._id, next);
    if (ok) setEditing(false);
  }

  function onKeyDown(e) {
    if (e.key === "Enter") saveEdit();
    if (e.key === "Escape") {
      setDraft(task.title);
      setEditing(false);
    }
  }

  return (
    <li className={`quest ${task.completed ? "done" : ""} diff-${task.difficulty || "medium"}`}>
      <input
        type="checkbox"
        className="check"
        checked={task.completed}
        onChange={() => onToggle(task)}
        aria-label={`Mark "${task.title}" ${task.completed ? "incomplete" : "complete"}`}
      />

      <div className="quest-body">
        {editing ? (
          <input
            className="edit-input"
            value={draft}
            autoFocus
            onChange={(e) => setDraft(e.target.value)}
            onBlur={saveEdit}
            onKeyDown={onKeyDown}
            aria-label="Edit quest title"
          />
        ) : (
          <span
            className="quest-title"
            onDoubleClick={() => setEditing(true)}
            title="Double-click to edit"
          >
            {task.title}
          </span>
        )}
        <span className="quest-meta">
          {task.difficulty || "medium"} · posted{" "}
          {new Date(task.createdAt).toLocaleDateString(undefined, {
            day: "numeric",
            month: "short",
          })}
        </span>
      </div>

      <span className="xp-tag">{task.completed ? "+" : ""}{xpFor(task)} XP</span>

      <button
        className="icon-btn"
        onClick={() => setEditing(true)}
        aria-label={`Edit "${task.title}"`}
        title="Edit"
      >
        ✎
      </button>
      <button
        className="icon-btn danger"
        onClick={() => onDelete(task._id)}
        aria-label={`Abandon "${task.title}"`}
        title="Abandon quest"
      >
        ✕
      </button>
    </li>
  );
}
