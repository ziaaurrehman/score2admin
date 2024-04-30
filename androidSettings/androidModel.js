import mongoose from "mongoose";

const androidSettingSchema = mongoose.Schema({
  general_settings: {
    android_privacy_policy: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    android_terms_conditions: {
      type: String,
      required: true,
      trim: true,
    },
    android_app_share_link: {
      type: String,
      required: true,
      trim: true,
    },
    app_default_page: {
      type: String,
      required: true,
      trim: true,
    },
  },
  required_app: {
    required_enable_app: {
      type: String,
      required: true,
      trim: true,
    },
    application_id: {
      type: String,
      required: true,
      trim: true,
    },
    app_url: {
      type: String,
      required: true,
      trim: true,
    },
    app_name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    logo: {
      type: String,
      // required: true,
      trim: true,
    },
  },
});

const AndroidSetting = mongoose.model("Android-setting", androidSettingSchema);

export default AndroidSetting;
