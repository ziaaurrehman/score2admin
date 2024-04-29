import path from "path";
import express from "express";
import multer from "multer";
import fs from "fs";
import AppInformation from "./appInformationModel.js";
const appInformationUpdateRoute = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "appInformationupload/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname}`);
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png|jfif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Your allowed to uopload images only", false);
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
  limits: {
    fileSize: 5 * 1024 * 1024, // limit to 2MB
  },
});

appInformationUpdateRoute.put(
  "/update-app-information/:id",
  upload.single("filename"),
  async (req, res) => {
    const {
      appName,
      app_unique_id,
      sports_api_base_url,
      sports_api_key,
      status,
    } = req.body;
    const { id } = req.params;
    const filename = req?.file?.filename;
    const appInfo = await AppInformation.findById(id);
    if (appInfo) {
      if (
        appName ||
        app_unique_id ||
        sports_api_base_url ||
        status ||
        sports_api_key ||
        filename
      ) {
        try {
          if (appInfo?.image?.length && filename?.length) {
            removeImage(appInfo?.image);
          }

          appInfo.appName = appName || appInfo.appName;
          appInfo.app_unique_id = app_unique_id || appInfo.app_unique_id;
          appInfo.sports_api_base_url =
            sports_api_base_url || appInfo.sports_api_base_url;
          appInfo.status = status || appInfo.status;
          appInfo.sports_api_key = sports_api_key || appInfo.sports_api_key;
          appInfo.app_logo = filename ?? appInfo.app_logo;

          const appInfomation = await appInfo.save();
          res.status(200).json({
            success: true,
            message: "success",
            appInfomation,
          });
        } catch (error) {
          console.log(error, "error");
          res.status(400).json({
            success: false,
            message: `${error?.message}`,
          });
        }
      } else {
        res.status(400).json({
          success: false,
          message: "something wents wrong",
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "App Information not found",
      });
    }
  }
);

export default appInformationUpdateRoute;

const removeImage = (file) => {
  fs.unlink("./appInformationupload/" + file, function (err) {
    if (err && err.code == "ENOENT") {
      // file doens't exist
      console.info("File doesn't exist, won't remove it.");
    } else if (err) {
      // other errors, e.g. maybe we don't have enough permission
      console.error("Error occurred while trying to remove file");
    } else {
      console.info(`removed`);
    }
  });
};
