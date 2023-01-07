const express = require("express");
const app = express();
const multer = require("multer");
const fs = require("fs");
const bcrypt = require("bcrypt");
const Users = require("./../Model/userdatamodel"); //Model
const path = require("path");
const { findOne } = require("./../Model/userdatamodel");
const User = require("./../Model/userdatamodel");

app.use(express.static("public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

exports.postuserdata = async (req, res) => {
  Users.findOne({ username: req.body.username }).then((user) => {
    if (user) {
      res.status(400).json({
        status: "failed",
        unique: "username",
      });
    } else {
      Users.findOne({ email: req.body.email }).then((user) => {
        if (user) {
          res.status(400).json({
            status: "failed",
            unique: "email",
          });
        } else {
          try {
            const data = req.body;
            // findOne({ email: data.email }, (err, doc) => {
            //   if (doc) {
            //     res.status(404).json({
            //       status: "failed",
            //     });
            //   }
            // });

            const password = req.body.password;
            const saltRounds = 12;
            bcrypt.genSalt(saltRounds, (saltError, salt) => {
              if (saltError) {
                throw saltError;
              } else {
                bcrypt.hash(password, salt, function (hashError, hash) {
                  if (hashError) {
                    throw hashError;
                  } else {
                    const user = {
                      username: data.username,
                      password: hash,
                      email: data.email,
                    };
                    try {
                      const usercreated = Users.create(user);
                    } catch (err) {
                      if (err) {
                        console.log("email already telen");
                      }
                    }
                    res.status(200).json({
                      status: "success",
                    });
                  }
                });
              }
            });

            const path = `./Users/${req.body.username}`;
            fs.access(path, (error) => {
              if (error) {
                fs.mkdir(path, (error) => {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("New Directory created successfully !!");
                  }
                });
              } else {
                console.log("Given Directory already exists !!");
              }
            });
          } catch (error) {
            res.status(400).json({
              status: "error",
              message: error,
            });
          }
        }
      });
    }
  });
};

exports.postimage = async (req, res) => {
  try {
    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

exports.checkuserdata = async (req, res) => {
  try {
    var username = req.body.username;
    Users.findOne(
      { username: new RegExp("^" + username + "$", "i") },
      function (err, doc) {
        if (doc === null) {
          res.status(200).json({
            status: "succesfull",
            message: false,
          });
        } else {
          const password = doc.password;
          const userpassword = req.body.password;
          bcrypt.compare(userpassword, password).then((bool) => {
            if (bool) {
              res.status(200).json({
                message: true,
                id: doc.id,
                username: doc.username,
                email: doc.email,
              });
            } else {
              res.status(200).json({
                message: false,
              });
            }
          });
        }
      }
    );
  } catch (err) {
    res.status(400).json({
      status: "failed",
      error: err,
    });
  }
};

exports.getphotos = async (req, res) => {
  try {
    const data = await Users.findById(req.params["id"]);
    const username = data.username;
    const imagefolder = `./Users/${username}`;
    fs.readdir(imagefolder, function (err, files) {
      if (err) {
        console.log(err);
        return;
      }
      const imageFiles = files.filter(function (file) {
        // only return image files (based on file extension)
        return (
          file.endsWith(".jpg") ||
          file.endsWith(".png") ||
          file.endsWith(".gif")
        );
      });
      res.status(200).json({
        status: "success",
        names: imageFiles,
      });
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.deletephoto = async (req, res) => {
  try {
    const name = await req.body.name;
    const data = await Users.findById(req.params.id);
    console.log(name);
    fs.unlink(`./Users/${data.username}/${name}`, (err) => {
      if (err) {
        res.status(400).json({
          status: "failed",
          message: err,
        });
      } else {
        res.status(200).json({
          status: "succesfull",
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "unsuccesfull",
      message: err,
    });
  }
};

// exports.getphotos = async (req, res) => {
//   express.static(`./Users/Rakesh/`);
//   try {

//     // res.sendFile("saikamal.png", { root: `./Users/${data.username}/` });
//     // res.send(ok);
//   } catch (err) {
//     res.status(400).json({
//       status: "failed",
//       message: err,
//     });
//   }
// };

exports.getuserdata = async (req, res) => {
  try {
    const data = await Users.findById(req.params["id"]);
    res.status(200).json({
      status: "succesfull",
      username: data.username,
      email: data.email,
    });
  } catch (err) {
    res.status(400).json({
      status: err,
    });
  }
};

// exports.postuserdp = async (req , res) => {
//   try{
//     const data = await Users.findById(req.params.id);

//   }catch (err) {
//     res.status(400).json({
//       status : "failed",
//       message : err
//     })
//   }
// }

exports.getdp = async (req, res) => {
  try {
    const data = await Users.findById(req.params.id);
    console.log(data.username);
    fs.access(`./Users/${data.username}/Dp/dp.png`, (err) => {
      if (err) {
        res.status(404).json({
          status: "Errorrrrr",
          dpexist: false,
        });
      } else {
        res.status(200).json({
          status: "success",
          dpexist: true,
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
};

exports.deletedp = async (req, res) => {
  try {
    const data = await Users.findById(req.params.id);
    fs.unlink(`./Users/${data.username}/Dp/dp.png`, (err) => {
      if (err) {
        res.status(400).json({
          status: "failed",
          message: err,
        });
      } else {
        res.status(200).json({
          status: "succesfull",
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "unsuccesfull",
      message: err,
    });
  }
};

exports.shareimage = async (req, res) => {
  try {
    const name = await req.body.name;
    const username = await req.body.username;
    const data = await Users.findById(req.params.id);

    console.log(name, username, data.username);
    Users.findOne(
      { username: new RegExp("^" + username + "$", "i") },
      function (err, doc) {
        console.log(doc);
        if (doc == null) {
          res.status(200).json({
            status: "succesfull",
            usernameexist: false,
          });
        }
        // else if (doc.username == null) {

        // }
        else {
          fs.copyFile(
            `./Users/${data.username}/${name}`,
            `./Users/${username}/${name}`,
            (err) => {
              if (err) {
                console.log(err);
              } else {
                console.log("sent");
                res.status(200).json({
                  status: "success",
                  usernameexist: true,
                });
              }
            }
          );
        }
      }
    );
  } catch (err) {
    res.status(200).json({
      status: "failed",
      message: err,
    });
  }
};
