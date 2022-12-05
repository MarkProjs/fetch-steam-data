const jsonFetchReviews = require("./util/jsonFetchReviews")
const csvParse = require("./util/csvParse.js")
const unSquashedGamesJSON = require("./data/nonfinal_data/game_genres_shortened.json")
const getGames = require("./util/getTopAndLowGames")
const topPositiveGames = require("./data/nonfinal_data/positiveReviews.json")
const topNegativeGames = require("./data/nonfinal_data/negativeReviews.json")
const getDetailedGames = require("./util/jsonFetchGameDetails")
const express = require("express");
const router = express.Router();

router.use(express.json());
//Utility paths
router.get("/", (req, res)=>{
    console.log(req.body);
    res.sendStatus(201).end();
});

//get the csv file data into a json Object
router.get("/csv", async (req, res) => {
  const jsonData = await csvParse.csvParse()
  res.json(jsonData)
})

//Transform the unorganized json to clean data
router.get("/organize", (req, res) => {
  const cleanJSON = csvParse.organizeJSONArray(unSquashedGamesJSON) 
  res.json(cleanJSON)
})

//Gets the total positive and negative reviews of any game starting from the :number appid.
//It loops by an arbitrary amount of times to not exceed the API request limit.
router.get("/:number", async (req, res) => {
    try{
      console.log("Starting fetch")
      let reviews = await jsonFetchReviews(req.params.number)
      res.json(reviews)
      console.log("Finished fetch")
    } catch(err) {
      console.error(err)
    }
})

//Gets highest rated games and games with highest ratio of positive reviews/negative reviews
router.get("/positive", (req, res) => {
  let highestRatedGames = getGames.findHighestRatedGames()
  res.json(highestRatedGames)
})

//Gets lowest rated games and games with highest ratio of negative reviews/positive reviews
router.get("/negative", (req, res) => {
  let lowestRatedGames = getGames.findLowestRatedGames()
  res.json(lowestRatedGames)
})



//Gets details of highest rated games
router.get("/positive-details", async (req, res) => {
  let detailedGamesPositive = await getDetailedGames.jsonFetchPositiveGameDetails(topPositiveGames) 
  res.json(detailedGamesPositive)
})

//Gets details of lowest rated games
router.get("/negative-details", async (req, res) => {
  let detailedGamesNegative = await getDetailedGames.jsonFetchNegativeGameDetails(topNegativeGames)
  res.json(detailedGamesNegative)
})
module.exports = router;