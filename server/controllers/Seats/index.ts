import { Request, Response } from "express";
import SeatsModel from "../../models/Seats";

const createSeat = async (body: { movieId: string }): Promise<void> => {
  try {
    await SeatsModel.create(body);
  } catch (error) {
    throw new Error();
  }
};

const getAllSeat = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const movie = await SeatsModel.find({ movieId: id });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const updateSeat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { movieId, seatNumber, status } = req.body;

    // Find the seats document by movieId
    const seatsDocument = await SeatsModel.findOne({ movieId });

    if (!seatsDocument) {
      res.status(404).json({ message: "Movie seats not found" });
      return;
    }
    // Find the seat by seatNumber
    const seatIndex = seatsDocument.seats.findIndex(
      (seat) => seat.seatNumber === seatNumber,
    );
    console.log(seatsDocument.seats, "seatsDocument.seats");
    if (seatIndex === -1) {
      //add  seat for reserve
      seatsDocument.seats.push({ seatNumber, status });
    } else {
      // Update the seat status
      seatsDocument.seats[seatIndex].status = status;
    }
    // Save the updated document
    await seatsDocument.save();

    res.status(200).json(seatsDocument);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const deleteSeats = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const seats = await SeatsModel.findByIdAndDelete(id);

    if (!seats) {
      res.status(404).json({ message: "seats not found" });
      return;
    }
    res.status(200).json({ message: "seats deleted successful" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export { createSeat, getAllSeat, updateSeat, deleteSeats };
