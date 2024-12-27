import { useState } from "react";
import { axiosInstance } from "@/lib/axios";

export default function AddTodo({ setShowModal, setTodos }) {
  const [newTodo, setNewTodo] = useState({ title: "", description: "" });
  const handleCreateTodo = async (e) => {
    e.preventDefault();

    if (!newTodo.title || !newTodo.description) {
      alert("Title and description are required");
      return;
    }

    try {
      const response = await axiosInstance.post("/todoList", newTodo);
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setNewTodo({ title: "", description: "" });
      setShowModal(false);
      console.log("Todo created successfully");
    } catch (err) {
      console.error("Error creating todo:", err.message);
      alert("Failed to create todo. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Add New Todo</h2>
        <form onSubmit={handleCreateTodo}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="title"
            >
              Title
            </label>
            <input
              id="title"
              type="text"
              className="w-full border border-gray-300 rounded-md p-2"
              value={newTodo.title}
              onChange={(e) =>
                setNewTodo((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-gray-700 mb-1"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full border border-gray-300 rounded-md p-2"
              rows="4"
              value={newTodo.description}
              onChange={(e) =>
                setNewTodo((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
            ></textarea>
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 bg-gray-300 rounded-md text-sm hover:bg-gray-400"
              onClick={() => setShowModal(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md text-sm hover:bg-blue-600"
            >
              Add Todo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
