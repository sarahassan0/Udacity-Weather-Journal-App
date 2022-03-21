// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

//Requrie dependencies "body-parser & cors "
const bodyParser = require("body-parser");
const cors = require("cors");
//loclhost port
const port = 8000;
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());

// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, () => {
  console.log(`Your server is running now on port ${port}`);
});

//POST route. to post data from client side to server side.
app.post("/addData", (request, response) => {
  const data = request.body;
  projectData = data;
  console.log(data);
  response.send(projectData);
});

//GET rout.  to send all data to client side.
app.get("/sendData", (request, response) => {
  response.send(projectData);
});
