const knex = require("knex")(require("../../helper/db"));
const { json } = require("body-parser");

// Create Services
module.exports.createMenu = async (req, res) => {
  try {
    var menu = {
      menuName: req.body.menuName,
    };
    if (menu) {
      await knex("smk_menu").insert(menu);

      res.json({
        status: 200,
        data: menu,
        message: "Menu Create Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Menu Not Create" });
    }
  } catch (err) {
    res.json(err);
  }
};

//update Menu api
module.exports.updateMenu = async (req, res) => {
  try {
    const id = req.body.id;
    const updateMenu = {
      menuName: req.body.menuName,
    };
    const UpdateMenu = await knex("smk_menu").update(updateMenu).where({ id });

    console.log(UpdateMenu);
    if (UpdateMenu) {
      res.json({
        status: 200,
        data: updateMenu,
        message: "Menu Updated Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Menu Not Updated" });
    }
  } catch (err) {
    res.send(err);
  }
};

//delete Menu api
module.exports.deleteMenu = async (req, res) => {
  try {
    const id = req.body.id;
    const deleteMenu = await knex("smk_menu").delete().where({ id });
    console.log(deleteMenu);
    if (deleteMenu) {
      res.json({
        status: 200,
        data: deleteMenu,
        message: "Menu Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Menu Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

//Get Single Menu api
module.exports.getSingleMenu = async (req, res) => {
  try {
    const id = req.body.id;
    const getSingleMenu = await knex("smk_menu").select("*").where({ id });
    console.log(getSingleMenu);

    if (getSingleMenu.length > 0) {
      res.json({
        status: 200,
        data: getSingleMenu,
        message: "Get Single menu Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Menu Not Get" });
    }
  } catch (err) {
    res.send(err);
  }
};

// Get All Menu api
module.exports.getAllMenu = async (req, res) => {
  try {
    const id = req.body.id;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_menu").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getFarmerQuery = knex("smk_menu")
      .select("*")
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const getMenus = await getFarmerQuery;

    if (getMenus) {
      res.json({
        status: 200,
        data: getMenus,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "Menu Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Menu Not Get" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};
