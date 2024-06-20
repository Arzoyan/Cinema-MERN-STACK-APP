import { createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../../config";

const API_MOVIES = `${API_URL || "http://localhost:4000"}/api/movies/all`;

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (roomId) => {
    const response = await fetch(`${API_MOVIES}/${roomId}`);
    const data = await response.json();
    return data;
  },
);
