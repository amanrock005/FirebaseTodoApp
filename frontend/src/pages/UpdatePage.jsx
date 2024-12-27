import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "@/lib/axios";

export default function UpdatePage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [todo, setTodo] = useState({
    title: "",
    description: "",
    status: "pending",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const response = await axiosInstance.get(`/todoList/${id}`);
        setTodo(response.data);
      } catch (err) {
        console.error("Error fetching todo:", err.message);
        setError("Failed to load the todo details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTodo();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/todoList/${id}`, todo);
      alert("Todo updated successfully!");
      navigate("/");
    } catch (err) {
      console.error("Error updating todo:", err.message);
      setError("Failed to update the todo.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">
        Update Todo
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={todo.title}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={todo.description}
            onChange={handleInputChange}
            required
            rows="4"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            value={todo.status}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="pending">Pending</option>
            <option value="in progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        <div className="flex justify-end gap-4">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
