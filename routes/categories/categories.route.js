const router = require("express").Router();
const multer = require("multer");
const middlewares = require("../../helper/middlewares");
const auth = require("../../middlewere/tokenVerify");
const Categories = require("../../controller/categories/categories");
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
router.post("/createCategories", Categories.createCategories);

router.post("/updateCategories/:id", Categories.updateCategories);

router.get("/singleCategories/:id", Categories.singleCategories);

router.post("/GetAllCategory", Categories.GetAllCategory);

router.delete("/deleteCategories/:id", Categories.deleteCategories);

router.post("/multiDeleteCategories", Categories.multiDeleteCategories);

router.post("/updateMultiSelectStatus", Categories.updateMultiSelectStatus);

router.post("/uploadCSV", upload.single("file"), Categories.UploadCSV);

module.exports = router;
