import React, { useState, useEffect } from "react";
import {
  getDatabase,
  ref,
  push,
  set,
  onValue,
  remove,
  update,
} from "firebase/database";
import { database } from "../firebase";

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByAlphabet, setSortByAlphabet] = useState(false);

  useEffect(() => {
    const todoRef = ref(database, "todos/");
    onValue(todoRef, (snapshot) => {
      const data = snapshot.val();
      const todosList = data
        ? Object.keys(data).map((key) => ({ id: key, ...data[key] }))
        : [];
      setTodos(todosList);
    });
  }, []);

  const addTodo = () => {
    const todoRef = ref(database, "todos/");
    const newTodoRef = push(todoRef);
    set(newTodoRef, { title: newTodo, completed: false });
    setNewTodo("");
  };

  const updateTodo = (id, updatedTodo) => {
    const todoRef = ref(database, `todos/${id}`);
    update(todoRef, updatedTodo);
  };

  const deleteTodo = (id) => {
    const todoRef = ref(database, `todos/${id}`);
    remove(todoRef);
  };

  const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };
    updateTodo(id, updatedTodo);
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
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Добавить новое дело"
      />
      <button onClick={addTodo} style={styles.button}>
        Добавить
      </button>

      <input
        type="text"
        value={searchQuery}
        onChange={handleSearch}
        placeholder="Поиск по делам"
        style={styles.searchInput}
      />

      <button onClick={handleSort} style={styles.button}>
        {sortByAlphabet ? "Сортировка по умолчанию" : "Сортировать по алфавиту"}
      </button>

      <ul style={styles.list}>
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={styles.listItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            <span>{todo.title}</span>
            <button onClick={() => deleteTodo(todo.id)} style={styles.button}>
              Удалить
            </button>
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
  },
  title: {
    textAlign: "center",
    color: "#333",
  },
  searchInput: {
    margin: "10px 0",
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
  },
  button: {
    marginLeft: "10px",
    marginRight: "10px",
    backgroundColor: "#87CEFA",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    padding: "5px 10px",
    cursor: "pointer",
  },
};

export default TodoList;
