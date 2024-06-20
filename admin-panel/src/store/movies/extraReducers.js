import { notification } from "antd";
import {
  fetchMovies,
  fetchAddMovie,
  fetchDeleteMovie,
  fetchUpdateMovie,
} from "./Api";

const openNotification = (type, message) => {
  notification[type]({
    message: message,
  });
};

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
      openNotification("error", action.error.message);
    })
    .addCase(fetchAddMovie.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchAddMovie.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.movies = [...state.movies, action.payload];
      openNotification("success", "Add movie successfully");
    })
    .addCase(fetchAddMovie.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      openNotification("error", action.error.message);
    })
    .addCase(fetchDeleteMovie.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchDeleteMovie.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.movies = state.movies.filter((room) => room._id !== action.payload);
      openNotification("success", "Delete movie successfully");
    })
    .addCase(fetchDeleteMovie.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      openNotification("error", action.error.message);
    })
    .addCase(fetchUpdateMovie.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchUpdateMovie.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.movies = state.movies.map((room) => {
        return room._id !== action.payload._id ? room : action.payload;
      });
      openNotification("success", "Update movie successfully");
    })
    .addCase(fetchUpdateMovie.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      openNotification("error", action.error.message);
    });
};
