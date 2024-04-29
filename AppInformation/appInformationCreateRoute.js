import path from "path";
import express from "express";
import multer from "multer";
import AppInformation from "./appInformationModel.js";

const appInformationCreateRoute = express.Router();

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

appInformationCreateRoute.post(
  "/add-app-information",
  upload.single("filename"),
  async (req, res) => {
    const {
      appName,
      app_unique_id,
      sports_api_base_url,
      sports_api_key,
      status,
    } = req.body;
    const filename = req?.file?.filename;
    console.log(filename);
    if (
      appName &&
      app_unique_id &&
      sports_api_base_url &&
      status &&
      sports_api_key
    ) {
      try {
      
          if (filename) {
            const appInformation = new AppInformation({
              appName: appName,
              sports_api_base_url: sports_api_base_url,
              status: status,
              app_unique_id: app_unique_id,
              sports_api_key: sports_api_key,
              app_logo: filename,
            });
            await appInformation.save();

            res.status(200).json({
              success: true,
              message: "News created successfully",
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
        message: "something wents wrong",
      });
    }
  }
);

export default appInformationCreateRoute;
