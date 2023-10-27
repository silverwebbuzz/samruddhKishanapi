const router = require("express").Router();

const middlewares = require("../../helper/middlewares");
const auth = require("../../middlewere/tokenVerify");
const enquiry = require("../../controller/enquiry/enquiry");

router.post("/createEnquiry", enquiry.createEnquiry);

const getImage = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/emailImages" });
};

router.get("/uploads/emailImages/:filename", getImage);

router.post("/updateEnquiry", enquiry.updateEnquiry);

router.get("/singleEnquiry/:id", enquiry.singleEnquiry);

router.post("/GetAllEnquiry", enquiry.GetAllEnquiry);

router.delete("/deleteEnquiry/:id", enquiry.deleteEnquiry);

router.post("/multiDeleteEnquiry", enquiry.multiDeleteEnquiry);

router.post("/updateEnquiryStatus", enquiry.updateEnquiryStatus);

module.exports = router;
