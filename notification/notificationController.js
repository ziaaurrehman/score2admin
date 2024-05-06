import Notification from "./notificationModel.js";
import firebase from "../config/firebase.js";

// Create Notifications
const createNotification = async (req, res) => {
  const { title, body, image } = req.body;
  if (!title || !body) {
    res.status(500).json({
      status: false,
      message: "Please fill in all required fields...",
    });
  }
  try {
    const notification = new Notification({
      title: title,
      body: body,
      image: image,
    });
    const notif = await notification.save();
    res
      .status(200)
      .json({ status: true, message: "Notification Created", Item: notif });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Notification
const getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find(); // Fetch all notifications
    res.status(200).json({
      status: true,
      message: "Notifications retrieved",
      data: notifications,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete Notification
const deleteNotification = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      await Notification.findByIdAndDelete({ _id: id });
      res.status(200).json({
        success: true,
        message: "Notification deleted successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Invalid Notification ID.",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Send Notification to App
const sendNotification = async (req, res) => {
  try {
    const { id } = req.params;
    const notif = await Notification.findById(id);
    const { title, body, image } = notif;
    const topic = "SportsAdmin";
    const img = image || "";

    // Validating input
    if (!title || !body) {
      return res
        .status(400)
        .json({ message: "Missing required fields: title, body" });
    }

    const message = {
      data: {
        title: title,
        body: body,
        image: img,
      },
      topic: topic,
    };

    // Initliaze message function
    const { messaging } = firebase;

    // Send a message to devices subscribed to the provided topic.
    await messaging()
      .send(message)
      .then((response) => {
        console.log("Successfully sent message:", response);
        res.status(200).json({ message: "Notification sent!" });
      })
      .catch((error) => {
        console.log("Error sending message:", error);
        res.status(500).json({ message: "Internal Server Error" });
      });
  } catch (err) {
    console.error("Error processing notification:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
  createNotification,
  getAllNotifications,
  deleteNotification,
  sendNotification,
};
