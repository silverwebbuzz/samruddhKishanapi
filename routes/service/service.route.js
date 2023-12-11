const router = require("express").Router();

const Services = require("../../controller/service/service");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/serviceImage");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }); //uploades inside the sliderImage folder
// const sliderImages2 = multer({ storage: productImage });
// SliderImage Slider Image route
router.post(
  "/createServices",

  upload.fields([{ name: "serviceBannerImage", maxCount: 1 }]),

  Services.createServices
);

// router.post("/createServices", Services.createServices);

router.post(
  "/updateServices",
  upload.fields([{ name: "serviceBannerImage", maxCount: 1 }]),
  Services.updateServices
);
router.get("/singleServices/:id", Services.singleServices);

const getImage = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/serviceImage" });
};
router.get("/uploads/serviceImage/:filename", getImage);

router.post("/GetAllServices", Services.GetAllServices);

router.delete("/deleteService/:id", Services.deleteServices);

router.post("/updateServicesStatus", Services.updateServicesStatus);

router.post("/multiDeleteServices", Services.multiDeleteServices);
// const upload = multer({ storage: storage });
const storages = multer.memoryStorage();
const uploads = multer({ storage: storages });

router.post("/UploadCSV", uploads.single("file"), Services.UploadCSV);

module.exports = router;
