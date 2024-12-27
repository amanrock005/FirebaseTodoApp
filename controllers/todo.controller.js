import { db } from "../lib/db.js";
import { Todo } from "../models/todo.model.js";

export const createTodo = async (req, res) => {
  const { title, description, status } = req.body;

  if (!title || !description) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }

  try {
    const newTodo = new Todo(title, description, status);
    const docRef = await db.collection("todos").add({
      title: newTodo.title,
      description: newTodo.description,
      status: newTodo.status,
      createdAt: newTodo.createdAt,
    });

    return res.status(201).json({ id: docRef.id, ...newTodo });
  } catch (err) {
    console.error("error createtodo controller ", err.message);
    return res.status(500).json({ message: "error creating to-do" });
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const snapshot = await db.collection("todos").get();
    const todos = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return res.status(200).json(todos);
  } catch (err) {
    console.error("error in getall todos controller ", err.message);
    return res.status(500).json({ message: "error fetching todos" });
  }
};

export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const validStatuses = ["pending", "in progress", "completed"];
  if (!title || !description || !validStatuses.includes(status)) {
    return res.status(400).json({
      message: "Title, description, and valid status are required",
    });
  }

  try {
    const todoRef = db.collection("todos").doc(id);
    const doc = await todoRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Todo not found" });
    }

    await todoRef.update({
      title,
      description,
      status,
      updatedAt: new Date(),
    });

    res.status(200).json({ id, title, description, status });
  } catch (err) {
    console.error("error updating todos: ", err.message);
    return res.status(500).json({ message: "error updating todo" });
  }
};

export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todoRef = db.collection("todos").doc(id);
    const doc = await todoRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "Todo not found" });
    }
    await todoRef.delete();

    return res.status(200).json({ message: "todo deleted successfully" });
  } catch (err) {
    console.error("error deleting todo: ", err.message);
    return res.status(500).json({ message: "error in delete todo controller" });
  }
};

export const getSingleTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todoRef = db.collection("todos").doc(id);
    const doc = await todoRef.get();

    if (!doc.exists) {
      return res.status(404).json({ message: "todo not found" });
    }
    res.status(200).json(doc.data());
  } catch (err) {
    console.error("error retrieving todo: ", err);
    res.status(500).json({ message: "intenal server error" });
  }
};
