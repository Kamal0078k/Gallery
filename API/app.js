const userrouter = require("./Router/userdatarouter");
const cors = require("cors");
const express = require("express");
const Users = require("./Model/userdatamodel");
const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/users/:id/images", express.static(`Users/`));

// const errorController = require("./controllers/errorController");

app.use("/api/users/", userrouter);

// app.use((err, req, res, next) => {
//   console.log("congrats you hit the error middleware");
//   console.log(err);
// });

module.exports = app;
