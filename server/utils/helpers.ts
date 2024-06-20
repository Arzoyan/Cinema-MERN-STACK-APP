import { ISeat } from "../models/Seats";

export const generateDefaultSeats = (): ISeat[] => {
  const seats: ISeat[] = [];
  const rows = 8;
  const cols = 8;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      seats.push({
        seatNumber: `${String.fromCharCode(65 + row)} ${col + 1}`, // Generates A1, A2, ..., H8
        status: "available",
      });
    }
  }

  return seats;
};
