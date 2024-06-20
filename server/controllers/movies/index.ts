import { Request, Response } from "express";
import MovieModel from "../../models/Movie";
import RoomModel from "../../models/Room";
import { createSeat } from "../Seats";

const createMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const movieByRoom = await MovieModel.find({
      roomId: req.body.roomId,
      time: req.body.time,
    });
    if (!movieByRoom.length) {
      const newMovieData = {
        ...req.body,
        image: (req as Request & { locals: { posterName: string } }).locals
          .posterName,
      };
      const movie = await MovieModel.create(newMovieData);
      createSeat({ movieId: movie._id });
      res.status(200).json(movie);
      return;
    }
    res
      .status(400)
      .json({ message: "in this room in this time already have move" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const getAllMovieFromRoom = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  try {
    const movie = await MovieModel.find({ roomId: id });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const getAllMovie = async (_: Request, res: Response): Promise<void> => {
  try {
    const movies = await MovieModel.find({});
    // Fetch room details for each movie and add the room name to the movie object
    const moviesWithRoomNames = await Promise.all(
      movies.map(async (movie) => {
        const room = await RoomModel.findById(movie.roomId);
        return {
          ...movie.toObject(),
          roomName: room ? room.name : "Unknown Room", // Assuming room object has a 'name' field
        };
      }),
    );
    res.status(200).json(moviesWithRoomNames);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const getAllMovies = async (_: Request, res: Response): Promise<void> => {
  try {
    // Fetch all movies
    const movies = await MovieModel.find({});
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const getSingleMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const movie = await MovieModel.findById(id);

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const updateMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const newMovieData = {
      ...req.body,
      image: (req as Request & { locals: { posterName: string } }).locals
        .posterName,
    };
    const movie = await MovieModel.findByIdAndUpdate(id, newMovieData);
    if (!movie) {
      res.status(404).json({ message: "movie not found" });
      return;
    }

    const updatedMovie = await MovieModel.findById(id);
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

const deleteMovie = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const movie = await MovieModel.findByIdAndDelete(id);

    if (!movie) {
      res.status(404).json({ message: "product not found" });
      return;
    }
    res.status(200).json({ message: "product deleted successful" });
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};

export {
  createMovie,
  getAllMovie,
  getSingleMovie,
  updateMovie,
  deleteMovie,
  getAllMovieFromRoom,
};
