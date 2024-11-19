import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../store/features/todos/todosActions";

const TodoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByAlphabet, setSortByAlphabet] = useState(false);

  const dispatch = useDispatch();
  const { items: todos, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = () => {
    if (newTodo.trim()) {
      const newTodoItem = { title: newTodo, completed: false };
      dispatch(addTodo(newTodoItem));
      setNewTodo("");
    }
  };

  const handleToggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id);
    const updatedTodo = { ...todo, completed: !todo.completed };
    dispatch(updateTodo({ id, updatedTodo }));
  };

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
  };

  const filteredTodos = todos
    .filter((todo) =>
      todo.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => (sortByAlphabet ? a.title.localeCompare(b.title) : 0));

  if (loading) return <p>Загрузка...</p>;
  if (error) return <p>Ошибка: {error}</p>;

  return (
    <div style={styles.container}>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Добавить новое дело"
      />
      <button onClick={handleAddTodo} style={styles.button}>
        Добавить
      </button>

      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Поиск по делам"
        style={styles.searchInput}
      />

      <button
        onClick={() => setSortByAlphabet(!sortByAlphabet)}
        style={styles.button}
      >
        {sortByAlphabet ? "Сортировка по умолчанию" : "Сортировать по алфавиту"}
      </button>

      <ul style={styles.list}>
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={styles.listItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleTodo(todo.id)}
            />
            <span>{todo.title}</span>
            <button
              onClick={() => handleDeleteTodo(todo.id)}
              style={styles.button}
            >
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
