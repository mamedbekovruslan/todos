import { createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = "http://localhost:3000/todos";

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
  const response = await fetch(API_URL);
  return await response.json();
});

export const addTodo = createAsyncThunk("todos/addTodo", async (newTodo) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newTodo),
  });
  return await response.json();
});

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  return id;
});

export const updateTodo = createAsyncThunk(
  "todos/updateTodo",
  async ({ id, updatedTodo }) => {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedTodo),
    });
    return await response.json();
  }
);
