import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createMatch,
  getMatches,
  getMatchById,
  deleteMatchById,
  updateMatch,
  duplicateMatchById,
} from "./matchController.js";

const matchRouter = express.Router();

// Public routes
matchRouter.get("/all-matches", getMatches);
matchRouter.get("/:id", getMatchById);

// Protected routes
matchRouter.post("/create-match", createMatch);
matchRouter.put("/match/:id", updateMatch);
matchRouter.delete("/delete-match/:id", deleteMatchById);
matchRouter.post("/duplicate/:id", duplicateMatchById);

export default matchRouter;
