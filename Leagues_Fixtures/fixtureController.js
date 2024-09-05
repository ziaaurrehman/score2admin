import axios from "axios";
import League from "./leagueModel.js";

const RapidAPiIKey = "d0e757645b65635c612f5dad12525aed";
// Request for league search
const getRapidRequest = (country) => {
  const rapidApi = {
    method: "GET",
    url: "https://v3.football.api-sports.io/leagues",
    params: { country: country },
    headers: {
      "x-apisports-key": RapidAPiIKey, // Use API-Sports key header
      "x-rapidapi-host": "v3.football.api-sports.io", // API-Sports host
    },
  };
  return rapidApi;
};

// Request for fixture search
const getFixturesRequest = (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  const isValidFormat = regex.test(date);

  // Check the validity of date string
  if (!isValidFormat) return false;

  // Check if the date itself is valid
  const dateParts = date.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  const day = parseInt(dateParts[2]);

  const dateObject = new Date(year, month, day);

  // Check if the date object is valid
  if (
    dateObject.getFullYear() === year &&
    dateObject.getMonth() === month &&
    dateObject.getDate() === day
  ) {
    const options = {
      method: "GET",
      url: "https://v3.football.api-sports.io/fixtures",
      params: { date: date },
      headers: {
        "x-apisports-key": RapidAPiIKey, // Use API-Sports key header
        "x-rapidapi-host": "v3.football.api-sports.io", // API-Sports host
      },
    };
    return options;
  } else {
    return false;
  }
};

// Fetch a league from rapid api (used for searching functionality)
const getLeaguesRapid = async (req, res) => {
  try {
    const { country } = req.params;
    const rapidRequest = getRapidRequest(country);

    const response = await axios.request(rapidRequest);
    const firstThreeItems = response.data.response.slice(0, 3);
    res.status(200).json({
      status: true,
      data: firstThreeItems,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error,
    });
    console.error(error);
  }
};

// Ftech saved leagues from db
const getLeagues = async (req, res) => {
  try {
    const leagues = await League.find();
    if (leagues) {
      res.status(200).json({
        found: true,
        data: leagues,
      });
    } else {
      res.status(400).json({
        found: false,
        error: "Leagues not found",
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err,
    });
  }
};

// Save a league
const setLeagues = async (req, res) => {
  try {
    const { id, name, logo, code } = req.body;
    if (name && logo) {
      const createLeague = new League({
        league_id: id,
        name: name,
        logo: logo,
        code: code,
      });
      const saveLeague = await createLeague.save();
      res.status(200).json({
        status: true,
        data: saveLeague,
      });
    } else {
      res.status(500).json({
        error: "Required name & logo not found...",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      error: err,
    });
  }
};

// Delete a league from DB
const deleteLeague = async (req, res) => {
  const { id } = req.params;
  try {
    const del = await League.findByIdAndDelete(id);
    res.status(200).json({
      status: true,
      deleted: del,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Internal server error",
      error: err,
    });
  }
};

// Get fixtures based on season / league ID from sports-api
const getFixturesRapid = async (req, res) => {
  try {
    const { date } = req.body;

    if (!date) {
      res.status(400).json({
        status: false,
        message: "Please enter the required field data for the request...",
      });
    }

    // Get a rapid request from the function
    const rapidRequest = getFixturesRequest(date);

    // If the response if false, we return an error
    if (!rapidRequest) {
      res.status(500).json({
        status: false,
        message: "Invalid date format",
      });
    }

    // Make a request to sports api for fixtures
    const response = await axios.request(rapidRequest);
    const firstTwentyItems = response.data.response.slice(0, 20);

    res.status(200).json({
      status: true,
      fixtures: firstTwentyItems,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error,
    });
    console.error(error);
  }
};

export {
  getLeaguesRapid,
  setLeagues,
  getLeagues,
  getFixturesRapid,
  deleteLeague,
};
