import mongoose, { Document, Schema } from "mongoose";

export interface IRoom extends Document {
  name: string;
}

const roomSchema: Schema<IRoom> = new Schema<IRoom>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

const Room = mongoose.model<IRoom>("Room", roomSchema);

export default Room;
