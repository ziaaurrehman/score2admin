import path from "path";
import express from "express";
import multer from "multer";
import iosSettings from "./iosModel.js";

const iosCreateSettingRoute = express.Router();

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

iosCreateSettingRoute.post(
  "/add-ios-setting",
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
    const filename = req?.file?.filename || "https://placehold.co/400";
    if (notification_type && firebase_server_key && firebase_topic) {
      try {
        if (filename) {
          const ios = new iosSettings({
            general_settings: {
              ios_privacy_policy: ios_privacy_policy,
              ios_terms_conditions: ios_terms_conditions,
              ios_app_share_link: ios_app_share_link,
              app_default_page: app_default_page,
              notification_type: notification_type,
              firebase_server_key: firebase_server_key,
              firebase_topic: firebase_topic,
            },
            required_app: {
              required_enable_app: required_enable_app,
              application_id: application_id,
              app_url: app_url,
              app_name: app_name,
              description: description,
              logo: filename,
            },
          });
          await ios.save();

          res.status(200).json({
            success: true,
            message: "Settings Updated successfully",
          });
        }
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
        message: "Please fill all empty fields",
      });
    }
  }
);

export default iosCreateSettingRoute;
