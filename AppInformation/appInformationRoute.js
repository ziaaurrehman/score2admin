import express from "express";
import {
  getAppInformationSettings,
  createAndUpdateSettings,
  upload,
} from "./appInformationController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const appInformationRouter = express.Router();

appInformationRouter.post(
  "/set-app-information",
  upload.single("filename"),
  authMiddleware,
  createAndUpdateSettings
);
appInformationRouter.get("/get-app-information", getAppInformationSettings);

export default appInformationRouter;
