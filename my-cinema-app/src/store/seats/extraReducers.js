import { fetchSates, updateSeat } from "./Api";

export const extraReducers = (builder) => {
  builder
    .addCase(fetchSates.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchSates.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.seats = action.payload[0].seats;
    })
    .addCase(fetchSates.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    })
    .addCase(updateSeat.pending, (state) => {
      state.status = "loading";
    })
    .addCase(updateSeat.fulfilled, (state, action) => {
      const index = state.seats.findIndex(
        (seat) => seat.seatNumber === action.payload.seatNumber,
      );
      if (index !== -1) {
        state.seats[index] = action.payload;
      }
    })
    .addCase(updateSeat.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
};
