const express = require("express"); //imports express
const app = express(); //initialize express

//use routes
const routes = require("./routes");
app.use(routes);

const PORT = 3000;
//starts the express application
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
