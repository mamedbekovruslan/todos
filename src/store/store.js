import { createStore, applyMiddleware, combineReducers } from 'redux';
import gameReducer from "./features/todos/gameReducer";
import {thunk} from "redux-thunk";

const rootReducer = combineReducers({
  game: gameReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
