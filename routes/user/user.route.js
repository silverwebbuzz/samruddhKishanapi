const router = require("express").Router();

const middlewares = require("../../helper/middlewares");

const user = require("../../controller/users/users");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/productImage");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/createUsers",
  upload.fields([{ name: "vendorImage", maxCount: 1 }]),
  user.createUser
);

router.post("/updateUsers", user.updateUser);

router.delete("/deleteUsers/:id", user.deleteUser);

router.get("/getSingleUsers/:id", user.singleUser);

router.post("/getAllUsers", user.GetAllUser);

router.post("/UserLogin", user.UserLogin);

// router.post("/getAllState", farmer.getState);
// router.post("/getAllCity", farmer.getCity);

module.exports = router;
