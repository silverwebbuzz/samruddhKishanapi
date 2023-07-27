const router = require("express").Router();

const middlewares = require("../../helper/middlewares");

const role = require("../../controller/role/role");

router.post("/createURole", role.createRole);
router.post("/updateRole", role.updateRole);
router.delete("/deleteRole/:id", role.deleteRole);
router.get("/getSingleRole/:id", role.singleRole);
router.post("/GetAllRole", role.GetAllRole);

// router.post("/getAllState", farmer.getState);
// router.post("/getAllCity", farmer.getCity);

module.exports = router;
