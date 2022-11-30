const express = require("express");
const app = express();
const api = require("./routes/api.cjs");

app.use('/api', api);
//other routes - static
app.use(express.static('../client/build'));

module.exports = app

