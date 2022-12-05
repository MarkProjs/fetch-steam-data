const express = require("express")
const api = require("./routes/api.cjs");
const app = express()
const insertInitialData = require("./util/seed")


app.use('/api', api);


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