import Matches from "./matchModel.js";
import MobileView from "./viewModel.js";
import MatchOrder from "./matchOrder.js";

// Create match
const createMatch = async (req, res) => {
  const {
    sport_type,
    league_type,
    match_title,
    match_time,
    status,
    fixture_id,
    hot_match,
    team_one,
    team_two,
    streaming_source,
  } = req.body;
  if (
    sport_type &&
    league_type &&
    match_time &&
    status &&
    match_title &&
    team_one &&
    team_two &&
    streaming_source
  ) {
    try {
      const documentCount = (await Matches.countDocuments({})) - 1;
      const newOrder = documentCount + 1;

      const newMatch = new Matches({
        sport_type: sport_type,
        match_time: match_time,
        status: status,
        league_type: league_type,
        match_title: match_title,
        fixture_id: fixture_id,
        hot_match: hot_match,
        team_one: team_one,
        team_two: team_two,
        streaming_source: streaming_source,
        order: newOrder,
      });
      const match = await newMatch.save();

      res.status(200).json({
        success: true,
        message: "Match created successfully",
        match,
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({
        success: false,
        mesaage: `${error?.message}`,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Please fill empty fields",
    });
  }
};

// Get paginated matches
const getMatches = async (req, res) => {
  // const page = parseInt(req.query.page) || 1;
  const perPage = parseInt(req.query.perPage) || 10;
  // const skip = (page - 1) * perPage;
  const searchQuery = req.query.search || "";

  try {
    const view = await MobileView.findOne();
    let query = {};
    if (req.query.search) {
      query.league_type = { $regex: searchQuery, $options: "i" };
    }

    // Count the total number of matches based on the query
    const totalCount = await Matches.countDocuments(query);
    // Fetch the paginated matches based on the query, sorting by league_type
    const matches = await Matches.find(query)
      .sort({ league_type: 1 })
      // .skip(skip)
      .limit(perPage);

    const totalPages = Math.ceil(totalCount / perPage);

    res.status(200).json({
      success: true,
      message: "Matches",
      mobile_view: view.mobile_view,
      totalPages,
      paginatedMatches: matches,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get match by ID
const getMatchById = async (req, res) => {
  const { id } = req.params;
  try {
    const match = await Matches.findById(id);

    res.status(200).json({
      success: true,
      message: "Single match",
      match,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      mesaage: `${error?.message}`,
    });
  }
};

// Update a match
const updateMatch = async (req, res) => {
  const { id } = req.params;
  const {
    sport_type,
    league_type,
    match_title,
    match_time,
    status,
    fixture_id,
    hot_match,
    team_one,
    team_two,
    streaming_source,
  } = req.body;
  if (id) {
    if (
      sport_type ||
      league_type ||
      match_time ||
      status ||
      match_title ||
      team_one ||
      team_two ||
      streaming_source ||
      fixture_id ||
      hot_match
    ) {
      try {
        await Matches.findByIdAndUpdate(id, {
          sport_type: sport_type,
          match_time: match_time,
          status: status,
          league_type: league_type,
          match_title: match_title,
          fixture_id: fixture_id,
          hot_match: hot_match,
          team_one: team_one,
          team_two: team_two,
          streaming_source: streaming_source,
        });
        res.status(200).json({
          success: true,
          message: "Match Updated Successfully",
        });
      } catch (error) {
        res.status(400).json({
          success: false,
          message: `${error?.message}`,
        });
      }
    } else {
      res.status(400).json({
        success: false,
        message: "Please enter field you need to update",
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Something wents wrong",
    });
  }
};

// Delete match by ID
const deleteMatchById = async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      await Matches.findByIdAndDelete({ _id: id });
      res.status(200).json({
        success: true,
        message: "Match deleted successfully",
      });
    } else {
      res.status(500).json({
        success: false,
        message: "You are not able to delete this",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `${error?.message}`,
    });
  }
};

// Duplicate a match
const duplicateMatchById = async (req, res) => {
  const { id } = req.params;
  try {
    const originalMatch = await Matches.findById(id);

    if (!originalMatch) {
      return res.status(404).json({
        success: false,
        message: "Match not found",
      });
    }

    const newMatch = new Matches({
      sport_type: originalMatch.sport_type,
      league_type: originalMatch.league_type,
      match_title: originalMatch.match_title,
      match_time: originalMatch.match_time,
      status: originalMatch.status,
      fixture_id: originalMatch.fixture_id,
      hot_match: originalMatch.hot_match,
      team_one: originalMatch.team_one,
      team_two: originalMatch.team_two,
      streaming_source: originalMatch.streaming_source,
    });

    // Save the new match to the database
    const savedMatch = await newMatch.save();

    res.status(200).json({
      success: true,
      message: "Match duplicated successfully",
      duplicatedMatch: savedMatch,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// Create / View Mobile view
const CreateOrUpdateMobileView = async (req, res) => {
  const { mobile_view } = req.body;
  try {
    let view = await MobileView.findOne();

    if (!view) {
      view = new MobileView({ mobile_view: mobile_view });
      await view.save();
    } else {
      view.mobile_view = mobile_view;
      await view.save();
    }
    res.status(200).json({ success: true, data: mobile_view });
  } catch (err) {
    console.error("Error creating or updating mobile view:", err);
    res.status(500).json({ success: false, err: "Server error" });
  }
};

// Get mobile view
const getMobileView = async (req, res) => {
  try {
    const view = await MobileView.findOne();
    if (!view) {
      return res
        .status(404)
        .json({ success: false, message: "Mobile view not found" });
    }
    res.status(200).json({ success: true, data: view.mobile_view });
  } catch (err) {
    console.error("Error retrieving mobile view:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Create / Update order list
const updateNumbersArray = async (req, res) => {
  try {
    const { numbers } = req.body;

    // Check if the numbers array is provided
    if (!numbers || !Array.isArray(numbers)) {
      return res.status(400).json({ error: "Invalid numbers array" });
    }

    // Find the existing document or create a new one
    const order = await MatchOrder.findOneAndUpdate(
      {},
      { numbers },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({ status: true, data: order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// get matchOrder
const getMatchOrder = async (req, res) => {
  try {
    const order = await MatchOrder.findOne();
    res.status(200).json({ status: true, data: order });
  } catch (err) {
    res.status(500).json({ status: false, message: "Internal server error" });
  }
};

export {
  createMatch,
  getMatches,
  updateMatch,
  deleteMatchById,
  getMatchById,
  duplicateMatchById,
  CreateOrUpdateMobileView,
  getMobileView,
  updateNumbersArray,
  getMatchOrder,
};
