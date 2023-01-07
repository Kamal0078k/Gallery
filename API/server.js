const dotenv = require("dotenv");
const app = require("./app");
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
dotenv.config({ path: "./config.env" });
const DB = process.env.DATABASE.replace("<password>", process.env.PASSWORD);
const PORT = process.env.PORT || 200;

mongoose.connect(DB).then((con) => {
  console.log("connected...");
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log("started......");
  } else {
    console.log(error);
  }
});
