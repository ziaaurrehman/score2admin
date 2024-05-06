import Portal from "./Portal";
import SingleLoadingBall from "../global/SingleLoadingBall.jsx";
import NotificationList from "../Notifications/NotificationList.jsx";
import { useState } from "react";
import { Link } from "react-router-dom";

const Notification = () => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Portal>
        <div className="bg-gray-100 p-5 min-h-screen">
          <div className="flex flex-col gap-5">
            <Link
              to="/notification/create-notification"
              className="w-full flex justify-end"
            >
              <button className=" text-sm h-max font-semibold bg-blue-600 py-2 px-4 text-white uppercase hover:bg-blue-800 transition active:scale-95 rounded-md shadow-lg">
                Create Notification
              </button>
            </Link>

            <div className="min-h-[400px] bg-white p-5 rounded-md shadow-md">
              {loading ? <SingleLoadingBall /> : <NotificationList />}
            </div>
          </div>
        </div>
      </Portal>
    </>
  );
};

export default Notification;
