import MatchList from "../ManageLive/MatchList";
import { Link, useLocation } from "react-router-dom";
import Location from "../global/Location";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import { useEffect, useState } from "react";
import Portal from "./Portal";
import { handleView, fetchMobileView } from "../../Api.js";
import { toast } from "react-toastify";

const ManageLive = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const view = await fetchMobileView();
        setMobileView(view.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  const [mobileView, setMobileView] = useState(true);
  const location = useLocation();
  const [isGrid, setIsGrid] = useState(false);
  const handleGrid = (gridValue) => {
    setIsGrid(gridValue);
  };
  const handleViewState = async () => {
    setMobileView((prevState) => !prevState);
    try {
      // Construct the view object using the updated state
      const view = {
        mobile_view: !mobileView, // Use !mobileView to reflect the updated state
      };
      const res = await handleView(view);
      if (res) {
        toast.success("Mobile View Updated!", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          progress: undefined,
          theme: "light",
        });
      }
    } catch (err) {
      console.error("Something went wrong");
    }
  };

  return (
    <>
      <Portal>
        <div className="flex flex-col min-h-screen bg-gray-100 p-3">
          <div className="flex justify-between p-2">
            <Location location={location} />
            <div className="flex items-center gap-x-5">
              <div className="flex gap-3 items-center">
                <p className="font-semibold">Show on Mobile</p>
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    value=""
                    className="sr-only peer"
                    checked={mobileView}
                    onChange={handleViewState}
                  />
                  <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <Link to="/manage-live/create-match">
                <button className="py-2 px-4 text-sm uppercase bg-blue-500 text-white rounded-md hover:bg-blue-700 transition active:scale-95 font-semibold">
                  Create a Match
                </button>
              </Link>
            </div>
          </div>

          <div className="p-2 flex justify-between">
            <input
              type="text"
              name="search"
              className="p-1 text-sm bg-white rounded-md border-2 border-gray-400 w-[200px] focus:w-[300px] transition-transform"
              placeholder="Search by name or ID"
            />

            <div className="flex gap-2 items-center p-2">
              <div className="p-1 h-max w-max bg-gray-100 rounded-md">
                <IoGrid
                  className="cursor-pointer"
                  onClick={() => handleGrid(true)}
                />
              </div>
              <div className="p-1 h-max w-max bg-gray-100 rounded-md">
                <FaList
                  className="cursor-pointer"
                  onClick={() => handleGrid(false)}
                />
              </div>
              <div className="flex gap-3">
                <p className="text-sm">Page Size: </p>
                <select className="bg-white rounded-md border-2 border-black h-max text-xs text-center pl-2">
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
              </div>
            </div>
          </div>
          <h3 className="text-xl m-3">ALL MATCHES</h3>
          <MatchList isGrid={isGrid} />
        </div>
      </Portal>
    </>
  );
};

export default ManageLive;
