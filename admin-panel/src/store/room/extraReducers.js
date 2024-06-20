import { notification } from "antd";
import {
  fetchAddRoom,
  fetchDeleteRoom,
  fetchRooms,
  fetchUpdateRoom,
} from "./Api";

const openNotification = (type, message) => {
  notification[type]({
    message: message,
  });
};

export const extraReducers = (builder) => {
  builder
    .addCase(fetchRooms.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchRooms.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.rooms = action.payload;
    })
    .addCase(fetchRooms.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      openNotification("error", action.error.message);
    })
    .addCase(fetchAddRoom.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchAddRoom.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.rooms = [...state.rooms, action.payload];
      openNotification("success", "Room Added successfully");
    })
    .addCase(fetchAddRoom.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      openNotification("error", action.error.message);
    })
    .addCase(fetchDeleteRoom.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchDeleteRoom.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.rooms = state.rooms.filter((room) => room._id !== action.payload);
      openNotification("success", "Room Deleted successfully");
    })
    .addCase(fetchDeleteRoom.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      openNotification("error", action.error.message);
    })
    .addCase(fetchUpdateRoom.pending, (state) => {
      state.status = "loading";
    })
    .addCase(fetchUpdateRoom.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.rooms = state.rooms.map((room) => {
        return room._id !== action.payload._id ? room : action.payload;
      });
      openNotification("success", "Room Updated successfully");
    })
    .addCase(fetchUpdateRoom.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
      openNotification("error", action.error.message);
    });
};
