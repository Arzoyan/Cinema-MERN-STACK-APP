import { createAsyncThunk } from "@reduxjs/toolkit";
import API_URL from "../../config";

const API_SEATS = `${API_URL || "http://localhost:4000"}/api/seats`;

export const fetchSeats = createAsyncThunk("seats/fetchSeats", async (id) => {
  const response = await fetch(`${API_SEATS}/${id}`);
  const data = await response.json();
  return data;
});

export const updateSeat = createAsyncThunk(
  "seats/updateSeat",
  async ({ id, updatedData }) => {
    const response = await fetch(`${API_SEATS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });
    if (!response.ok) {
      throw new Error("Failed to update seat");
    }
    await response.json();

    return updatedData;
  },
);
