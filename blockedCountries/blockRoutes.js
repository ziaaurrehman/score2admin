import express from "express";
import {
  getCountryArray,
  deleteCountry,
  createAndUpdateCountryArray,
} from "./blockController.js";

const blockCountry = express.Router();

blockCountry.post("/block-countries", createAndUpdateCountryArray);
blockCountry.delete("/unblock-country/:country", deleteCountry);
blockCountry.get("/get-block-countries", getCountryArray);

export default blockCountry;
