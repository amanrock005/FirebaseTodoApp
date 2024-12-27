import express from "express";
import {
  createTodo,
  deleteTodo,
  getAllTodos,
  getSingleTodo,
  updateTodo,
} from "../controllers/todo.controller.js";

const router = express.Router();

router.post("/", createTodo); // Create a new to-do
router.get("/", getAllTodos); // Get all to-dos
router.get("/:id", getSingleTodo); // Get single to-do
router.put("/:id", updateTodo); // Update a specific to-do
router.delete("/:id", deleteTodo); // Delete a specific to-do

export default router;
