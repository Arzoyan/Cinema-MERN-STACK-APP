import express from "express";
import {
  createMovie,
  getAllMovie,
  getSingleMovie,
  updateMovie,
  deleteMovie,
  getAllMovieFromRoom,
} from "../controllers/movies";

// initialize router
const router = express.Router();

// POST at route:  create Movie
router.post("/", createMovie);

// GET at route: get All Movie by room
router.get("/all/:id", getAllMovieFromRoom);

// GET at route: get All Movie
router.get("/", getAllMovie);

// GET at route: get single room
router.get("/:id", getSingleMovie);

// PUT at route: Update room
router.put("/:id", updateMovie);

// Delete at route: delete room
router.delete("/:id", deleteMovie);

export default router;
