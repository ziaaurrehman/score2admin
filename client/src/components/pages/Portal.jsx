import Sidebar from "../Navbar/Sidebar.jsx";
import { GiHamburgerMenu } from "react-icons/gi";
import User from "../Navbar/User.jsx";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Portal = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState({});
  const navigation = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    const value = JSON.parse(localStorage.getItem("user"));
    if (value) {
      setUser(value);
    } else {
      navigation("/");
    }
  };

  return (
    <div className="flex w-full">
      {user ? (
        <>
          <div>
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          </div>
          <div className="h-max w-full shadow-sm">
            <div className="bg-gray-300 p-2">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 justify-center items-center">
                  {isSidebarOpen ? (
                    ""
                  ) : (
                    <GiHamburgerMenu
                      className="text-3xl border-2 border-black rounded-full p-1 hover:text-gray-600 hover:border-gray-600 transition-colors cursor-pointer"
                      onClick={toggleSidebar}
                    />
                  )}
                  <div className="font-bold text-md">
                    <p className="p-2 m-2 border-2 border-black rounded-md">
                      Welcome Back:{" "}
                      <span className="text-blue-600">{user.name}</span>
                    </p>
                  </div>
                </div>
                <User name={"moiz khan"} imgSrc={user.img} />
              </div>
            </div>
            <div>{children}</div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default Portal;
