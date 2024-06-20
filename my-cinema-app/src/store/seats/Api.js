import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSates = createAsyncThunk("seats/fetchSates", async (id) => {
  const response = await fetch(`http://localhost:4000/api/seats/${id}`);
  const data = await response.json();
  return data;
});

export const updateSeat = createAsyncThunk(
  "seats/updateSeat",
  async ({ id, updatedData }) => {
    const response = await fetch(`http://localhost:4000/api/seats/${id}`, {
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
