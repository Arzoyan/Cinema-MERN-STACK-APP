import mongoose, { Document, Schema } from "mongoose";
const { ObjectId } = mongoose.Schema.Types;

export interface IMovie extends Document {
  title: string;
  time: string;
  description: string;
  image: string;
  roomId: mongoose.Schema.Types.ObjectId | string;
}

const movieSchema: Schema<IMovie> = new Schema<IMovie>(
  {
    title: {
      type: String,
      required: true,
      index: false,
      unique: false,
    },
    time: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
    roomId: {
      type: ObjectId,
      required: [true, "Please enter room Id"],
      ref: "Room",
    },
  },
  {
    timestamps: true,
  },
);

const Movie = mongoose.model<IMovie>("Movie", movieSchema);

export default Movie;
