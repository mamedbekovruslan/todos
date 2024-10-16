import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TaskDetails from "./components/TaskDetails";
import TodoList from "./components/TodoList";
import NotFound from "./components/NotFound"; // Страница ошибки 404

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Маршрут для главной страницы со списком дел */}
        <Route path="/" element={<TodoList />} />

        {/* Маршрут для страницы задачи с параметром ID */}
        <Route path="/task/:id" element={<TaskDetails />} />

        {/* Маршрут для страницы 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
