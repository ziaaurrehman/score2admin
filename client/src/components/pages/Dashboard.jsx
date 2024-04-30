import LoadingBall from "../global/LoadingBall";
import PropTypes from "prop-types";
import Portal from "./Portal";
import { fetchAllMatches } from "../../Api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchAllMatches();
        const { paginatedMatches } = response.data;
        const extractedMatches = paginatedMatches.map((match) => ({
          id: match._id,
          status: match.status,
        }));
        setMatches(extractedMatches);
      } catch (error) {
        toast.error("Error fetching data");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Portal>
        <div className="bg-gray-100 p-5 min-h-screen">
          {loading ? (
            <LoadingBall />
          ) : (
            <div className="flex gap-5">
              <div className="flex flex-col bg-purple-800 p-5 rounded-md m-1 justify-center items-center text-white h-[100px] w-[150px] cursor-pointer hover:bg-purple-600 transition-colors">
                <h3 className="text-3xl">{matches.length}</h3>
                <p className="mt-2 text-sm">Total Matches</p>
              </div>

              <div className="flex flex-col bg-purple-800 p-5 rounded-md m-1 justify-center items-center text-white h-[100px] w-[150px] cursor-pointer hover:bg-purple-600 transition-colors">
                <h3 className="text-3xl">0</h3>
                <p className="mt-2 text-sm">Total Apps</p>
              </div>

              <div className="flex flex-col bg-purple-800 p-5 rounded-md m-1 justify-center items-center text-white h-[100px] w-[150px] cursor-pointer hover:bg-purple-600 transition-colors">
                <h3 className="text-3xl">
                  {matches.filter((match) => match.status === "active").length}
                </h3>
                <p className="mt-2 text-sm">Total Live</p>
              </div>
            </div>
          )}
        </div>
      </Portal>
    </>
  );
};

Dashboard.propTypes = {
  list: PropTypes.array,
};

export default Dashboard;
