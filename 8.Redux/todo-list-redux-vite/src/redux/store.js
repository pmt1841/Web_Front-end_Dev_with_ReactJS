import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../redux/todosReducer.js";

const store = configureStore({
    reducer: {
        todos: todosReducer,
    },
});

export default store;