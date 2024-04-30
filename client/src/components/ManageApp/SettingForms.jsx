import "../styles/toggleBtn.css";
import { AppInformation } from "./AppInformation";
import AndroidSettings from "./AndroidSettings";
import NotificationSettings from "./NotificationSettings";

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
    <>
      <NotificationSettings />
    </>
  ) : (
    <div>Other Settings</div>
  );
};

export default SettingForms;
