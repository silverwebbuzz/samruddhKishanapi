const router = require("express").Router();
const menus = require("../../controller/menu/menu");

router.post("/createMenu", menus.createMenu);

router.post("/updateMenu", menus.updateMenu);

router.delete("/deleteMenu", menus.deleteMenu);

router.get("/getSingleMenu", menus.getSingleMenu);

router.get("/getAllMenu", menus.getAllMenu);

module.exports = router;
