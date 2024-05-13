import { createAndUpdateAdSettings, getAdSettings } from "./adController.js";
import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/google-ads-settings", authMiddleware, createAndUpdateAdSettings);
router.get("/get-ads-settings", getAdSettings);

export default router;
