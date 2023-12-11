const router = require("express").Router();
const multer = require("multer");

const middlewares = require("../../helper/middlewares");
// const auth = require("../../middlewere/tokenVerify");
const farmer = require("../../controller/farmer/farmer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/soilReports/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post(
  "/createFarmer",
  upload.fields([{ name: "Document", maxCount: 10 }]),
  farmer.farmerCreate
);

router.post(
  "/updateFarmer",
  upload.fields([{ name: "Document", maxCount: 10 }]),
  farmer.updateFarmer
);

router.post("/deleteLandDocument", farmer.deleteLandDocument);

router.delete("/deleteFarmer/:id", farmer.deleteFarmer);

router.get("/getSingleFarmer/:id", farmer.singleFarmer);

router.post("/getAllFarmer", farmer.GetAllFarmer);

router.post("/getAllState", farmer.getState);

router.get("/getAllCountry", farmer.getCountry);

router.get("/getAllUnits", farmer.getUnits);

router.post("/getAllCity", farmer.getCity);

router.get("/GetPinCode/:pinCode", farmer.getPincode);

router.post("/uploadImage", farmer.uploadImage);

router.post("/multiDeleteFarmer", farmer.multiDeleteFarmer);

const getImage = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/soilReports" });
};

router.get("/uploads/soilReports/:filename", getImage);
//   public async ProfileImage(@Param("filename") filename: any, @Res() res) {
//     return res.sendFile(filename, { root: "uploads/employee" });
//   }
const storages = multer.memoryStorage();
const uploads = multer({ storage: storages });
router.post("/UploadCSV", uploads.single("file"), farmer.UploadCSV);
router.get("/GetExcelData", farmer.excelExports);
module.exports = router;
