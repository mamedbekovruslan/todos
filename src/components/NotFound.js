import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Ошибка 404</h2>
      <p style={styles.text}>Страница не найдена</p>
      <Link to="/" style={styles.link}>
        Вернуться на главную
      </Link>
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
  },
  title: {
    fontSize: "3rem",
    color: "#dc3545",
    marginBottom: "1rem",
  },
  text: {
    fontSize: "1.5rem",
    color: "#6c757d",
    marginBottom: "1.5rem",
  },
  link: {
    fontSize: "1.2rem",
    color: "#007bff",
    textDecoration: "none",
    border: "1px solid #007bff",
    padding: "10px 20px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  },
};

export default NotFound;
