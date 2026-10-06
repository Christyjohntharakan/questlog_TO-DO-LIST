// models/Task.js
// Mongoose schema for a "quest" (the assignment calls it a Task).
const mongoose = require("mongoose");

// Difficulty is an optional extra on top of the required fields.
// It decides how much XP a quest is worth on the frontend.
const DIFFICULTIES = ["easy", "medium", "hard"];

const taskSchema = new mongoose.Schema({
  // Required text of the task
  title: { type: String, required: [true, "Title is required"] },

  // false until the quest is finished
  completed: { type: Boolean, default: false },

  // when the quest was posted to the board
  createdAt: { type: Date, default: Date.now },

  // extra: easy = 10 XP, medium = 20 XP, hard = 40 XP (calculated in React)
  difficulty: { type: String, enum: DIFFICULTIES, default: "medium" },
});

module.exports = mongoose.model("Task", taskSchema);
module.exports.DIFFICULTIES = DIFFICULTIES;
