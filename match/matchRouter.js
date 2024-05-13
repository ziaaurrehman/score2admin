import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createMatch,
  getMatches,
  getMatchById,
  deleteMatchById,
  updateMatch,
  duplicateMatchById,
  CreateOrUpdateMobileView,
  getMobileView,
} from "./matchController.js";

const matchRouter = express.Router();

// Protected routes
matchRouter.post("/mobile-view", authMiddleware, CreateOrUpdateMobileView);
matchRouter.post("/create-match", authMiddleware, createMatch);
matchRouter.put("/update-match/:id", authMiddleware, updateMatch);
matchRouter.delete("/delete-match/:id", authMiddleware, deleteMatchById);
matchRouter.post("/duplicate/:id", authMiddleware, duplicateMatchById);

// Public routes
matchRouter.get("/get-view", getMobileView);
matchRouter.get("/all-matches", getMatches);
matchRouter.get("/get-single-match/:id", getMatchById);

export default matchRouter;
