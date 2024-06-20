import express from "express";
import { getAllSeat, updateSeat, deleteSeats } from "../controllers/Seats";

// initialize router
const router = express.Router();

// GET at route: get All Movie by room
router.get("/:id", getAllSeat);

// PUT at route: Update room
router.put("/:id", updateSeat);

// Delete at route: delete room
router.delete("/:id", deleteSeats);

export default router;
