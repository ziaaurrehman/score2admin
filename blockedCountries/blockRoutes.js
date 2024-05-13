import express from "express";
import {
  getCountryArray,
  deleteCountry,
  createAndUpdateCountryArray,
} from "./blockController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const blockCountry = express.Router();

blockCountry.post(
  "/block-countries",
  authMiddleware,
  createAndUpdateCountryArray
);
blockCountry.delete("/unblock-country/:country", authMiddleware, deleteCountry);
blockCountry.get("/get-block-countries", getCountryArray);

export default blockCountry;
