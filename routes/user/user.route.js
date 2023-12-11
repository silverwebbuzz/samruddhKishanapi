const router = require("express").Router();

const middlewares = require("../../helper/middlewares");

const user = require("../../controller/users/users");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/vendorImages");
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

router.post(
  "/updateUsers",
  upload.fields([{ name: "vendorImage", maxCount: 1 }]),
  user.updateUser
);

router.delete("/deleteUsers/:id", user.deleteUser);

router.get("/getSingleUsers/:id", user.singleUser);

router.post("/getAllUsers", user.GetAllUser);

router.post("/UserLogin", user.UserLogin);

router.post("/multiDeleteUsers", user.multiDeleteUsers);

router.post("/getAllCenters", user.getAllCenters);

router.post("/centersCount", user.centersCount);

router.post("/sentEmail", user.sentMail);

router.post("/verifyUser/:id", user.verifyUser);

const getImage = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/vendorImages" });
};

router.get("/uploads/vendorImages/:filename", getImage);
// router.post("/getAllState", farmer.getState);
// router.post("/getAllCity", farmer.getCity);
const storages = multer.memoryStorage();
const uploads = multer({ storage: storages });
router.post("/UploadCSV", uploads.single("file"), user.UploadCSV);
router.get("/GetExcelData", user.excelExports);
module.exports = router;
