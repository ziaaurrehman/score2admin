import express from "express";
import iosSettings from "./iosModel.js";

const iosGetSettingRoute = express.Router();

iosGetSettingRoute.get("/get-ios-setting/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const iosSetting = await iosSettings.findById(id);
    if (iosSetting) {
      res.status(200).json({
        success: true,
        message: "iOS setting found",
        ios_setting: iosSetting,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "iOS setting not found",
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

export default iosGetSettingRoute;
