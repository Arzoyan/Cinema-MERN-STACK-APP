import { fetchMovies } from "./Api";

export const extraReducers = (builder) => {
  builder
    .addCase(fetchMovies.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchMovies.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.movies = action.payload;
    })
    .addCase(fetchMovies.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
};
