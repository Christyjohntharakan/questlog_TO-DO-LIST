// TaskForm.jsx
// B3: form to post a new quest. Sends it up to App via onAdd, then clears the input.
import { useState } from "react";
import { XP_BY_DIFFICULTY } from "../xp";

export default function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [difficulty, setDifficulty] = useState("medium");
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault(); // stop the browser's full page reload
    if (!title.trim() || busy) return;

    setBusy(true);
    const ok = await onAdd(title, difficulty);
    setBusy(false);
    if (ok) setTitle(""); // clear the input only if the server accepted it
  }

  return (
    <form className="quest-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post a new quest..."
        aria-label="Quest title"
        maxLength={120}
      />

      <div className="difficulty" role="radiogroup" aria-label="Difficulty">
        {Object.entries(XP_BY_DIFFICULTY).map(([level, xp]) => (
          <button
            key={level}
            type="button"
            role="radio"
            aria-checked={difficulty === level}
            className={`chip chip-${level} ${difficulty === level ? "on" : ""}`}
            onClick={() => setDifficulty(level)}
          >
            {level} <small>+{xp}</small>
          </button>
        ))}
      </div>

      <button className="primary" type="submit" disabled={busy || !title.trim()}>
        {busy ? "Posting..." : "Accept Quest"}
      </button>
    </form>
  );
}
