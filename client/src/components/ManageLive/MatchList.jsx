import { BsSortUpAlt } from "react-icons/bs";
import { IoCopyOutline } from "react-icons/io5";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { MdDragIndicator } from "react-icons/md";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { deleteMatch, duplicateMatch } from "../../Api.js";
import LoadingBall from "../global/LoadingBall.jsx";
import { updateMatchOrder, getOrder } from "../../Api.js";
import { toast } from "react-toastify";
import PropTypes from "prop-types";
import { format, parseISO } from "date-fns";
import addMinutes from "date-fns/addMinutes";

const MatchList = ({ isGrid, matchesArray }) => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [runCount, setRunCount] = useState(0);

  const formatTime = (isoString) => {
    const date = parseISO(isoString);

    // Nepali Standard Time is UTC+5:45
    const nstDate = addMinutes(date, 345); // 5 hours * 60 minutes + 45 minutes = 345 minutes

    // Format the Date object to "YYYY-MM-DD hh:mm a"
    return format(nstDate, "yyyy-MM-dd hh:mm a");
  };

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const res = await myOrder();
        if (!res) {
          const orderValues = matchesArray.map((item) => item.order);
          const req = updateMatchOrder(orderValues);
          console.log(req.status);
          setMatches(matchesArray);
        } else {
          const arrangedMatches = sortObjectsByOrder(matchesArray.slice(), res);
          setMatches(arrangedMatches);
        }
      } catch (err) {
        console.error("Error: ", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [matchesArray]);

  // Arranging items
  function sortObjectsByOrder(arrayOfObjects, orderArray) {
    // Create a Set to store unique order values from the arrayOfObjects
    const uniqueOrders = new Set(arrayOfObjects.map((obj) => obj.order));

    // Filter the orderArray to only include values that exist in uniqueOrders
    const validOrders = orderArray.filter((order) => uniqueOrders.has(order));

    return arrayOfObjects.sort((a, b) => {
      const aIndex = validOrders.indexOf(a.order);
      const bIndex = validOrders.indexOf(b.order);

      if (aIndex === -1 && bIndex === -1) {
        // If both orders are not present in the validOrders array, maintain their original order
        return 0;
      }

      if (aIndex === -1) {
        // If a.order is not present in the validOrders array, move it to the end
        return 1;
      }

      if (bIndex === -1) {
        // If b.order is not present in the validOrders array, move it to the end
        return -1;
      }

      // Sort based on the order of elements in the validOrders array
      return aIndex - bIndex;
    });
  }

  const handleMoveUp = (index) => {
    if (index > 0) {
      const newItems = [...matches];
      [newItems[index - 1], newItems[index]] = [
        newItems[index],
        newItems[index - 1],
      ];
      setMatches(newItems);
    }
  };

  // get the order of the list items
  const myOrder = async () => {
    const res = await getOrder();
    return res;
  };

  useEffect(() => {
    if (runCount < 3) {
      setRunCount((prevRunCount) => prevRunCount + 1);
    }
    if (runCount >= 2) {
      const timeoutId = setTimeout(async () => {
        const newOrder = matches.map((item) => item.order);
        const res = await updateMatchOrder(newOrder);
        console.log(res.status);
        toast.success(`List reordered successfully`, {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }, 1000);

      return () => clearTimeout(timeoutId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matches]);

  const handleDelete = async (id) => {
    const res = await deleteMatch(id);
    setMatches(matches.filter((match) => match.id !== id));
    console.log(res);
  };
  const handleDuplicate = async (id) => {
    const res = await duplicateMatch(id);
    console.log(res);
    window.location.reload();
  };

  return (
    <main>
      {loading ? (
        <LoadingBall />
      ) : (
        <Reorder.Group
          axis={isGrid ? "x" : "y"}
          values={matches}
          onReorder={setMatches}
          className={`${isGrid ? "flex flex-wrap gap-1" : "flex flex-col"}`}
        >
          {matches.map((match, index) => (
            <Reorder.Item value={match} key={match.id}>
              {!isGrid ? (
                <div className="w-[100%] flex border-2 bg-white rounded-md">
                  <div className="flex justify-around items-center p-1 w-[50%]">
                    <div
                      id="team-1"
                      className="flex gap-5 items-center w-[35%]"
                    >
                      <div className="bg-white rounded-md border-2 border-gray-100 w-max p-2">
                        <img
                          src={match.team_one_img}
                          alt={match.team_one}
                          className="h-[50px] w-[50px]"
                        />
                      </div>
                      <h4 className="text-sm font-semibold">
                        {match.team_one}
                      </h4>
                    </div>

                    <div
                      id="match-info"
                      className="flex flex-col text-center w-[30%]"
                    >
                      <h3 className="text-sm font-semibold uppercase">
                        {match.league_type.split("-").join(" ")}
                      </h3>
                      <p className="text-gray-500 text-xs">
                        {formatTime(match.match_time)}
                      </p>
                      <p className="text-gray-500 text-sm">VS</p>
                    </div>

                    <div
                      id="team-2"
                      className="flex gap-5 justify-end items-center w-[35%]"
                    >
                      <h4 className="text-sm font-semibold flex text-end w-max">
                        {match.team_two}
                      </h4>
                      <div className="bg-white rounded-md border-2 border-gray-100 w-max p-2">
                        <img
                          src={match.team_two_img}
                          alt={match.team_two}
                          className="h-[50px] w-[50px]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="border-l-2 border-gray-100 w-[50%] flex justify-between items-center pl-2 text-sm">
                    <p className="w-[35%] overflow-hidden font-semibold">
                      Streams:{" "}
                      <span className="text-blue-500">
                        {match.stream_count}
                      </span>
                    </p>
                    <div
                      className={`w-max h-max p-1 rounded-md text-center shadow-md ${
                        match.status === "active"
                          ? "bg-green-400"
                          : "bg-red-400"
                      }`}
                    >
                      <p className=" text-white text-xs font-semibold">
                        {match.status === "active" ? "Active" : "Inactive"}
                      </p>
                    </div>
                    <div className="p-1 flex gap-4 text-xl w-max justify-end mr-5">
                      <BsSortUpAlt
                        className="cursor-pointer"
                        onClick={() => handleMoveUp(index)}
                      />
                      <IoCopyOutline
                        className="text-blue-400 cursor-pointer"
                        onClick={() => handleDuplicate(match.id)}
                      />
                      <Link to={`/admin/manage-live/edit/${match.id}`}>
                        <FiEdit className="text-blue-400 cursor-pointer" />
                      </Link>
                      <RiDeleteBin5Line
                        className="text-red-400 cursor-pointer"
                        onClick={() => handleDelete(match.id)}
                      />
                      <MdDragIndicator className="cursor-grab" />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-[240px] h-[250px] flex flex-col items-center border-2 bg-white rounded-md">
                  <div className="flex gap-2 items-center p-2">
                    <div id="team-1" className="flex flex-col items-center">
                      <h4 className="text-xs font-semibold text-center">
                        {match.team_one}
                      </h4>
                      <div className="bg-white rounded-md border-2 border-gray-100 w-max p-2">
                        <img
                          src={match.team_one_img}
                          alt=""
                          className="h-[70px] w-[60px]"
                        />
                      </div>
                    </div>
                    <p className="text-xs text-center">VS</p>
                    <div id="team-2" className="flex flex-col items-center">
                      <h4 className="text-xs font-semibold text-center">
                        {match.team_two}
                      </h4>
                      <div className="bg-white rounded-md border-2 border-gray-100 w-max p-2">
                        <img
                          src={match.team_two_img}
                          alt=""
                          className="h-[70px] w-[60px]"
                        />
                      </div>
                    </div>
                  </div>

                  <div id="match-info" className="flex flex-col text-center">
                    <h3 className="text-sm font-semibold uppercase">
                      {match.league_type}
                    </h3>
                    <p className="text-gray-500 text-xs">{match.match_time}</p>
                    <p className="text-xs">Stream 1</p>
                  </div>

                  <div className="p-2 border-l-2 border-gray-100 w-full flex justify-between items-center pl-2 text-xs">
                    <div
                      className={`w-max h-max p-1 rounded-md text-center shadow-md ${
                        match.status === "active"
                          ? "bg-green-400"
                          : "bg-red-400"
                      }`}
                    >
                      <p className=" text-white text-xs font-semibold">
                        {match.status === "active" ? "Active" : "Inactive"}
                      </p>
                    </div>
                    <div className="ml-3 p-1 flex gap-2 text-xl">
                      <BsSortUpAlt
                        className="cursor-pointer"
                        onClick={() => handleMoveUp(index)}
                      />
                      <IoCopyOutline
                        className="text-blue-400 cursor-pointer"
                        onClick={() => handleDuplicate(match.id)}
                      />
                      <Link to={`/admin/manage-live/edit/${match.id}`}>
                        <FiEdit className="text-blue-400 cursor-pointer" />
                      </Link>
                      <RiDeleteBin5Line
                        className="text-red-400 cursor-pointer"
                        onClick={() => handleDelete(match.id)}
                      />
                      <MdDragIndicator className="cursor-grab" />
                    </div>
                  </div>
                </div>
              )}
            </Reorder.Item>
          ))}
        </Reorder.Group>
      )}
    </main>
  );
};

const Team = PropTypes.shape({
  name: PropTypes.string,
  image: PropTypes.string,
});

const Match = PropTypes.shape({
  _id: PropTypes.string,
  sport_type: PropTypes.string,
  league_type: PropTypes.string,
  match_title: PropTypes.string,
  match_time: PropTypes.string,
  fixture_id: PropTypes.string,
  hot_match: PropTypes.bool,
  status: PropTypes.string,
  team_one: PropTypes.oneOfType([Team, PropTypes.any]),
  team_two: PropTypes.oneOfType([Team, PropTypes.any]),
  streaming_source: PropTypes.arrayOf(PropTypes.any), // Flexible for streaming source structure
  order: PropTypes.number,
  createdAt: PropTypes.string,
  updatedAt: PropTypes.string,
  __v: PropTypes.number,
});

MatchList.propTypes = {
  isGrid: PropTypes.bool,
  matchesArray: PropTypes.arrayOf(Match),
};

export default MatchList;
