const express = require("express");
const router = express.Router();
var bodyParser = require("body-parser");

router.use(bodyParser.json());

//import the functions
//curly braces indicate we have imported the function/variable of the fie
const { logRequest, apiKeyMiddleware, catchAll } = require("./middleware");
const {
  readDataJsonFile,
  appendDataJsonFile,
  writeDataJsonFile,
  deleteDataJsonFile,
} = require("./file-module");
const { osInfo } = require("./os-module");

//routes
router.get(`/middleware/:apiKey`, logRequest, apiKeyMiddleware, (req, res) => {
  console.log("We have implemented our first middleware!!");
  res.send("Successfully completed!!");
});

router.get("/:apiKey", logRequest, apiKeyMiddleware, (req, res) => {
  console.log("Welcome!");
  res.send("Successfully completed!!");
});

router.get("/data/:apiKey", logRequest, apiKeyMiddleware, (req, res) => {
  readDataJsonFile(req);
  res.send("Successfully completed!!");
});

router.post("/data/:apiKey", logRequest, apiKeyMiddleware, (req, res) => {
  const data = req.body;
  writeDataJsonFile(JSON.stringify(data));
  res.send("Successfully completed!!");
});

router.put("/data/:apiKey", logRequest, apiKeyMiddleware, (req, res) => {
  const data = req.body;
  console.log(data);
  appendDataJsonFile(JSON.stringify(data));
  res.send("Successfully completed!!");
});

router.delete("/data/:apiKey", logRequest, apiKeyMiddleware, (req, res) => {
  deleteDataJsonFile(req);
  res.send("Successfully completed!!");
});

router.get("/os-info/:apiKey", logRequest, apiKeyMiddleware, (req, res) => {
  osInfo();
  res.send("Successfully completed!!");
});

router.get("*", catchAll, (req, res) => {
});

//export routes to be used in other parts of the application
module.exports = router;
