import { Request, Response } from "express";
import RoomModel from "../../models/Room";

const createRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const room = await RoomModel.create(req.body);
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const getAllRooms = async (_: Request, res: Response): Promise<void> => {
  try {
    const room = await RoomModel.find({});
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const updateRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const room = await RoomModel.findByIdAndUpdate(id, req.body);
    if (!room) {
      res.status(404).json({ message: "product not found" });
      return;
    }
    const updatedProduct = await RoomModel.findById(id);
    res.status(200).json(updatedProduct);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const getSingleRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const room = await RoomModel.findById(id);

    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const deleteRoom = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const room = await RoomModel.findByIdAndDelete(id);

    if (!room) {
      res.status(404).json({ message: "product not found" });
      return;
    }
    res.status(200).json({ message: "product deleted successful" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export { createRoom, getAllRooms, updateRoom, getSingleRoom, deleteRoom };
