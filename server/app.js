const express = require("express")
const jsonFetchReviews = require("./util/jsonFetchReviews")
const csvParse = require("./util/csvParse.js")
const unSquashedGamesJSON = require("./data/nonfinal_data/game_genres_shortened.json")
const getGames = require("./util/getTopAndLowGames")
const topPositiveGames = require("./data/nonfinal_data/positiveReviews.json")
const topNegativeGames = require("./data/nonfinal_data/negativeReviews.json")
const getDetailedGames = require("./util/jsonFetchGameDetails")

const app = express()
const port = 3001

app.use(express.static("public"))
//Utility paths
//get the csv file data into a json Object
app.get("/csv", async (req, res) => {
  const jsonData = await csvParse.csvParse()
  res.json(jsonData)
})

//Transform the unorganized json to clean data
app.get("/org", (req, res) => {
  const cleanJSON = csvParse.organizeJSONArray(unSquashedGamesJSON) 
  res.json(cleanJSON)
})

//Gets the total positive and negative reviews of any game starting from the :number appid.
//It loops by an arbitrary amount of times to not exceed the API request limit.
app.get("/api/:number", async (req, res) => {
  try{
    console.log("Starting fetch")
    let reviews = await jsonFetchReviews(req.params.number)
    res.json(reviews)
    console.log("Finished fetch")
  } catch(err) {
    console.error(err)
  }
})

app.get("/highest", (req, res) => {
  let highestRatedGames = getGames.findHighestRatedGames()
  res.json(highestRatedGames)
})

app.get("/lowest", (req, res) => {
  let lowestRatedGames = getGames.findLowestRatedGames()
  res.json(lowestRatedGames)
})

app.get("/details-positive", async (req, res) => {
  let detailedGamesPositive = await getDetailedGames(topPositiveGames) 
  res.json(detailedGamesPositive)
})

app.get("/details-negative", async (req, res) => {
  let detailedGamesNegative = await getDetailedGames(topNegativeGames)
  res.json(detailedGamesNegative)
})

//Non-Utility Paths
app.use((req, res) => {
  res.status(404).send("404 lol")
})

app.listen(port, () => {
  console.log("Listening to port 3001")
})