import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "./extraReducers";

const slice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => extraReducers(builder),
});

export const selectRooms = (state) => state.rooms.rooms;
export const selectRoomStatus = (state) => state.rooms.status;
export const selectRoomError = (state) => state.rooms.error;

export default slice.reducer;
