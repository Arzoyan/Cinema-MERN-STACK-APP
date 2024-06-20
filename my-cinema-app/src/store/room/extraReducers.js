import { fetchRooms } from "./Api";

export const extraReducers = (builder) => {
  builder
    .addCase(fetchRooms.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchRooms.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.rooms = action.payload;
    })
    .addCase(fetchRooms.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
};
