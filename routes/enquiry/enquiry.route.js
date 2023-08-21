const router = require("express").Router();

const middlewares = require("../../helper/middlewares");
const auth = require("../../middlewere/tokenVerify");
const enquiry = require("../../controller/enquiry/enquiry");

router.post("/createEnquiry", enquiry.createEnquiry);

router.post("/updateEnquiry/:id", enquiry.updateEnquiry);

router.get("/singleEnquiry/:id", enquiry.singleEnquiry);

router.post("/GetAllEnquiry", enquiry.GetAllEnquiry);

router.delete("/deleteEnquiry/:id", enquiry.deleteEnquiry);

module.exports = router;
