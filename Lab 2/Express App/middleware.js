function logRequest(req, res, next) {
  res.send(`Request received for: ${req.method} ${req.url}`);
  next();
}

//export the function to be used in other parts of application
module.exports = {
  logRequest
};
