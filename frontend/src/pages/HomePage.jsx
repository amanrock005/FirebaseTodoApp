import AddTodo from "@/components/AddTodo";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { axiosInstance } from "@/lib/axios";
import { ClipboardPen, PlusCircle, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await axiosInstance.get("/todoList");
        setTodos(response.data);
      } catch (err) {
        console.error("error fetchign todos: ", err.message);
        setError("failed to fetch todos");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  const handleUpdateTodo = (id) => {
    navigate(`/update/${id}`);
  };

  const handleDeleteTodo = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this todo?"
    );
    if (!confirmDelete) return;

    try {
      await axiosInstance.delete(`/todoList/${id}`);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      console.log("Todo deleted successfully");
    } catch (err) {
      console.error("Error deleting todo:", err.message);
      alert("Failed to delete todo. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">To-Do List</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {todos.map((todo) => (
          <Card
            key={todo.id}
            className="shadow-md border border-gray-200 hover:shadow-lg transition-shadow duration-300 rounded-md"
          >
            <CardHeader>
              <h2 className="text-xl font-semibold text-gray-700">
                {todo.title || "Untitled"}
              </h2>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 text-sm mb-2">
                {todo.description || "No description provided."}
              </p>
              <span
                className={`inline-block px-3 py-1 text-xs font-medium rounded-md ${
                  todo.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : todo.status === "in progress"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {todo.status || "Unknown"}
              </span>
              <div className="flex justify-end gap-4 mt-4">
                <div
                  className="flex items-center gap-1 cursor-pointer text-gray-600 hover:text-blue-500 transition-colors"
                  onClick={() => handleUpdateTodo(todo.id)}
                >
                  <ClipboardPen className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm">Update Todo</span>
                </div>
                <div
                  className="flex items-center gap-1 cursor-pointer text-gray-600 hover:text-red-500 transition-colors"
                  onClick={() => handleDeleteTodo(todo.id)}
                >
                  <Trash2 className="w-5 h-5" />
                  <span className="hidden sm:inline text-sm">Delete Todo</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      <div
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-3 rounded-full shadow-lg cursor-pointer hover:bg-blue-600 transition-colors"
        onClick={() => setShowModal(true)}
      >
        <PlusCircle className="w-8 h-8" />
      </div>
      {showModal && <AddTodo setShowModal={setShowModal} setTodos={setTodos} />}
    </div>
  );
}
