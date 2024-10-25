import React, { createContext, useContext, useState } from "react";
import useTodoApi from "../utils/useTodoApi";

const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const { todos, addTodo, updateTodo, deleteTodo, toggleTodo } = useTodoApi();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortByAlphabet, setSortByAlphabet] = useState(false);

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTodo,
        updateTodo,
        deleteTodo,
        toggleTodo,
        searchQuery,
        setSearchQuery,
        sortByAlphabet,
        setSortByAlphabet,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);
