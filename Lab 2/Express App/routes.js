const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.json());

//import the functions
//curly braces indicate we have imported the function/variable of the fie
const { logRequest } = require("./middleware");
const {
  readDataJsonFile,
  appendDataJsonFile,
  writeDataJsonFile,
  deleteDataJsonFile,
} = require("./file-module");

//routes
router.get("/middleware", logRequest, (req, res) => {
  console.log("We have implemented our first middleware!!");
});

router.get("/", (req, res) => {
  console.log("Welcome!");
});

router.get("/data", logRequest, (req, res) => {
  readDataJsonFile(req);
});
router.post("/data", logRequest, (req, res) => {
  const data = req.body.newData;
  writeDataJsonFile(JSON.stringify(data));
});
router.put("/data", logRequest, (req, res) => {
  const data = req.body;
  console.log(data);
  appendDataJsonFile(JSON.stringify(data));
});
router.delete("/data", logRequest, (req, res) => {
  deleteDataJsonFile(req);
});

//export routes to be used in other parts of the application
module.exports = router;
