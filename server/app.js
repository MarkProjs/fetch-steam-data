const express = require("express")
const jsonFetch = require("./controllers/jsonFetchReviews.js")
const csvParse = require("./controllers/csvParse.js")

const app = express()
const port = 3001

app.use(express.static("public"))

//get the csv file data into a json Object
app.get("/csv", async (req, res) => {
  const jsonData = await csvParse()
  res.json(jsonData)
})

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