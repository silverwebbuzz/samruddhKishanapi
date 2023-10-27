const router = require("express").Router();
const aboutUs = require("../../controller/contactUs/contactUs");

router.post("/createContactUs", aboutUs.createContactUs);

router.post("/updateContactUs", aboutUs.updateContactUs);

router.delete("/deleteContactUs", aboutUs.deleteContactUs);

router.get("/getSingleContactUs", aboutUs.getSingleContactUs);

router.get("/getAllContactUs", aboutUs.getAllContactUs);

module.exports = router;
