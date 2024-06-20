import { createSlice } from "@reduxjs/toolkit";
import { extraReducers } from "./extraReducers";

const roomsSlice = createSlice({
  name: "rooms",
  initialState: {
    rooms: [],
    status: "idle", //  'loading' | 'succeeded' | 'failed'
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => extraReducers(builder),
});

export const selectRooms = (state) => state.rooms.rooms;
export const selectRoomStatus = (state) => state.rooms.status;

export default roomsSlice.reducer;
