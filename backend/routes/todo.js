import express from "express";
const router = express.Router();

import Todo from "../models/Todo.js";

// Get all todos
router.get("/", async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// Create a new todo
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  const saved = await newTodo.save();
  res.json(saved);
});

// Update a todo
router.put("/:id", async (req, res) => {
  const updated = await Todo.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(updated);
});

// Delete a todo
router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: "Todo deleted" });
});

export default router;
