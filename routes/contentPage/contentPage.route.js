const router = require("express").Router();
const multer = require("multer");
const middlewares = require("../../helper/middlewares");
const contentPage = require("../../controller/contentPage/contentpage");

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
  "/updateContentPage",
  upload.fields([{ name: "contentMainImg" }, { name: "contentSubImg" }]),
  contentPage.updateContent
);

// update content card path & diskStorage
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
  contentCardImages.array("contentCardImage", 5),
  contentPage.contentCard
);

//delete ContentCard images
router.delete("/uploads/deleteContentCard/:id", contentPage.deleteContentCard);

//Get Single Slider
router.get("/getSingleContent/:id", contentPage.getSingleContent);

//Get All Slider
router.get("/getAllContent", contentPage.getAllContent);

//contentPointDetail
router.post("/contentPointDetail", contentPage.contentPointDetail);

//delete ContentCard images
router.post("/uploads/deleteContentPoint", contentPage.deleteContentPoint);

//Section 3 : Product Content
// Product Content route
// router.post("/updateProductContentData", contentPage.updateProductContentCard);

// Create Product content headings Main card path & diskStorage
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
  "/uploads/updateProductContentHeadings",
  productcontentMainCardImages.fields([
    { name: "ProductContentMainCardImage" },
  ]),
  contentPage.updateBigProductContentHeadings
);

//big product content card
const bigProductContentCardImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/productContentMainCardImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const bigProductContentCardImages = multer({
  storage: bigProductContentCardImage,
});
router.post(
  "/bigProductContentCard",
  bigProductContentCardImages.array("productContentMainCardImage", 5),
  contentPage.BigProductContentCard
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
  smallProductcontentCardImages.array("smallProductContentCardImage", 5),
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
  "/uploads/qaUpdateContent",
  qacontentCardImages.fields([
    { name: "qaContentMainImg" },
    { name: "qaContentlogo" },
  ]),
  contentPage.updateQaContent
);

//update qaContent Card
router.post("/uploads/qaUpdateContentCard", contentPage.updateQaContentCard);

//Delete Qa Content page
router.post("/uploads/deleteQaContent", contentPage.deleteQaContent);

//get single Qa Content page
router.get(
  "/uploads/getSingleQaContentCard/:id",
  contentPage.getSingleQaContentCard
);

//get All Qa Content page
router.get("/uploads/getAllQaContentCard", contentPage.getAllQaContentCard);

//Section-6 Testimonial Page
//update tetimonial page
const testimonial = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/testimonialImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const testimonialImages = multer({
  storage: testimonial,
});
router.post(
  "/testimonialImage",
  testimonialImages.fields([
    { name: "testimonialImg1" },
    { name: "testimonialImg2" },
    { name: "testimonialImg3" },
    { name: "testimonialImg4" },
  ]),
  contentPage.testimonialImage
);

//updateTestimonialCard
router.post("/updateTestimonialCard", contentPage.updateTestimonialCard);

//Delete Testimonial page
router.post("/deleteTestimonialCard", contentPage.deleteTestimonialCard);

//get All Testimonial page
router.get("/getAllTestimonialCard", contentPage.getAllTestimonialCard);

// Section-7
//update ImageGallery
const ImageGallery = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/galleryImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const galleryImages = multer({
  storage: ImageGallery,
});

router.post(
  "/updateImageGalleryCard",
  galleryImages.array("galleryImage", 5),
  // galleryImages.fields([{ name: "galleryImage" }]),
  contentPage.updateImageGalleryCard
);
router.post("/updateImageGallery", contentPage.updateImageGallery);

//getAllImageGallery
router.get("/getAllImageGallery", contentPage.getAllImageGallery);

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
  res.sendFile(filename, { root: "uploads/productContentMainCardImages" });
};

router.get(
  "/uploads/productContentMainCardImages/:filename",
  getProductContentMainCardImages
);

//get small Product content Card Images
const getSmallProductContentMainCardImages = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/smallProductContentCardImges" });
};

router.get(
  "/uploads/smallProductContentCardImges/:filename",
  getSmallProductContentMainCardImages
);

//get qa content
const getQaContentImages = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/qaContentImages" });
};

router.get("/uploads/qaContentImages/:filename", getQaContentImages);

//get testimonial imges
const getTestimonialImages = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/testimonialImages" });
};

router.get("/uploads/testimonialImages/:filename", getTestimonialImages);

//get gallery
const getGalleryImages = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/galleryImages" });
};

router.get("/uploads/galleryImages/:filename", getGalleryImages);

//section:8 blog
//create blog api route
const blogStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/blogImage");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const blogUpload = multer({ storage: blogStorage });
router.post(
  "/createBlog",
  blogUpload.array("blogImage", 5),
  contentPage.blogContent
);

//update blog
router.post(
  "/updateBlog",
  blogUpload.array("blogImage", 5),
  contentPage.updateBlog
);

//get All blogs
router.get("/getAllBlog", contentPage.getAllBlog);

//get Single blogs
router.get("/getSingleBlog/:id", contentPage.getSingleBlog);

//delete Blog
router.post("/deleteBlog/:id", contentPage.deleteBlog);

//section:9 footer
//update footerExploer Card
router.post("/updateFooterExploer", contentPage.updateFooterExploer);

//delete footerExploer Card
router.post("/deleteFooterExploer", contentPage.deleteFooterExploer);

//get All Qa Content page
router.get("/getAllFooterExploerCard", contentPage.getAllFooterExploerCard);

// update content card path & diskStorage
const fetureImages = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/fetureImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const fetureCardImages = multer({ storage: fetureImages });
router.post(
  "/updateFeatureProductCard",
  fetureCardImages.array("fetureImages", 5),
  contentPage.featuresProductCard
);

//delete Features Product Card
router.post("/deleteFeaturesProduct", contentPage.deleteFeaturesProduct);

//update Footer Details
router.post("/updateFooterDetails", contentPage.updateFooterDetails);




//get blog image
const getBlogImages = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/blogImage" });
};

router.get("/uploads/blogImage/:filename", getBlogImages);

//get Features Product image
const getFeaturesProductImages = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/fetureImages" });
};

router.get("/uploads/fetureImages/:filename", getFeaturesProductImages);

//section 10: Achivements
//update Achivements counts
router.post("/updateAchivements", contentPage.updateAchivements);

//section: 11 service content
// update service content headings
router.post(
  "/updateBigSerivceContentHeadings",
  contentPage.updateBigSerivceContentHeadings
);

//big service content card
const bigServiceContentCardImage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/serviceContentMainCardImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const bigServiceContentCardImages = multer({
  storage: bigServiceContentCardImage,
});
router.post(
  "/BigServiceContentCard",
  bigServiceContentCardImages.array("serviceContentMainCardImage"),
  contentPage.BigServiceContentCard
);

//Get Single Big service ContentCard Slider
router.get(
  "/getSingleBigSerivceContentCard/:id",
  contentPage.getSingleBigSerivceContentCard
);

//Get All service
router.get(
  "/getAllBigServiceContentCard",
  contentPage.getAllBigServiceContentCard
);

// Delete Big service Content Card
router.post(
  "/deleteBigServiceContentCard",
  contentPage.deleteBigServiceContentCard
);

//service section
//get service image
const getServiceContentMainCardImages = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/serviceContentMainCardImages" });
};

router.get(
  "/uploads/serviceContentMainCardImages/:filename",
  getServiceContentMainCardImages
);

module.exports = router;