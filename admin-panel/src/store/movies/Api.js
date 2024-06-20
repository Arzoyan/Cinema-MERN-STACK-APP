import { createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../../config";

const API_MOVIES = `${API_URL || "http://localhost:4000"}/api/movies/`;

export const fetchMovies = createAsyncThunk("movies/fetchMovies", async () => {
  const response = await fetch(API_MOVIES);
  const data = await response.json();
  return data;
});

export const fetchAddMovie = createAsyncThunk(
  "movies/fetchAddMovie",
  async (body) => {
    const formData = new FormData();
    for (let key in body) {
      if (body[key] instanceof File) {
        formData.append(key, body[key], body[key].name);
      } else if (body[key] instanceof Object) {
        formData.append(key, JSON.stringify(body[key]));
      } else {
        formData.append(key, body[key]);
      }
    }
    const response = await fetch(API_MOVIES, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    return data;
  },
);

export const fetchUpdateMovie = createAsyncThunk(
  "movies/fetchUpdateMovie",
  async ({ id, body }) => {
    const formData = new FormData();
    for (let key in body) {
      if (body[key] instanceof File) {
        formData.append(key, body[key], body[key].name);
      } else if (body[key] instanceof Object) {
        formData.append(key, JSON.stringify(body[key]));
      } else {
        formData.append(key, body[key]);
      }
    }

    const response = await fetch(`${API_MOVIES}/${id}`, {
      method: "PUT",
      body: formData,
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
