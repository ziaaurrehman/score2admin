import express from "express";
import { createAdminSettings, getAdminSettings } from "./adminController.js";

const administratorSettings = express.Router();

administratorSettings.post("/set-admin-settings", createAdminSettings);
administratorSettings.get("/get-admin-settings", getAdminSettings);

export default administratorSettings;
