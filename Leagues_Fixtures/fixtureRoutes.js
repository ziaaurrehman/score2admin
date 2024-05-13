import {
  getLeaguesRapid,
  setLeagues,
  getLeagues,
  deleteLeague,
  getFixturesRapid,
} from "./fixtureController.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const fixtureRouter = express.Router();

// Protected Routes
fixtureRouter.post("/set-leagues", authMiddleware, setLeagues);
fixtureRouter.delete("/delete-league/:id", authMiddleware, deleteLeague);
fixtureRouter.post("/get-fixture-rapid", authMiddleware, getFixturesRapid);

// Public Routes
fixtureRouter.get("/get-leagues-rapid/:country", getLeaguesRapid);
fixtureRouter.get("/get-leagues", getLeagues);

export default fixtureRouter;
