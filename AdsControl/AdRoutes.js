import { createAndUpdateAdSettings, getAdSettings } from "./adController.js";
import express from "express";

const router = express.Router();

router.post("/google-ads-settings", createAndUpdateAdSettings);
router.get("/get-ads-settings", getAdSettings);

export default router;
