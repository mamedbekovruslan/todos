import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskDetails from "./components/TaskDetails";
import TodoList from "./components/TodoList";
import NotFound from "./components/NotFound";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TodoList />} />

        <Route path="/task/:id" element={<TaskDetails />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
