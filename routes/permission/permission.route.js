const router = require("express").Router();
const middlewares = require("../../helper/middlewares");
// const auth = require("../../middlewere/tokenVerify");
const permission = require("../../controller/permission/permission");

router.post("/createPermission", permission.createPermission);

router.post("/updatePermission", permission.updatePermission);

router.delete("/deletePermission/:id", permission.deletePermission);

router.get("/getSinglePermission/:id", permission.singlePermission);

router.post("/GetAllPermission", permission.GetAllPermission);

// router.post("/getAllState", farmer.getState);
// router.post("/getAllCity", farmer.getCity);

module.exports = router;
