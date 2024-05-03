import express from "express";
import {
  blockCountry,
  unblockCountry,
  getBlockedCountries,
} from "./blockController.js";

const router = express.Router();

router.post("/manageApp/blockCountry", blockCountry);
router.delete("manageApp/unblockCountry", unblockCountry);
router.get("manageApp/blocked", getBlockedCountries);

export default router;
