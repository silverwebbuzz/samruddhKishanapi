const router = require("express").Router();
const middlewares = require("../../helper/middlewares");
const admin = require("../../controller/admin/admin");
const auth = require("../../middlewere/tokenVerify");

router.post("/register", admin.register);

router.post("/login", admin.login);

router.post("/changePassword", admin.changePassword);

router.get("/logoAndFavIcon", admin.logoAndFavIcon);

module.exports = router;
