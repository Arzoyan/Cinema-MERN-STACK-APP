import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (roomId) => {
    const response = await fetch(
      `https://cinema-server-mern.onrender.com/api/movies/all/${roomId}`,
    );
    const data = await response.json();
    return data;
  },
);
