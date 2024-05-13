import {
  getLeaguesRapid,
  setLeagues,
  getLeagues,
  deleteLeague,
  getFixturesRapid,
} from "./fixtureController.js";
import express from "express";

const fixtureRouter = express.Router();

fixtureRouter.get("/get-leagues-rapid/:country", getLeaguesRapid);
fixtureRouter.post("/set-leagues", setLeagues);
fixtureRouter.get("/get-leagues", getLeagues);
fixtureRouter.delete("/delete-league/:id", deleteLeague);
fixtureRouter.post("/get-fixture-rapid", getFixturesRapid);

export default fixtureRouter;
