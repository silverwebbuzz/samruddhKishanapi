const router = require("express").Router();

const Brand = require("../../controller/brand/brand");
const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/brandImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage }); //uploades inside the sliderImage folder
// const sliderImages2 = multer({ storage: productImage });
// SliderImage Slider Image route
router.post(
  "/createBrand",
  upload.fields([{ name: "brandLogo", maxCount: 1 }]),
  Brand.createBrand
);

// router.post("/createServices", Services.createServices);

router.post(
  "/updateBrand",
  upload.fields([{ name: "brandLogo", maxCount: 1 }]),
  Brand.updateBrand
);
router.get("/singleBrand/:id", Brand.singleBrand);

router.post("/GetAllBrand", Brand.GetAllBrand);

router.delete("/deleteBrand/:id", Brand.deleteBrand);

const getImage = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/brandImages" });
};

router.get("/uploads/brandImages/:filename", getImage);

router.post("/multiDeleteBrand", Brand.multiDeleteBrand);

module.exports = router;
