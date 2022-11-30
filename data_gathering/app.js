const express = require("express")
const jsonFetch = require("./controllers/jsonFetch.js")

const app = express()
const port = 3001

app.use(express.static("public"))
app.use(express.json)

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