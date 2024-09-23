import axios from "axios";
import League from "./leagueModel.js";
import AppInformation from "../AppInformation/appInformationModel.js";

// Function to get the latest API key
const getRapidAPIKey = async () => {
  try {
    const appInformation = await AppInformation.findOne();
    return appInformation.sports_api_key;
  } catch (err) {
    console.error("Error occurred while fetching API key: ", err);
    throw err;
  }
};

// Updated function to get Rapid API request config
const getRapidRequest = async (country) => {
  const apiKey = await getRapidAPIKey();
  return {
    method: "GET",
    url: "https://v3.football.api-sports.io/leagues",
    params: { country: country },
    headers: {
      "x-apisports-key": apiKey,
      "x-rapidapi-host": "v3.football.api-sports.io",
    },
  };
};

// Updated function to get fixtures request config
const getFixturesRequest = async (date) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  const isValidFormat = regex.test(date);

  if (!isValidFormat) return false;

  const dateParts = date.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  const day = parseInt(dateParts[2]);

  const dateObject = new Date(year, month, day);

  if (
    dateObject.getFullYear() === year &&
    dateObject.getMonth() === month &&
    dateObject.getDate() === day
  ) {
    const apiKey = await getRapidAPIKey();
    return {
      method: "GET",
      url: "https://v3.football.api-sports.io/fixtures",
      params: { date: date },
      headers: {
        "x-apisports-key": apiKey,
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    };
  } else {
    return false;
  }
};

// Updated getLeaguesRapid function
const getLeaguesRapid = async (req, res) => {
  try {
    const { country } = req.params;
    const rapidRequest = await getRapidRequest(country);

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

// Updated getFixturesRapid function
const getFixturesRapid = async (req, res) => {
  try {
    const { date } = req.body;

    if (!date) {
      return res.status(400).json({
        status: false,
        message: "Please enter the required field data for the request...",
      });
    }

    const rapidRequest = await getFixturesRequest(date);

    if (!rapidRequest) {
      return res.status(500).json({
        status: false,
        message: "Invalid date format",
      });
    }

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

export {
  getLeaguesRapid,
  setLeagues,
  getLeagues,
  getFixturesRapid,
  deleteLeague,
};
