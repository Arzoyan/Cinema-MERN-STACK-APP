import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (roomId) => {
    const response = await fetch(
      `http://localhost:4000/api/movies/all/${roomId}`,
    );
    const data = await response.json();
    return data;
  },
);
