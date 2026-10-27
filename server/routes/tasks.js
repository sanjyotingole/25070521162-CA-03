const express = require("express");
const Task = require("../models/Task");
const auth = require("../middleware/auth");

const router = express.Router();
router.use(auth); // every task route needs a logged-in user

const pick = (b) => {
  const out = {};
  ["title", "subject", "priority", "dueDate", "completed"].forEach((k) => {
    if (b[k] !== undefined) out[k] = b[k];
  });
  return out;
};

// GET /api/tasks  -> read this user's tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find({ user: req.userId }).sort({ completed: 1, dueDate: 1, createdAt: -1 });
  res.json(tasks);
});

// POST /api/tasks  -> create
router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.title.trim())
      return res.status(400).json({ message: "Task title is required." });
    const task = await Task.create({ ...pick(req.body), user: req.userId });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/tasks/:id  -> update (edit details or mark completed)
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.userId },
      pick(req.body),
      { new: true, runValidators: true }
    );
    if (!task) return res.status(404).json({ message: "Task not found." });
    res.json(task);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/tasks/:id  -> remove
router.delete("/:id", async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.userId });
    if (!task) return res.status(404).json({ message: "Task not found." });
    res.json({ message: "Task deleted." });
  } catch (err) {
    res.status(400).json({ message: "Invalid task id." });
  }
});

module.exports = router;
