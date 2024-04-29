import AppInformation from "./appInformationModel.js";

const createAppInformation = async (req, res) => {
  const {
    appName,
    app_unique_id,
    sports_api_base_url,
    sports_api_key,
    status,
    app_logo,
  } = req.body;
  if (
    appName &&
    app_unique_id &&
    sports_api_base_url &&
    status &&
    sports_api_key &&
    app_logo
  ) {
    try {
      const appInformation = new AppInformation({
        appName: appName,
        sports_api_base_url: sports_api_base_url,
        status: status,
        app_unique_id: app_unique_id,
        sports_api_key: sports_api_key,
        app_logo: app_logo,
      });
      const appInfo = await appInformation.save();

      res.status(200).json({
        success: true,
        message: "App Information added successfully",
        appInfo,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        mesaage: `${error?.message}`,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Please fill empty fields",
    });
  }
};
export { createAppInformation };
