const knex = require("knex")(require("../../helper/db"));
var worldMapData = require("city-state-country");

const bcrypt = require("bcrypt");
const { json } = require("body-parser");
module.exports.createPermission = async (req, res) => {
  try {
    var permission = {
      moduleName: req.body.moduleName,
    };

    if (permission) {
      await knex("permission").insert(permission);
      res.json({
        status: 200,
        data: permission,
        message: "ModuleName Create Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "ModuleName Not Create" });
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.updatePermission = async (req, res) => {
  try {
    const id = req.body.id;
    const permission = {
      moduleName: req.body.moduleName,
    };
    const updatePermission = await knex("permission")
      .update(permission)
      .where({ id });
    console.log(updatePermission);
    if (updatePermission) {
      res.json({
        status: 200,
        data: updatePermission,
        message: "Permission Updated Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Permission Not Updated" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.deletePermission = async (req, res) => {
  try {
    const id = req.params.id;
    const deletePermission = await knex("permission").delete().where({ id });
    console.log(deletePermission);
    if (deletePermission) {
      res.json({
        status: 200,
        data: deletePermission,
        message: "Permission Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "permission Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.singlePermission = async (req, res) => {
  try {
    const id = req.params.id;
    const getSinglePermission = await knex("permission")
      .select("*")
      .where({ id });
    console.log(getSinglePermission);
    if (getSinglePermission.length > 0) {
      res.json({
        status: 200,
        data: getSinglePermission,
        message: "Permission Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "permission Not Get" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.GetAllPermission = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    if (!req.body.page) {
      const totalCountQuery = knex("permission").count("* as total");
      const totalCountResult = await totalCountQuery.first();

      const getFarmerQuery = knex("permission").select("*");

      const getPermission = await getFarmerQuery;

      if (getPermission) {
        res.json({
          status: 200,
          data: getPermission,
          message: "Permission Get Successfully",
        });
      } else {
        res.json({ status: 404, data: [], message: "Permission Not Get" });
      }
    } else {
      const totalCountQuery = knex("permission").count("* as total");
      const totalCountResult = await totalCountQuery.first();
      const totalItems = parseInt(totalCountResult.total);

      const getFarmerQuery = knex("permission")
        .select("*")
        .limit(pageSize)
        .offset((page - 1) * pageSize);
      const getPermission = await getFarmerQuery;

      if (getPermission) {
        res.json({
          status: 200,
          data: getPermission,
          currentPage: page,
          pageSize: pageSize,
          totalItems: totalItems,
          message: "Permission Get Successfully",
        });
      } else {
        res.json({ status: 404, data: [], message: "Permission Not Get" });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};
