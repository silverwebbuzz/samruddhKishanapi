const router = require("express").Router();

const middlewares = require("../../helper/middlewares");
// const auth = require("../../middlewere/tokenVerify");
const farmer = require("../../controller/farmer/farmer");

router.post("/createFarmer", farmer.farmerCreate);

router.post("/updateFarmer", farmer.updateFarmer);

router.delete("/deleteFarmer/:id", farmer.deleteFarmer);

router.get("/getSingleFarmer/:id", farmer.singleFarmer);

router.post("/getAllFarmer", farmer.GetAllFarmer);

router.post("/getAllState", farmer.getState);

router.get("/getAllCountry", farmer.getCountry);

router.get("/getAllUnits", farmer.getUnits);

router.post("/getAllCity", farmer.getCity);

router.get("/GetPinCode/:pinCode", farmer.getPincode);

router.post("/uploadImage", farmer.uploadImage);

router.post("/multiDeleteFarmer", farmer.multiDeleteFarmer);

const getImage = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/soilReports" });
};

router.get("/uploads/soilReports/:filename", getImage);
//   public async ProfileImage(@Param("filename") filename: any, @Res() res) {
//     return res.sendFile(filename, { root: "uploads/employee" });
//   }
module.exports = router;
