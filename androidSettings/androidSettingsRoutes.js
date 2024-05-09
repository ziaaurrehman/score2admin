import express from "express";
import {
  upload,
  createAndUpdateAndroid,
  getAndroidSettings,
} from "./androidSettingsController.js";

const androidSettingRouter = express.Router();

androidSettingRouter.post(
  "/set-android-setting",
  upload.single("filename"),
  createAndUpdateAndroid
);
androidSettingRouter.get("/get-android-setting", getAndroidSettings);

export default androidSettingRouter;
