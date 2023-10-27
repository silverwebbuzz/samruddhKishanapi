const router = require("express").Router();
const multer = require("multer");
const middlewares = require("../../helper/middlewares");
const footer = require("../../controller/footer/footer");

//update footerExploer Card
router.post("/updateFooterExploer", footer.updateFooterExploer);

//update footerExploer Card
router.post("/deleteFooterExploer", footer.deleteFooterExploer);

//get All Qa Content page
router.get("/getAllFooterExploerCard", footer.getAllFooterExploerCard);

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
  footer.featuresProductCard
);

//get all images routes

//get Features Product image
const getFeaturesProductImages = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/fetureImages" });
};

router.get("/uploads/fetureImages/:filename", getFeaturesProductImages);
module.exports = router;
