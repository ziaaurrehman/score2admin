import path from "path";
import express from "express";
import multer from "multer";
import fs from "fs";
import iosSettings from "./iosModel.js";

const iosUpdateSettingRoute = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "iosSettingupload/");
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
    cb("You're allowed to uopload images only", false);
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

iosUpdateSettingRoute.put(
  "/update-ios-setting/:id",
  upload.single("filename"),
  async (req, res) => {
    const {
      ios_privacy_policy,
      ios_terms_conditions,
      ios_app_share_link,
      app_default_page,
      notification_type,
      firebase_server_key,
      firebase_topic,
      required_enable_app,
      application_id,
      app_url,
      app_name,
      description,
    } = req.body;
    const { id } = req.params;
    const filename = req?.file?.filename;
    const ios = await iosSettings.findById(id);
    if (ios) {
      if (
        (ios_privacy_policy ||
          ios_terms_conditions ||
          ios_app_share_link ||
          app_default_page ||
          required_enable_app ||
          notification_type ||
          firebase_server_key ||
          firebase_topic ||
          required_enable_app,
        application_id || app_url || app_name || description || filename)
      ) {
        try {
          if (ios?.image?.length && filename?.length) {
            removeImage(ios?.image);
          }

          ios.general_settings = {
            ios_privacy_policy:
              ios_privacy_policy || ios.general_settings.ios_privacy_policy,
            ios_terms_conditions:
              ios_terms_conditions || ios.general_settings.ios_terms_conditions,
            ios_app_share_link:
              ios_app_share_link || ios.general_settings.ios_app_share_link,
            app_default_page:
              app_default_page || ios.general_settings.app_default_page,
            notification_type:
              notification_type || ios.general_settings.notification_type,
            firebase_server_key:
              firebase_server_key || ios.general_settings.firebase_server_key,
            firebase_topic:
              firebase_topic || ios.general_settings.firebase_topic,
          };
          ios.required_app = {
            required_enable_app:
              required_enable_app || ios.required_app.required_enable_app,
            application_id: application_id || ios.required_app.application_id,
            app_url: app_url || ios.required_app.app_url,
            app_name: app_name || ios.required_app.app_name,
            description: description || ios.required_app.description,
            logo: filename || ios.required_app.logo,
          };
          const ios_setting = await ios.save();
          res.status(200).json({
            success: true,
            message: "success",
            ios_setting,
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
          message: "Something went wrong",
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

export default iosUpdateSettingRoute;

const removeImage = (file) => {
  fs.unlink("./iosSettingupload/" + file, function (err) {
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
