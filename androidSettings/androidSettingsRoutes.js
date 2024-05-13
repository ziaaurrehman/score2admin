import express from "express";
import {
  upload,
  createAndUpdateAndroid,
  getAndroidSettings,
} from "./androidSettingsController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const androidSettingRouter = express.Router();

androidSettingRouter.post(
  "/set-android-setting",
  upload.single("filename"),
  authMiddleware,
  createAndUpdateAndroid
);
androidSettingRouter.get("/get-android-setting", getAndroidSettings);

export default androidSettingRouter;
