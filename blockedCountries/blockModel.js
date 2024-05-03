import mongoose from "mongoose";

const blockedCountrySchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    unique: true,
  },
});

const BlockedCountry = mongoose.model("BlockedCountry", blockedCountrySchema);

export default BlockedCountry;
