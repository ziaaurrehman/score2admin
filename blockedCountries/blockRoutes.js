import express from "express";
import {
  blockCountry,
  unblockCountry,
  getBlockedCountries,
} from "./blockController.js";

const router = express.Router();

router.post("/blockCountry", blockCountry);
router.delete("/unblockCountry", unblockCountry);
router.get("/blocked", getBlockedCountries);

export default router;
