const express = require("express")
const jsonFetchReviews = require("./util/jsonFetchReviews")
const csvParse = require("./util/csvParse.js")
const unSquashedGamesJSON = require("./data/nonfinal_data/game_genres_shortened.json")
const getGames = require("./util/getTopAndLowGames")
const topPositiveGames = require("./data/nonfinal_data/positiveReviews.json")
const topNegativeGames = require("./data/nonfinal_data/negativeReviews.json")
const getDetailedGames = require("./util/jsonFetchGameDetails")
const insertInitialData = require("./util/seed")
const api = require("./routes/api.cjs");
const app = express()


app.use('/api', api);
//Utility paths
//get the csv file data into a json Object
app.get("/csv", async (req, res) => {
  const jsonData = await csvParse.csvParse()
  res.json(jsonData)
})

//Transform the unorganized json to clean data
app.get("/organize", (req, res) => {
  const cleanJSON = csvParse.organizeJSONArray(unSquashedGamesJSON) 
  res.json(cleanJSON)
})

//Gets highest rated games and games with highest ratio of positive reviews/negative reviews
app.get("/positive", (req, res) => {
  let highestRatedGames = getGames.findHighestRatedGames()
  res.json(highestRatedGames)
})

//Gets lowest rated games and games with highest ratio of negative reviews/positive reviews
app.get("/negative", (req, res) => {
  let lowestRatedGames = getGames.findLowestRatedGames()
  res.json(lowestRatedGames)
})

//Gets details of highest rated games
app.get("/positive-details", async (req, res) => {
  let detailedGamesPositive = await getDetailedGames.jsonFetchPositiveGameDetails(topPositiveGames) 
  res.json(detailedGamesPositive)
})

//Gets details of lowest rated games
app.get("/negative-details", async (req, res) => {
  let detailedGamesNegative = await getDetailedGames.jsonFetchNegativeGameDetails(topNegativeGames)
  res.json(detailedGamesNegative)
})

//Populates the DB with the total review data
app.get("/initDB", async (req, res) => {
  await insertInitialData()
})

//other routes - static
app.use(express.static('../client/build'));

app.use((req, res) => {
  res.status(404).send("404 lol")
})

module.exports = app