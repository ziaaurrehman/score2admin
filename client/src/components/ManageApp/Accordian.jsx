import { useState } from "react";
import SettingForms from "./SettingForms";
import { IoLogoAndroid, IoIosNotifications } from "react-icons/io";
import { FaAppStoreIos } from "react-icons/fa";
import { CiApple } from "react-icons/ci";
import { SiGoogleads } from "react-icons/si";
import { IoShareSocial } from "react-icons/io5";

const Accordion = ({ title, form }) => {
  const getImgComponent = () => {
    if (title === "Android Settings") {
      return <IoLogoAndroid className="h-10 w-10" />;
    } else if (title === "iOS Settings") {
      return <CiApple className="h-10 w-10" />;
    } else if (title === "App Information") {
      return <FaAppStoreIos className="w-10 h-10" />;
    } else if (title === "Ads Control") {
      return <SiGoogleads className="h-10 w-10" />;
    } else if (title === "Notification Settings") {
      return <IoIosNotifications className="h-10 w-10" />;
    } else if (title === "Social Links") {
      return <IoShareSocial className="h-10 w-10" />;
    }
  };
  const [isOpen, setIsOpen] = useState(false);

  const toggleContent = () => setIsOpen(!isOpen);

  return (
    <div className="accordion shadow-sm">
      <div
        className={` rounded-md flex justify-between items-center p-2 cursor-pointer bg-gray-200 hover:bg-gray-300 hover:rounded-md transition-all`}
        onClick={toggleContent}
      >
        <div className="flex gap-3 items-center">
          {getImgComponent()}
          <h2 className="font-bold">{title}</h2>
        </div>
        <span
          className={`text-2xl font-bold icon transition duration-300 ease-in-out transform rotate-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          +
        </span>
      </div>
      {isOpen && (
        <div className="p-3 bg-white rounded-md m-1 border shadow-sm border-gray-200">
          <SettingForms form={form} />
        </div>
      )}
    </div>
  );
};

export default Accordion;
