import mongoose, { Document, Schema } from "mongoose";
import { generateDefaultSeats } from "../utils/helpers";
const { ObjectId } = mongoose.Schema.Types;

export interface ISeat {
  seatNumber: string;
  status: "available" | "reserved" | "occupied"; // Example statuses
}
export interface ISeats extends Document {
  seats: ISeat[];
  movieId: mongoose.Schema.Types.ObjectId | string;
}

const seatSchema: Schema<ISeat> = new Schema<ISeat>({
  seatNumber: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["available", "reserved", "occupied"],
    default: "available",
  },
});

const seatsSchema: Schema<ISeats> = new Schema<ISeats>(
  {
    seats: {
      type: [seatSchema],
      required: true,
      default: generateDefaultSeats,
    },

    movieId: {
      type: ObjectId,
      required: [true, "Please enter movie Id"],
      ref: "Movie",
    },
  },
  {
    timestamps: true,
  },
);

const Seats = mongoose.model<ISeats>("Seats", seatsSchema);

export default Seats;
