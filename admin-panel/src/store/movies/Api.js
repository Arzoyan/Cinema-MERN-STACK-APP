import { createAsyncThunk } from "@reduxjs/toolkit";

const API_MOVIES = "https://cinema-server-mern.onrender.com/api/movies/";

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetch(API_MOVIES);
  const data = await response.json();
  return data;
});

export const fetchAddMovie = createAsyncThunk(
  "movies/fetchAddMovie",
  async (body) => {
    const response = await fetch(API_MOVIES, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  },
);

export const fetchUpdateMovie = createAsyncThunk(
  "movies/fetchUpdateMovie",
  async ({ id, body }) => {
    const response = await fetch(`${API_MOVIES}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  },
);

export const fetchDeleteMovie = createAsyncThunk(
  "movies/fetchDeleteMovie",
  async (id) => {
    const response = await fetch(`${API_MOVIES}/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    await response.json();
    return id;
  },
);
