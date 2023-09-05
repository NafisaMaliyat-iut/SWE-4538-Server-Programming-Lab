function logRequest(req, res, next) {
  console.log(`Request received for: ${req.method} ${req.url}`);
  next();
}

function apiKeyMiddleware(req, res, next) {
  const apiKey = req.params.apiKey;

  if (!apiKey || apiKey !== "123") {
    res.send("Status 401: Unauthorized");
  } else {
    console.log("carried out successfully!");
    next();
  }
}

function catchAll(req, res, next){
  res.send("404 Route Not Found");
  next();
}

//export the function to be used in other parts of application
module.exports = {
  logRequest,
  apiKeyMiddleware,
  catchAll,
};
