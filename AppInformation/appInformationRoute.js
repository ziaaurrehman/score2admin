import express from "express";
import {
  getAppInformationSettings,
  createAndUpdateSettings,
  upload,
} from "./appInformationController.js";

const appInformationRouter = express.Router();

appInformationRouter.post(
  "/set-app-information",
  upload.single("filename"),
  createAndUpdateSettings
);
appInformationRouter.get("/get-app-information", getAppInformationSettings);

export default appInformationRouter;
