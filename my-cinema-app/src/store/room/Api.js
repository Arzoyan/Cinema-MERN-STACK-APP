import API_URL from "../../config";
import { createAsyncThunk } from "@reduxjs/toolkit";

const API_ROOMS = `${API_URL || "http://localhost:4000/api"}/rooms/`;
console.log(
  "%cmy-cinema-appsrcstore\roomApi.js:5 API_URL",
  "color: #26bfa5;",
  API_URL,
);
export const fetchRooms = createAsyncThunk("rooms/fetchRooms", async () => {
  const response = await fetch(API_ROOMS);
  const data = await response.json();
  return data;
});
