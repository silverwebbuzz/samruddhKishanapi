const router = require("express").Router();
const multer = require("multer");
const middlewares = require("../../helper/middlewares");
const contentPage = require("../../controller/contentPage/contentPage/contentpage");

//Section 1 : SliderImage path & DiskStorage
const sliderImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/sliderImage");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const sliderImages = multer({ storage: sliderImage });
router.post(
  "/sliderImage",
  sliderImages.array("sliderImages", 4),
  contentPage.sliderImages
);

//update slider Images
router.post(
  "/uploads/updateSliderImages",
  sliderImages.array("sliderImages", 4),
  contentPage.updateSliderImages
);

//delete slider images
router.delete("/uploads/deleteSliderImage/:id", contentPage.deleteSliderImage);

//updateContentImage api route
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/contentImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
router.post(
  "/updateContent",
  upload.fields([{ name: "contentMainImg" }, { name: "contentSubImg" }]),
  contentPage.updateContent
);

// Create content card path & diskStorage
const contentCardImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/contentCardImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const contentCardImages = multer({ storage: contentCardImage });
router.post(
  "/contentCard",
  contentCardImages.single("contentCardImage"),
  contentPage.contentCard
);

//delete ContentCard images
router.delete("/uploads/deleteContentCard/:id", contentPage.deleteContentCard);

//Section 3 : Product Content
// Product Content route
router.post("/addProductContentdata", contentPage.ProductContentCard);

// Create Product content Main card path & diskStorage
const productcontentMainCard = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/productContentMainCardImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const productcontentMainCardImages = multer({
  storage: productcontentMainCard,
});

//productContentMainCard api route
router.post(
  "/uploads/productContentCard",
  productcontentMainCardImages.array("ProductContentMainCardImage", 1),
  contentPage.bigProductContentCard
);

//Section 4 : Small Product Content Card
//small product content route\
router.post(
  "/addSmallProductContentdata",
  contentPage.smallProductContentDetails
);

// Create Product content Main card path & diskStorage
const smallProductcontentCard = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/smallProductContentCardImges");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const smallProductcontentCardImages = multer({
  storage: smallProductcontentCard,
});

//productContentMainCard api route
router.post(
  "/uploads/smallProductContentCard",
  smallProductcontentCardImages.array("smallProductContentCardImage", 1),
  contentPage.smallProductcontentCard
);

//all getImage api Routes
//get slider Image
const getsliderImage = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/sliderImage" });
};

router.get("/uploads/sliderImage/:filename", getsliderImage);

//get Content image
const getContentPageImage = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/contentImages" });
};

router.get("/uploads/contentImages/:filename", getContentPageImage);

//get Content Card image
const getContentCardImage = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/contentCardImages" });
};

router.get("/uploads/contentCardImages/:filename", getContentCardImage);

//get Product ContentMain Card Images
const getProductContentMainCardImages = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/ProductContentMainCardImages" });
};

router.get(
  "/uploads/ProductContentMainCardImages/:filename",
  getProductContentMainCardImages
);

//get Product ContentMain Card Images
const getSmallProductContentMainCardImages = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/smallProductContentCardImges" });
};

router.get(
  "/uploads/smallProductContentCardImges/:filename",
  getSmallProductContentMainCardImages
);
module.exports = router;
