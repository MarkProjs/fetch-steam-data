const express = require("express");
const app = express();
const api = require("./routes/api.cjs");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Express API for JSONPlaceholder',
    version: '1.0.0',
  },
};
const options = {
  swaggerDefinition,
  //Paths to files containing OpenAPI definitions
  apis: ["./routes/*.cjs"],
}
const swaggerSpec = swaggerJSDoc(options);

//other routes - static
app.use(express.static('../client/build'));


