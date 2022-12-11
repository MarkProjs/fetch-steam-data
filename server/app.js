const express = require("express")
const api = require("./routes/api.js");
const app = express();


app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use('/api', api);

//other routes - static
app.use(express.static('public'));

app.use((req, res) => {
  res.status(404).send("404 Error")
})

module.exports = app