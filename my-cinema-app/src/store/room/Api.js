import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const response = await fetch(
    "https://cinema-server-mern.onrender.com/api/rooms/",
  );
  const data = await response.json();
  return data;
});
