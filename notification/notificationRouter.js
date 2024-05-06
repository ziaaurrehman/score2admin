import {
  createNotification,
  getAllNotifications,
  deleteNotification,
  sendNotification,
} from "./notificationController.js";
import express from "express";

const notificationRouter = express.Router();

notificationRouter.get("/get-all-notifications", getAllNotifications);
notificationRouter.post("/create-notification", createNotification);
notificationRouter.delete("/delete-notification/:id", deleteNotification);
notificationRouter.post("/send-notification/:id", sendNotification);

export default notificationRouter;
