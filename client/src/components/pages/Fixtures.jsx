import DateSelector from "../global/DateSelector";
import LeagueFixtures from "../global/LeagueFixture";
import Location from "../global/Location";
import { useLocation } from "react-router-dom";
import Portal from "./Portal";

const Fixtures = () => {
  const location = useLocation();
  return (
    <>
      <Portal>
        <div className="w-full flex flex-col gap-5 bg-gray-100 p-5 min-h-screen">
          <div>
            <Location location={location} />
          </div>
          <div className="flex flex-col gap-10 bg-white shadow-md w-full mx-auto rounded-md p-5">
            <p className="font-bold">Pick Your Date</p>
            <DateSelector />
          </div>

          <div className="flex flex-col bg-white shadow-md w-full mx-auto rounded-md p-5">
            <LeagueFixtures leagueName="Bundesliga" />
          </div>
        </div>
      </Portal>
    </>
  );
};

export default Fixtures;
