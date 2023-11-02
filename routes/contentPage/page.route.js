const router = require("express").Router();
const page = require("../../controller/contentPage/page");

router.post("/createPage", page.createPage);

router.post("/updatePage", page.updatePage);

router.delete("/deletePage", page.deletePage);

router.get("/getSinglePage", page.getSinglePage);

router.get("/getAllPage", page.getAllPage);

module.exports = router;
