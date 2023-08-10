const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const colors = require("@colors/colors");

const app = require("./app");

// database connection
mongoose
  .connect(process.env.DATABASE_LOCAL)
  .then(() => {
    console.log(`Database connection is successfull`.red.bold);
  })
  .catch((e) => {
    console.log(e);
  });

//server
const port = process.env.PORT || 5050;

app.listen(port, () => {
  console.log(`App is running on port ${port}`.blue.bold);
});
