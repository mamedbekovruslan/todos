import React from "react";
import TodoList from "./components/TodoList";

const App = () => {
  return (
    <div style={styles.mainDiv}>
      <h1 style={styles.title}>Список дел</h1>

      <TodoList />
    </div>
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
