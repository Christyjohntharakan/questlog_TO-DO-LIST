// TaskList.jsx
// Renders the quests, or a friendly empty state.
import TaskItem from "./TaskItem";

export default function TaskList({ tasks, filter, ...handlers }) {
  if (tasks.length === 0) {
    const text =
      filter === "done"
        ? "No quests completed yet. Go earn some XP!"
        : filter === "active"
        ? "The board is clear. Time to rest, hero."
        : "The quest board is empty. Post your first quest above.";
    return <p className="empty">{text}</p>;
  }

  return (
    <ul className="quest-list">
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} {...handlers} />
      ))}
    </ul>
  );
}
