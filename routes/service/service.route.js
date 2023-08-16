const router = require("express").Router();

const Services = require("../../controller/service/service");

router.post("/createServices", Services.createServices);

router.post("/updateServices", Services.updateServices);

router.get("/singleServices/:id", Services.singleServices);

router.get("/GetAllServices", Services.GetAllServices);

router.delete("/deleteService/:id", Services.deleteServices);

module.exports = router;
