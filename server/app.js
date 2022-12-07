const express = require("express")
const api = require("./routes/api.cjs");
const app = express()



app.use('/api', api);


//other routes - static
app.use(express.static('public'));

app.use((req, res) => {
  res.status(404).send("404 Error")
})

module.exports = app