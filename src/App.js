import React from "react";
import TodoList from "./components/TodoList";
import { TodoProvider } from "./store/TodoContext";

const App = () => {
  return (
    <TodoProvider>
      <div style={styles.mainDiv}>
        <h1 style={styles.title}>Список дел</h1>
        <TodoList />
      </div>
    </TodoProvider>
  );
};

export default App;

const styles = {
  mainDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
};
