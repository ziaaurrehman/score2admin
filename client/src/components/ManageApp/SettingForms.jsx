import "../styles/toggleBtn.css";
import { AppInformation } from "./AppInformation";
import AndroidSettings from "./AndroidSettings";
//import IOS from "./IOS";
import Ads from "./Ads";
import BlockCountries from "./BlockCountries";

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
  ) : form === "AdsControl" ? (
    <>
      <Ads />
    </>
  ) : form === "BlockCountries" ? (
    <>
      <BlockCountries />
    </>
  ) : (
    <div>Other Settings</div>
  );
};

export default SettingForms;
