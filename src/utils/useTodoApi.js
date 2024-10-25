import { useState, useEffect } from "react";

const useTodoApi = () => {
  const [todos, setTodos] = useState([]);
  const baseUrl = "http://localhost:5000/todos";

  const fetchTodos = async () => {
    try {
      const response = await fetch(baseUrl);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Не удалось получить список дел:", error);
    }
  };

  const addTodo = async (title) => {
    try {
      const newTodo = { title, completed: false };
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
      });
      const data = await response.json();
      setTodos((prevTodos) => [...prevTodos, data]);
    } catch (error) {
      console.error("Не удалось добавить задачу:", error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      const response = await fetch(`${baseUrl}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTodo),
      });
      const data = await response.json();
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? data : todo))
      );
    } catch (error) {
      console.error("Не удалось обновить задачу:", error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("Не удалось удалить задачу:", error);
    }
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
      await updateTodo(id, { ...todo, completed: !todo.completed });
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    toggleTodo,
  };
};

export default useTodoApi;
