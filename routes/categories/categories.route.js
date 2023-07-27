const router = require("express").Router();

const middlewares = require("../../helper/middlewares");
const auth = require("../../middlewere/tokenVerify");
const Categories = require("../../controller/categories/categories");

router.post(
  "/createCategories",

  Categories.createCategories
);

router.post(
  "/updateCategories/:id",

  Categories.updateCategories
);

router.get(
  "/singleCategories/:id",

  Categories.singleCategories
);

router.post(
  "/GetAllCategory",

  Categories.GetAllCategory
);

router.delete(
  "/deleteCategories/:id",

  Categories.deleteCategories
);

module.exports = router;
