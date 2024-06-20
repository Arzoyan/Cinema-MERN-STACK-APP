import { createAsyncThunk } from "@reduxjs/toolkit";

const API_ROOMS = "http://localhost:4000/api/rooms/";

export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const response = await fetch(API_ROOMS);
  const data = await response.json();
  return data;
});

export const fetchAddRoom = createAsyncThunk(
  "rooms/fetchAddRoom",
  async (body) => {
    const response = await fetch(API_ROOMS, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  },
);

export const fetchUpdateRoom = createAsyncThunk(
  "rooms/fetchUpdateRoom",
  async ({ id, body }) => {
    const response = await fetch(`${API_ROOMS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const data = await response.json();
    return data;
  },
);

export const fetchDeleteRoom = createAsyncThunk(
  "rooms/fetchDeleteRoom",
  async (id) => {
    const response = await fetch(`${API_ROOMS}/${id}`, {
      method: "Delete",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });
    await response.json();
    return id;
  },
);
