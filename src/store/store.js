import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk"; // Исправленный импорт
import todosReducer from "./features/todos/todosSlice";

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;
