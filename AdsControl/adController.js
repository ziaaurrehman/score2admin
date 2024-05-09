import AdModel from "./AdModel.js";

// Create ad function
const createAndUpdateAdSettings = async (req, res) => {
  try {
    const {
      ad_status,
      click_control,
      google_app_id,
      google_app_open_ads,
      google_banner_ads,
      google_interstitial_ads,
      google_adaptive_interstitial_ads,
      google_native_ads,
      google_rewarded_ads_code,
    } = req.body;

    // Check if ad settings already exist, if not create new, else update
    let adSettings = await AdModel.findOne();
    if (!adSettings) {
      adSettings = new AdModel({
        ad_status,
        click_control,
        google_app_id,
        google_app_open_ads,
        google_banner_ads,
        google_interstitial_ads,
        google_adaptive_interstitial_ads,
        google_native_ads,
        google_rewarded_ads_code,
      });
    } else {
      adSettings.ad_status = ad_status;
      adSettings.click_control = click_control;
      adSettings.google_app_id = google_app_id;
      adSettings.google_app_open_ads = google_app_open_ads;
      adSettings.google_banner_ads = google_banner_ads;
      adSettings.google_interstitial_ads = google_interstitial_ads;
      adSettings.google_adaptive_interstitial_ads =
        google_adaptive_interstitial_ads;
      adSettings.google_native_ads = google_native_ads;
      adSettings.google_rewarded_ads_code = google_rewarded_ads_code;
    }

    // Save the ad settings
    await adSettings.save();

    res
      .status(200)
      .json({ success: true, message: "Ad settings saved successfully." });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error saving ad settings.",
      error: error.message,
    });
  }
};

// Get Ad Settings function
const getAdSettings = async (req, res) => {
  try {
    const adSettings = await AdModel.findOne();
    if (!adSettings) {
      res
        .status(404)
        .json({ success: false, message: "Ad settings not found." });
    } else {
      res.status(200).json({ success: true, adSettings });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error retrieving ad settings.",
      error: error.message,
    });
  }
};

export { createAndUpdateAdSettings, getAdSettings };
