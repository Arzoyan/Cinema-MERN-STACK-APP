import { generateDefaultSeats, updateReservedSeats } from "../../utils/helpers";
import { fetchSeats, updateSeat } from "./Api";

export const extraReducers = (builder) => {
  builder
    .addCase(fetchSeats.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchSeats.fulfilled, (state, action) => {
      state.status = "succeeded";
      let statesList = generateDefaultSeats();
      if (action.payload[0].seats.length) {
        statesList = updateReservedSeats(statesList, action.payload[0].seats);
      }
      state.seats = statesList;
    })
    .addCase(fetchSeats.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    })
    .addCase(updateSeat.pending, (state, action) => {
      state.status = action.meta.arg.updatedData.seatNumber;
    })
    .addCase(updateSeat.fulfilled, (state, action) => {
      state.status = "succeeded";
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
