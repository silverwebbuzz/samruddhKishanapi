const router = require("express").Router();
const middlewares = require("../../helper/middlewares");
const contentPage = require("../../controller/contentPage/contentPage");

//create new content page
router.post("/createContentPage", contentPage.createContentPage);

//get Image
const getImage = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/contentImage" });
};
router.get("/uploads/contentImage/:filename", getImage);

module.exports = router;
