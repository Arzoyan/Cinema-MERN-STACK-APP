import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counterSlice";
import roomsReducer from "./room/slice";
import moviesReducer from "./movies/slice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    rooms: roomsReducer,
    movies: moviesReducer,
  },
});
