const mongoose = require("mongoose");

const userScheema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "username is required"],
    unique: [true, "username already taken"],
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: [true, "email is already taken"],
  },
});

const handleErr = (error, res, next) => {
  if (error.name === "MongoError" && error.code === 11000) {
    res.status(400).json({
      status: "failed",
      message: "Duplicate Key",
    });
    next();
  } else {
    next();
  }
};

userScheema.post("save", handleErr);
const User = mongoose.model("User", userScheema);

module.exports = User;
