import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "./extraReducers";

const moviesSlice = createSlice({
  name: "movies",
  initialState: {
    movies: [],
    status: "idle", //  'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    resetStatus: (state) => {
      state.status = "idle";
    },
  },
  extraReducers: (builder) => extraReducers(builder),
});

export const selectMoviesByRoom = (state) => state.movies.movies;
export const selectMoviesStatus = (state) => state.movies.status;

export const { resetStatus } = moviesSlice.actions;

export default moviesSlice.reducer;
