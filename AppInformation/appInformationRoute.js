import express from "express";
import { createAppInformation } from "./appInformationController.js";

const appInformationRouter = express.Router();

// appInformationRouter.post("/add-app-information", createAppInformation);

export default appInformationRouter;
