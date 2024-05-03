import BlockedCountry from "./blockModel.js";

// Controller function to handle blocking a country
export const blockCountry = async (req, res) => {
  const { country } = req.body;
  try {
    const blockedCountry = new BlockedCountry({ country });
    await blockedCountry.save();
    res.status(201).json({ message: `Successfully blocked ${country}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to handle unblocking a country
export const unblockCountry = async (req, res) => {
  const { country } = req.body;
  try {
    await BlockedCountry.findOneAndDelete({ country });
    res.json({ message: `Successfully unblocked ${country}` });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controller function to get the list of blocked countries
export const getBlockedCountries = async (req, res) => {
  try {
    const blockedCountries = await BlockedCountry.find();
    res.json(blockedCountries);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
