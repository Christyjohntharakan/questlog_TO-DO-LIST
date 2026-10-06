// routes/tasks.js
// REST API for quests. Mounted at /api/tasks in server.js.
const express = require("express");
const mongoose = require("mongoose");
const Task = require("../models/Task");
const { DIFFICULTIES } = require("../models/Task");

const router = express.Router();

// Turn whatever the client sent into a clean title string.
// String() makes sure numbers/null/objects can't break trim().
function cleanTitle(value) {
  return String(value ?? "").trim();
}

// Reject malformed ids early so Mongoose does not throw a CastError.
function isValidId(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

// GET /api/tasks  -> all quests, newest first
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find().sort({ createdAt: -1 });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Could not fetch tasks" });
  }
});

// POST /api/tasks  -> create a quest (201 on success)
router.post("/", async (req, res) => {
  try {
    const title = cleanTitle(req.body.title);
    if (!title) {
      return res.status(400).json({ error: "Title cannot be empty" });
    }

    const task = { title };
    if (DIFFICULTIES.includes(req.body.difficulty)) {
      task.difficulty = req.body.difficulty;
    }

    const created = await Task.create(task);
    res.status(201).json(created);
  } catch (err) {
    res.status(500).json({ error: "Could not create task" });
  }
});

// PUT /api/tasks/:id  -> edit title and/or toggle completed
router.put("/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(404).json({ error: "Task not found" });
    }

    const updates = {};

    // Only touch the title if the client sent one, and validate it.
    if (req.body.title !== undefined) {
      const title = cleanTitle(req.body.title);
      if (!title) {
        return res.status(400).json({ error: "Title cannot be empty" });
      }
      updates.title = title;
    }

    if (typeof req.body.completed === "boolean") {
      updates.completed = req.body.completed;
    }

    if (DIFFICULTIES.includes(req.body.difficulty)) {
      updates.difficulty = req.body.difficulty;
    }

    // new: true returns the updated document
    const updated = await Task.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!updated) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Could not update task" });
  }
});

// DELETE /api/tasks/:id  -> remove a quest
router.delete("/:id", async (req, res) => {
  try {
    if (!isValidId(req.params.id)) {
      return res.status(404).json({ error: "Task not found" });
    }

    const deleted = await Task.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: "Task not found" });
    }
    res.json({ message: "Task deleted", id: deleted._id });
  } catch (err) {
    res.status(500).json({ error: "Could not delete task" });
  }
});

module.exports = router;
