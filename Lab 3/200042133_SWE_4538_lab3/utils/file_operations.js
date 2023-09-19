const fs = require("fs");

const readFile = (filePath) => {
  let rawdata = fs.readFileSync(filePath);
  let users = JSON.parse(rawdata);
  return users;
};

const writeFile = (filePath, data) => {
  fs.writeFile(filePath, JSON.stringify(data), (err) => {
    // Checking for errors
    if (err) throw err;

    console.log("Done writing"); // Success
  });
};

module.exports = {
  readFile,
  writeFile,
};
