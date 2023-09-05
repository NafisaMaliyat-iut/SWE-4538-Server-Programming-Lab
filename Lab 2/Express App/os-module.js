const os = require("os");

//returns info about currently effective user
console.log(os.userInfo());

//returns the running os
const currentOS = {
  name: os.type(),
  release: os.release(),
  totalMem: os.totalmem(),
  freeMem: os.freemem(),
};
console.log(currentOS);

function osInfo(req, res, next) {
  fs.readFile("./os-data.json", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
    } else {
      console.log(data);
    }
  });

  fs.appendFile("./os-data.json", currentOS, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Data appended to os-data.json successfully!")
    }
  });
}
