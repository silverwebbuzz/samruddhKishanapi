const router = require("express").Router();
const aboutUs = require("../../controller/aboutUs/usercontactus");

router.post("/createAboutUs", aboutUs.createAboutUs);

router.post("/updateAboutUs", aboutUs.updateAboutUs);

router.delete("/deleteAboutUs", aboutUs.deleteAboutUs);

router.get("/getSingleAboutUs", aboutUs.getSingleAboutUs);

router.get("/getAllAboutUs", aboutUs.getAllAboutUs);

module.exports = router;
