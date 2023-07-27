const router = require("express").Router();

const middlewares = require("../../helper/middlewares");
// const auth = require("../../middlewere/tokenVerify");
const product = require("../../controller/product/product");

router.post("/createProduct", product.createProduct);

router.post(
  "/updateProduct/:id",

  product.updateProduct
);
const getImage = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/productImage" });
};

router.get("/uploads/productImage/:filename", getImage);

router.post(
  "/updateProduct/:id",

  product.updateProduct
);

router.delete(
  "/deleteProduct/:id",

  product.deleteProduct
);

router.get(
  "/getsingleProduct/:id",

  product.singleProduct
);

router.post("/GetAllProduct", product.GetAllProduct);

module.exports = router;
