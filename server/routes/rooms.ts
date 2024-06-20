import express from "express";
import {
  createRoom,
  getAllRooms,
  updateRoom,
  getSingleRoom,
  deleteRoom,
} from "../controllers/rooms";

// initialize router
const router = express.Router();

// POST at route:  create room
router.post("/", createRoom);

// GET at route: get All rooms
router.get("/", getAllRooms);

// PUT at route: Update room
router.put("/:id", updateRoom);

// GET at route: get single room
router.get("/:id", getSingleRoom);

// Delete at route: delete room
router.delete("/:id", deleteRoom);

export default router;
