import "../styles/toggleBtn.css";
import { AppInformation } from "./AppInformation";
import AndroidSettings from "./AndroidSettings";

const SettingForms = ({ form }) => {
  return form === "AppInformation" ? (
    <>
      <AppInformation />
    </>
  ) : form === "AndroidSettings" ? (
    <>
      <AndroidSettings />
    </>
  ) : form === "SocialLinks" ? (
    <div>SocialLinks</div>
  ) : form === "iOSSettings" ? (
    <div>iOS Settings</div>
  ) : form === "NotificationSettings" ? (
    <div>Notification Settings</div>
  ) : (
    <div>Other Settings</div>
  );
};

export default SettingForms;
