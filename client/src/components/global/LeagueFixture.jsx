import { useState, useEffect } from "react";
import Circle from "./LoadingSemiCircle";
import Football from "../../assets/ball-football-icon.svg";
import { Link } from "react-router-dom";
import { useUserContext } from "../../context";

const LeagueFixtures = ({ fixture }) => {
  const [loading, setLoading] = useState(false);
  const [fixtures, setFixtures] = useState([]);
  const { setFixtureInContext } = useUserContext();

  useEffect(() => {
    setLoading(true);
    const getFixtures = () => {
      try {
        setFixtures(fixture);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getFixtures();
  }, [fixture]);

  const handleLive = (currentFixture) => {
    setFixtureInContext(currentFixture);
  };

  return (
    <div className="flex flex-col gap-10 w-full">
      <div className="flex gap-3 items-center">
        <img src={Football} alt="league-emblem" width="30" height="30" />
        <h2 className="font-bold">DAILY FIXTURES</h2>
      </div>
      {loading ? (
        <Circle />
      ) : (
        <table>
          <thead>
            <tr>
              <th>Status</th>
              <th>League</th>
              <th>Team</th>
              <th>vs</th>
              <th>Team</th>
              <th>ID</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="">
            {fixtures.map((fixture) => (
              <tr className="text-center space-y-5" key={fixture.fixture.id}>
                <td>{fixture.fixture.status.short}</td>
                <td>
                  <div className="flex justify-center">
                    <img
                      src={fixture.league.logo}
                      alt={fixture.league.name}
                      width="30"
                      height="30"
                    />
                  </div>
                </td>
                <td className="flex gap-2 justify-center">
                  <img
                    src={fixture.teams.home.logo}
                    alt={fixture.teams.home.name}
                    width="20"
                    height="20"
                  />
                  {fixture.teams.home.name}
                </td>
                <td>vs</td>
                <td className="flex gap-2 justify-center">
                  <img
                    src={fixture.teams.away.logo}
                    alt={fixture.teams.away.name}
                    width="20"
                    height="20"
                  />
                  {fixture.teams.away.name}
                </td>
                <td>{fixture.fixture.id}</td>
                <td>
                  <Link
                    to={`/admin/manage-live/create-match?id=${fixture.fixture.id
                      }&date=${fixture.fixture.date.split("T")[0]}&homeName=${fixture.teams.home.name
                      }&homeLogo=${fixture.teams.home.logo}&awayName=${fixture.teams.away.name
                      }&awayLogo=${fixture.teams.away.logo}&matchTitle=${fixture.teams.home.name
                      } vs ${fixture.teams.away.name}&sports=${"football"}`}
                    className="p-2 text-sm m-1 text-white rounded-md shadow-md cursor-pointer bg-blue-600 hover:bg-blue-800 transition active:scale-95"
                  >
                    Add Live
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LeagueFixtures;
