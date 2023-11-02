const router = require("express").Router();
const subscribers = require("../../controller/subscribers/subscribers");

router.post("/createSubscriber", subscribers.createSubscriber);

router.post("/deleteSubscriber", subscribers.deleteSubscriber);

router.get("/getAllSubscriber", subscribers.getAllSubscriber);

module.exports = router;