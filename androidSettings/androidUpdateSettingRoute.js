import path from "path";
import express from "express";
import multer from "multer";
import fs from "fs";
import AndroidSetting from "./androidModel.js";
const androidUpdateSettingRoute = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "androidSettingupload/");
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

androidUpdateSettingRoute.put(
  "/update-android-setting/:id",
  upload.single("filename"),
  async (req, res) => {
    const {
      android_privacy_policy,
      android_terms_conditions,
      android_app_share_link,
      app_default_page,
      required_enable_app,
      application_id,
      app_url,
      app_name,
      description,
    } = req.body;
    const { id } = req.params;
    const filename = req?.file?.filename;
    const android = await AndroidSetting.findById(id);
    if (android) {
      if (
        android_privacy_policy ||
        android_terms_conditions ||
        android_app_share_link ||
        app_default_page ||
        required_enable_app ||
        application_id ||
        app_url ||
        app_name ||
        description ||
        filename
      ) {
        try {
          if (android?.image?.length && filename?.length) {
            removeImage(android?.image);
          }

          android.general_settings = {
            android_privacy_policy:
              android_privacy_policy ||
              android.general_settings.android_privacy_policy,
            android_terms_conditions:
              android_terms_conditions ||
              android.general_settings.android_terms_conditions,
            android_app_share_link:
              android_app_share_link ||
              android.general_settings.android_app_share_link,
            app_default_page:
              app_default_page || android.general_settings.app_default_page,
          };
          android.required_app = {
            required_enable_app:
              required_enable_app || android.required_app.required_enable_app,
            application_id:
              application_id || android.required_app.application_id,
            app_url: app_url || android.required_app.app_url,
            app_name: app_name || android.required_app.app_name,
            description: description || android.required_app.description,
            logo: filename || android.required_app.logo,
          };
          const android_setting = await android.save();
          res.status(200).json({
            success: true,
            message: "success",
            android_setting,
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

export default androidUpdateSettingRoute;

const removeImage = (file) => {
  fs.unlink("./androidSettingupload/" + file, function (err) {
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
