const express = require("express");
const app = express();
const api = require("./routes/api.js");

//anything in the URL path /api uses the Router api
app.use("/api", api);


//other routes - static
app.use(express.static('../client/build'));