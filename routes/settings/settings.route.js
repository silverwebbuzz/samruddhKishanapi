const router = require("express").Router();
const settings = require("../../controller/settings/settings");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/settingImages");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });
//General settings Settings
router.post(
  "/createSettings",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "favIcon", maxCount: 1 },
  ]),
  settings.createGeneralSetting
);
router.post("/createEmailSetting", settings.updateEmailSetting);
router.post("/createSocialMedia", settings.updateSocialSetting);
router.post("/updateGoogleSetting", settings.updateGoogleSetting);
router.post("/updateScoSetting", settings.updateScoSetting);



router.post(
  "/updateGeneralSetting",
  upload.fields([
    { name: "logo", maxCount: 1 },
    { name: "favIcon", maxCount: 1 },
  ]),
  settings.updateGeneralSetting
);

const getImage = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/settingImages" });
};

router.get("/uploads/settingImages/:filename", getImage);


// router.delete("/deleteGeneralSetting", settings.deleteGeneralSetting);

router.post("/getSingleSetting", settings.getSingleSetting);

//Email Settings




//socialMedia Settings




router.get("/getGraphCount", settings.getGraphCount);

router.get("/getLogo", settings.getLogo);

module.exports = router;
