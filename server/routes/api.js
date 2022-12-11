const jsonFetchReviews = require("../util/jsonFetchReviews")
const csvParse = require("../util/csvParse.js")
const unSquashedGamesJSON = require("../data/nonfinal_data/game_genres_shortened.json")
const getGames = require("../util/getTopAndLowGames")
const topPositiveGames = require("../data/nonfinal_data/positiveReviews.json")
const topNegativeGames = require("../data/nonfinal_data/negativeReviews.json")
const getDetailedGames = require("../util/jsonFetchGameDetails")
const insertInitialData = require("../util/seed")
const express = require("express");
const router = express.Router();
const db = require("../db/db");
const compression = require("compression");
const cache = require("memory-cache");

router.use(express.json());
router.use(compression());

//router to get all of the review
router.get("/", async (req, res)=>{
  db.collection = db.db.collection("totalReviews");
  let finishedData;
  try {
    finishedData = cache.get("totalReviews"); 
    if(!finishedData) {
      let allData = await db.readAll();
      finishedData = getGames.getTotalReviewData(allData)
      cache.put("totalReviews", finishedData)
    }
  } 
  catch (err) {
    finishedData = {"error": err};
  }
  return res.json(finishedData);
});

//router to get the positive game details
router.get("/positiveGamesDetails", async (req, res) => {
  db.collection = db.db.collection("positiveGamesDetails");
  let collections;
  try {
    collections = cache.get("positiveGamesDetails");
    if(!collections) {
      collections = await db.readAll();
      cache.put("positiveGamesDetails", collections);
    }
  } 
  catch (err) {
    collections = {"error": err};
  }
  return res.json(collections);
});

//router to ge the negative game details
router.get("/negativeGamesDetails", async (req, res) => {
  db.collection = db.db.collection("negativeGamesDetails");
  let collections;
  try {
    collections = cache.get("negativeGamesDetails");
    if (!collections) {
      collections = await db.readAll();
      cache.put("negativeGamesDetails", collections);
    }
  } 
  catch (err) {
    collections = {"error": err};
  }
  return res.json(collections);
});

//routes to get the ratio of the positive game details
router.get("/ratioPositiveGamesDetails", async (req, res) => {
  db.collection = db.db.collection("ratioPositiveGamesDetails");
  let collections;
  try {
    collections = cache.get("ratioPositiveGamesDetails");
    if (!collections) {
      collections = await db.readAll();
      cache.put("ratioPositiveGamesDetails", collections);
    }
  } 
  catch (err) {
    collections = {"error": err};
  }
  return res.json(collections);
});


//router to get the ratio of the negative game details
router.get("/ratioNegativeGamesDetails", async (req, res) => {
  db.collection = db.db.collection("ratioNegativeGamesDetails");
  let collections;
  try {
    collections = cache.get("ratioNegativeGamesDetails")
    if (!collections) {
      collections = await db.readAll();
      cache.put("ratioNegativeGamesDetails", collections);
    }
  } 
  catch (err) {
    collections = {"error": err};
  }
  return res.json(collections);
});










//<---------------------------------------------------UTILITY PATH--------------------------------------------->

//get the csv file data into a json Object
router.get("/csv", async (req, res) => {
  let jsonData = cache.get("csv");
  if (!jsonData) {
    jsonData = await csvParse.csvParse();
    cache.put("csv", jsonData)
  }
  res.json(jsonData)
});

//Transform the unorganized json to clean data
router.get("/organize", (req, res) => {
  let cleanJSON = cache.get("organize")
  if (!cleanJSON) {
    cleanJSON = csvParse.organizeJSONArray(unSquashedGamesJSON) 
    cache.put("organize", cleanJSON)
  }
  res.json(cleanJSON)
});

//Gets the total positive and negative reviews of any game starting from the :number appid.
//It loops by an arbitrary amount of times to not exceed the API request limit.
router.get("/numbers/:number", async (req, res) => {
  try{
    let reviews = cache.get("numberNumber");
    if (!reviews) {
      console.log("Starting fetch")
      reviews = await jsonFetchReviews(req.params.number);
      console.log("Finished fetch")
      cache.put("numberNumber", reviews);
    }
  } catch(err) {
    reviews = {"error": err};
  }
  res.json(reviews)
});

//Gets highest rated games and games with highest ratio of positive reviews/negative reviews
router.get("/positive", (req, res) => {
  let highestRatedGames = getGames.findHighestRatedGames()
  res.json(highestRatedGames)
});

//Gets lowest rated games and games with highest ratio of negative reviews/positive reviews
router.get("/negative", (req, res) => {
  let lowestRatedGames = getGames.findLowestRatedGames()
  res.json(lowestRatedGames)
});


//Gets details of highest rated games
router.get("/positive-details", async (req, res) => {
  let detailedGamesPositive = cache.get("positive-details");
  if(!detailedGamesPositive) {
    detailedGamesPositive = await getDetailedGames.jsonFetchPositiveGameDetails(topPositiveGames);
    cache.put("positive-details", detailedGamesPositive);
  }
  res.json(detailedGamesPositive)
});

//Gets details of lowest rated games
router.get("/negative-details", async (req, res) => {
  let detailedGamesNegative = cache.get("negative-details");
  if (!detailedGamesNegative) {
    detailedGamesNegative = await getDetailedGames.jsonFetchNegativeGameDetails(topNegativeGames);
    cache.put("negative-details", detailedGamesNegative)
  }
  res.json(detailedGamesNegative)
});

//Gets the final dataset for totalreviews and negative reviews
router.get("/finalReviews", (req, res) => {
  let finalReviewJSON = getGames.getTotalReviewData()
  res.json(finalReviewJSON)
})

//Populates the DB with the total review data
router.get("/initDB", async (req, res) => {
  await insertInitialData()
});


module.exports = router;