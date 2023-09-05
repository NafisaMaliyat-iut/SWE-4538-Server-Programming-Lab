const os = require("os");
const fs = require("fs");

//returns info about currently effective user
// console.log(os.userInfo());

//returns the running os
const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
};
// console.log(currentOS);

function osInfo(req, res, next) {
  console.log("Before: ");
  fs.readFile("./os-data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
      fs.appendFile("./os-data.json", JSON.stringify(currentOS), (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Data appended to os-data.json successfully!");
          console.log("After: ");
          fs.readFile("./os-data.json", "utf-8", (err, data) => {
            if (err) {
              console.log(err);
            } else {
              console.log(data);
            }
          });
        }
      });
    }
  });
}

module.exports = {
  osInfo,
};
