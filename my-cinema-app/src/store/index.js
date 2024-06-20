import { configureStore } from "@reduxjs/toolkit";
import roomsReducer from "./room/slice";
import moviesReducer from "./movie/slice";
import seatsReducer from "./seats/slice";

export const store = configureStore({
  reducer: {
    rooms: roomsReducer,
    movies: moviesReducer,
    seats: seatsReducer,
  },
});
