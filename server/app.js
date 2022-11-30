const express = require("express")
const jsonFetch = require("./controllers/jsonFetchReviews.js")
const csvParse = require("./controllers/csvParse.js")
const appIdJSON = require("./data/game_genres_modified.json")

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
  const cleanJSON = csvParse.organizeJSONArray(appIdJSON) 
  res.json(cleanJSON)
})

//Gets the total positive and negative reviews of any game starting from the :number appid.
//It loops by an arbitrary amount to not exceed the API request limit
app.get("/api/:number", async (req, res) => {
  try{
    console.log("Starting fetch")
    let reviews = await jsonFetch(req.params.number)
    res.json(reviews)
  } catch(err) {
    console.error(err)
  }
})

app.use((req, res) => {
  res.status(404).send("404 lol")
})

app.listen(port, () => {
  console.log("Listening to port 3001")
})