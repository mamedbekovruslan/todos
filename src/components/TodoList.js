import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByAlphabet, setSortByAlphabet] = useState(false);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/todos");
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Не удалось получить список дел:", error);
    }
  };

  const addTodo = async () => {
    const newTodoItem = { title: newTodo, completed: false };
    const response = await fetch("http://localhost:5000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodoItem),
    });
    const data = await response.json();
    setTodos([...todos, data]);
    setNewTodo("");
  };

  const toggleTodo = async (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };

    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTodo),
      });
      const data = await response.json();
      setTodos(todos.map((todo) => (todo.id === id ? data : todo)));
    } catch (error) {
      console.error("Не удалось обновить задачу:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSort = () => {
    setSortByAlphabet(!sortByAlphabet);
  };

  const filteredTodos = todos
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => (sortByAlphabet ? a.title.localeCompare(b.title) : 0));

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Список Дел</h2>
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Добавить новое дело"
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.button}>
          Добавить
        </button>
      </div>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearch}
          placeholder="Поиск по делам"
          style={styles.searchInput}
        />
        <button onClick={handleSort} style={styles.button}>
          {sortByAlphabet
            ? "Сортировка по умолчанию"
            : "Сортировать по алфавиту"}
        </button>
      </div>

      <ul style={styles.list}>
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={styles.listItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={styles.checkbox}
            />
            <Link to={`/task/${todo.id}`} style={styles.taskLink}>
              {todo.title.length > 50
                ? `${todo.title.slice(0, 50)}...`
                : todo.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "65%",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
  },
  title: {
    textAlign: "center",
    color: "#333",
    marginBottom: "20px",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    flex: "1",
    marginRight: "10px",
  },
  searchInput: {
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    flex: "1",
    marginRight: "10px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
    borderBottom: "1px solid #ddd",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#87CEFA",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "10px 15px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  checkbox: {
    marginRight: "10px",
  },
  taskLink: {
    textDecoration: "none",
    color: "#000",
    flex: "1",
  },
};

export default TodoList;
