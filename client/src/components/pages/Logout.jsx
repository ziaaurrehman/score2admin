import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../context/index.jsx";
import { toast } from "react-toastify";

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useUserContext();
  const [user, setUser] = useState({});

  useEffect(() => {
    const getUser = () => {
      const value = JSON.parse(localStorage.getItem("user"));
      setUser(value);
      if (!value) {
        toast.error("You must be logged in first..");
      } else {
        logout();
        const timeout = setTimeout(() => {
          navigate("/");
        }, 2000);

        return () => clearTimeout(timeout);
      }
    };

    getUser();
  }, [navigate, logout]);

  return (
    <div className="w-full min-h-screen flex justify-center items-center">
      {user ? (
        <p className="font-semibold">You are being logged out..</p>
      ) : null}
    </div>
  );
};

export default Logout;
