const router = require("express").Router();
const aboutUs = require("../../controller/aboutUs/aboutPage");

router.post("/createAboutUsPage", aboutUs.aboutUsPage);

router.delete("/deleteAboutUsPage", aboutUs.deleteAboutUsPage);

router.get("/getSingleAboutUsPage", aboutUs.getSingleAboutUsPage);

router.get("/getAllAboutUsPage", aboutUs.getAllAboutUsPage);

module.exports = router;
