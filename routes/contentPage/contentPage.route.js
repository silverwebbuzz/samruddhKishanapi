const router = require("express").Router();
const multer = require("multer");
const middlewares = require("../../helper/middlewares");
const contentPage = require("../../controller/contentPage/contentPage");

//Section 1 : SliderImage path & DiskStorage
const sliderImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/sliderImage");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const sliderImages = multer({ storage: sliderImage }); //uploades inside the sliderImage folder
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

//Get Single Slider
router.get("/singleSlider/:id", contentPage.getSingleSlider);

//Get All Slider
router.get("/getAllSliderImages", contentPage.getAllSliderImages);

//section-2
//updateContentPage api route
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

//Get Single Slider
router.get("/getSingleContent/:id", contentPage.getSingleContent);

//Get All Slider
router.get("/getAllContent", contentPage.getAllContent);

//Section 3 : Product Content
// Product Content route
router.post("/updateProductContentData", contentPage.updateProductContentCard);

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
  "/uploads/updateProductContentCard",
  productcontentMainCardImages.array("ProductContentMainCardImage", 1),
  contentPage.updateBigProductContentCard
);

//Get Single Big Product ContentCard Slider
router.get(
  "/getSingleBigProductContentCard/:id",
  contentPage.getSingleBigProductContentCard
);

//Get All Slider
router.get(
  "/getAllBigProductContentCard",
  contentPage.getAllBigProductContentCard
);

// Delete Big Product Content Card
router.delete(
  "/deleteBigProductContentCard/:id",
  contentPage.deleteBigProductContentCard
);

//Section 4 : Small Product Content Card
//small product content route
router.post(
  "/updateSmallProductContentData",
  contentPage.updateSmallProductContentDetails
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

//update Small product Content Card api route
router.post(
  "/uploads/updateSmallProductContentCard",
  smallProductcontentCardImages.array("smallProductContentCardImage", 1),
  contentPage.updateSmallProductcontentCard
);

//Get Single Small Product ContentCard Slider
router.get(
  "/getSingleSmallProductContentCard/:id",
  contentPage.getSingleSmallProductContentCard
);

//Get All Small Product Content Card
router.get(
  "/getAllSmallProductContentCard",
  contentPage.getAllSmallProductContentCard
);

//Delete Small Product Content Card
router.delete(
  "/deleteSmallProductContentCard/:id",
  contentPage.deleteSmallProductContentCard
);

// Section-5 QA Content page
const qacontent = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/qaContentImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const qacontentCardImages = multer({
  storage: qacontent,
});
router.post(
  "/uploads/qaCreateContent",
  qacontentCardImages.fields([
    { name: "qaContentMainImg" },
    { name: "qaContentlogo" },
  ]),
  contentPage.createQaContent
);

//update qaContent
router.post(
  "/uploads/qaUpdateContent",
  qacontentCardImages.fields([
    { name: "qaContentMainImg" },
    { name: "qaContentlogo" },
  ]),
  contentPage.updateQaContent
);

//Delete Qa Content page
router.delete("/uploads/deleteQaContent/:id", contentPage.deleteQaContent);

//get single Qa Content page
router.get(
  "/uploads/getSingleQaContentCard/:id",
  contentPage.getSingleQaContentCard
);

//get All Qa Content page
router.get("/uploads/getAllQaContentCard", contentPage.getAllQaContentCard);

//Section-6 Testimonial Page

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
