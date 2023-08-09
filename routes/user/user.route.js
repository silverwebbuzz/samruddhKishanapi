const router = require("express").Router();

const middlewares = require("../../helper/middlewares");

const user = require("../../controller/users/users");

router.post("/createUsers", user.createUser);

router.post("/updateUsers", user.updateUser);

router.delete("/deleteUsers/:id", user.deleteUser);

router.get("/getSingleUsers/:id", user.singleUser);

router.post("/getAllUsers", user.GetAllUser);

router.post("/UserLogin", user.UserLogin);

// router.post("/getAllState", farmer.getState);
// router.post("/getAllCity", farmer.getCity);

module.exports = router;
