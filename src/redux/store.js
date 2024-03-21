import { configureStore } from "@reduxjs/toolkit";
import moviesReducers from "./reducers/movies";

export const store = configureStore({
reducer: { movies: moviesReducers } 
});