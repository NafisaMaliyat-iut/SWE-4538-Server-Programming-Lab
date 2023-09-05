const fs = require("fs");

//read the file
console.log("Before");
fs.readFile("./demoFile.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

//append the fie
fs.appendFile("./demoFile.txt", "- Forrest Gump", (err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("New text is appended!!");
  }
});

//read the new contents of the file again
console.log("After");
fs.readFile("./demoFile.txt", "utf-8", (err, data) => {
  if (err) {
    console.log(err);
  } else {
    console.log(data);
  }
});

function readDataJsonFile() {
  fs.readFile("./data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });
}

function writeDataJsonFile(data) {
  fs.writeFile("./data.json", data, (error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Data added to data.json file");
    }
  });
}

function appendDataJsonFile(data) {
  fs.appendFile("./data.json", data, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("New text is appended!!");
    }
  });
}

function deleteDataJsonFile(req, res, next) {
  fs.unlink("./data.json", (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Deleted Successfully.");
    }
  });
}

module.exports = {
  readDataJsonFile,
  appendDataJsonFile,
  writeDataJsonFile,
  deleteDataJsonFile,
};
