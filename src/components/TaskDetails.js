import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetchTask();
  }, []);

  const fetchTask = async () => {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`);
      const data = await response.json();
      setTask(data);
    } catch (error) {
      console.error("Не удалось загрузить задачу:", error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      navigate("/");
    } catch (error) {
      console.error("Не удалось удалить задачу:", error);
    }
  };

  if (!task) {
    return <div style={styles.loading}>Загрузка задачи...</div>;
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Задача: {task.title}</h2>
      <p style={styles.description}>Описание: {task.description}</p>
      <div style={styles.buttonContainer}>
        <button onClick={handleDeleteTask} style={styles.button}>
          Удалить задачу
        </button>
        <button onClick={() => navigate(-1)} style={styles.button}>
          Назад
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    textAlign: "center",
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
    maxWidth: "500px",
    margin: "0 auto",
  },
  title: {
    fontSize: "2rem",
    color: "#343a40",
    marginBottom: "1rem",
  },
  description: {
    fontSize: "1.2rem",
    color: "#495057",
    marginBottom: "1.5rem",
  },
  buttonContainer: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    padding: "10px 20px",
    fontSize: "1rem",
    color: "#fff",
    backgroundColor: "#007bff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.5rem",
    color: "#6c757d",
  },
};

export default TaskDetails;
