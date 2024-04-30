import path from "path";
import express from "express";
import multer from "multer";
import AndroidSetting from "./androidModel.js";

const androidCreateSettingRoute = express.Router();

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

androidCreateSettingRoute.post(
  "/add-android-setting",
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
    const filename = req?.file?.filename;
    if (
      android_privacy_policy &&
      android_terms_conditions &&
      android_app_share_link &&
      app_default_page &&
      required_enable_app &&
      application_id &&
      app_url &&
      app_name &&
      description
    ) {
      try {
        if (filename) {
          const android = new AndroidSetting({
            general_settings: {
              android_privacy_policy: android_privacy_policy,
              android_terms_conditions: android_terms_conditions,
              android_app_share_link: android_app_share_link,
              app_default_page: app_default_page,
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
          await android.save();

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

export default androidCreateSettingRoute;
