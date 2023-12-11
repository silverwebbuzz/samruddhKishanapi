const router = require("express").Router();
const middlewares = require("../../helper/middlewares");
// const auth = require("../../middlewere/tokenVerify");
const product = require("../../controller/product/product");
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
const storages = multer.memoryStorage();
const uploads = multer({ storage: storages });
//uploades inside the sliderImage folder
// const sliderImages2 = multer({ storage: productImage });
// SliderImage Slider Image route
router.post(
  "/createProduct",
  upload.fields([
    { name: "productImage", maxCount: 1 },
    { name: "productGallaryImage", maxCount: 10 },
  ]),
  product.createProduct
);
// router.post("/createProduct", product.createProduct);

router.post(
  "/updateProduct",
  upload.fields([
    { name: "productImage", maxCount: 1 },
    { name: "productGallaryImage", maxCount: 10 },
  ]),
  product.updateProduct
);

const getImage = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/productImage" });
};

router.get("/uploads/productImage/:filename", getImage);

router.post("/updateProduct", product.updateProduct);

router.delete("/deleteProduct/:id", product.deleteProduct);

router.post("/deleteProductGallary", product.deleteProductGallary);

router.get("/getsingleProduct/:id", product.singleProduct);

router.post("/GetAllProduct", product.GetAllProduct);

router.post("/multiDeleteProduct", product.multiDeleteProduct);

router.post("/UploadCSV", uploads.single("file"), product.UploadCSV);
module.exports = router;
