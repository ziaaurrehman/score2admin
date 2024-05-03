import express from "express";
import AndroidSetting from "./androidModel.js";

const androidGetSettingRoute = express.Router();

androidGetSettingRoute.get("/get-android-setting/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const androidSetting = await AndroidSetting.findById(id);
    if (androidSetting) {
      res.status(200).json({
        success: true,
        message: "Android setting found",
        android_setting: androidSetting,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Android setting not found",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

export default androidGetSettingRoute;
