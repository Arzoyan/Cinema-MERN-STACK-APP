import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "./extraReducers";

const seatsSlice = createSlice({
  name: "seats",
  initialState: {
    seats: [],
    status: "idle", //  'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {
    bookSeat: (state, action) => {
      const { roomId, movieId, seatId } = action.payload;
      const key = `${roomId}_${movieId}`;
      if (!state.bookings[key]) {
        state.bookings[key] = [];
      }
      state.bookings[key].push(seatId);
    },
  },
  extraReducers: (builder) => extraReducers(builder),
});

export const selectSeats = (state) => state.seats.seats;
export const selectStatus = (state) => state.seats.status;

export const { bookSeat } = seatsSlice.actions;
export const selectBookedSeats = (state, roomId, movieId) =>
  state.seats.bookings[`${roomId}_${movieId}`] || [];

export default seatsSlice.reducer;
