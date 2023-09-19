const path = require("path");
const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("../config/passport");
const { readFile, writeFile } = require("../utils/file_operations");

const usersFilePath = "./data/users.json";

const getLogin = async (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "login.html");
  res.sendFile(filePath);
};

const postLogin = (req, res, next) => {
  const users = readFile(usersFilePath);
  console.log(users);
  //using users
  initializePassport(
    passport,
    (email) => users.find((user) => user.email === email),
    (id) => users.find((user) => user.id === id)
  );
  passport.authenticate("local", {
    successRedirect: "/welcome",
    failureRedirect: "/login",
    failureFlash: true,
  })(req, res, next);
};

const getRegister = async (req, res) => {
  const filePath = path.join(__dirname, "..", "views", "register.html");
  res.sendFile(filePath);
};

const postRegister = async (req, res, next) => {
  try {
    const password = req.body.password;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!passwordRegex.test(password)) {
      // Password format is invalid
      res.send("invalid");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // req.body.password ==> password should be exact match to register.html name=password,  10:how many time you want to generate hash. it's a standard default value
      const users = readFile(usersFilePath);
      users.push({
        id: Date.now().toString(),
        name: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      });

      writeFile(usersFilePath, users);

      res.redirect("/login");
    }
  } catch {
    res.redirect("/register");
  }
  // console.log(users); // show the user list
};

module.exports = {
  getLogin,
  getRegister,
  postLogin,
  postRegister,
};
