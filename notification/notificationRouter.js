import {
  createNotification,
  getAllNotifications,
  deleteNotification,
  sendNotification,
  getNotificationHistory,
} from "./notificationController.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const notificationRouter = express.Router();

// Public Route
notificationRouter.get("/get-all-notifications", getAllNotifications);
notificationRouter.get("/get-notification-history", getNotificationHistory);

// Protected Route
notificationRouter.post(
  "/create-notification",
  authMiddleware,
  createNotification
);
notificationRouter.delete(
  "/delete-notification/:id",
  authMiddleware,
  deleteNotification
);
notificationRouter.post(
  "/send-notification/:id",
  authMiddleware,
  sendNotification
);

export default notificationRouter;
