const express = require("express");
const userdatacontroller = require("./../Controller/userdatacontroller");
const router = express.Router();
const app = express();
const fs = require("fs");
const multer = require("multer");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const Users = require("./../Model/userdatamodel");

const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const data = await Users.findById(req.params["id"]);
    const date = new Date().toISOString();
    const username = data.username;
    cb(null, `./Users/${username}`); // specify the destination for the uploaded images
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname); // use the original file name as the name for the uploaded file
  },
});
const upload = multer({ storage: storage });

const dpstorage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const data = await Users.findById(req.params.id);
    const username = data.username;

    const pathtwo = `./Users/${username}/Dp/dp.png`;
    console.log(fs.existsSync(pathtwo));
    if (fs.existsSync(pathtwo)) {
      fs.unlink(`./Users/${username}/Dp/dp.png`, (err) => {
        if (err) console.log(err);
      });
    }

    const path = `./Users/${username}/Dp`;
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
        cb(null, `./Users/${username}/Dp`);
      }
    });
  },
  filename: (req, file, cb) => {
    cb(null, "dp.png");
  },
});

const dpupload = multer({ storage: dpstorage });

router.route("/register").post(userdatacontroller.postuserdata);

router.post(
  "/:id/upload",
  upload.array("image", 4),
  userdatacontroller.postimage
);

router.post("/:id/dp", dpupload.single("dp"), (req, res) => {
  try {
    res.status(200).json({
      status: "succesfull",
      message: true,
    });
  } catch (err) {
    res.status(400).json({
      status: "failed",
      message: err,
    });
  }
});

router.route("/login").post(userdatacontroller.checkuserdata);

router.route("/:id/images").get(userdatacontroller.getphotos);

router.route("/:id").get(userdatacontroller.getuserdata);

router.route("/:id/getdp").get(userdatacontroller.getdp);

router.route("/:id/images/delete").post(userdatacontroller.deletephoto);

router.route("/:id/deletedp").get(userdatacontroller.deletedp);

router.route("/:id/shareimage").post(userdatacontroller.shareimage);

module.exports = router;
