import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "./extraReducers";

const slice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => extraReducers(builder),
});

export const selectMovies = (state) => state.movies.movies;
export const selectMoviesStatus = (state) => state.movies.status;
export const selectMoviesError = (state) => state.movies.error;

export default slice.reducer;
