import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const response = await fetch("http://localhost:4000/api/rooms/");
  const data = await response.json();
  return data;
});
