import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDb from "./config/db.js";
import router from "./user/userRoute.js";
import matchRouter from "./match/matchRouter.js";
import profileRoute from "./user/userProfileUpload.js";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import newsRoute from "./news/newUpload.js";
import newsUpdateRoute from "./news/newsupdate.js";
import newsRouter from "./news/newsRouter.js";
import appInformationRouter from "./AppInformation/appInformationRoute.js";
import appInformationCreateRoute from "./AppInformation/appInformationCreateRoute.js";
import appInformationUpdateRoute from "./AppInformation/appInformationUpdateRoute.js";
import androidCreateSettingRoute from "./androidSettings/androidCreateSettingsRoute.js";
import androidUpdateSettingRoute from "./androidSettings/androidUpdateSettingRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(cors());
app.use(express.json());

dotenv.config();

const MONGO_DB = process.env.MONGO_DB;
connectDb(MONGO_DB);

app.use("/api", router);
app.use("/api", matchRouter);
app.use(express.urlencoded({ extended: true, limit: "500mb" }));
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use("/newsuploads", express.static(path.join(__dirname, "/newsuploads")));
app.use(
  "/appInformationupload",
  express.static(path.join(__dirname, "/appInformationupload"))
);
app.use(
  "/androidSettingUpload",
  express.static(path.join(__dirname, "/androidSettingUpload"))
);
app.use("/api", profileRoute);
app.use("/api", newsRoute);
app.use("/api", newsUpdateRoute);
app.use("/api", newsRouter);
app.use("/api", appInformationRouter);
app.use("/api", appInformationCreateRoute);
app.use("/api", appInformationUpdateRoute);
app.use("/api", androidCreateSettingRoute);
app.use("/api", androidUpdateSettingRoute);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "./client/dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "./client/dist/index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running...");
  });
}

const PORT = process.env.PORT;
app.listen(PORT, (req, res) => {
  console.log(`server is running on port ${PORT}`);
});
