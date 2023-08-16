const knex = require("knex")(require("../../helper/db"));
var worldMapData = require("city-state-country");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");

// Create Services
module.exports.createServices = async (req, res) => {
  try {
    var Services = {
      ServiceName: req.body.ServiceName,
      ServiceDescription: req.body.ServiceDescription,
    };
    if (Services) {
      await knex("smk_service").insert(Services);
      res.json({
        status: 200,
        data: Services,
        message: "Category Create Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Service Not Create" });
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.updateServices = async (req, res) => {
  try {
    const id = req.body.id;
    const UpdateServices = {
      ServiceName: req.body.ServiceName,
      ServiceDescription: req.body.ServiceDescription,
    };
    const updateServices = await knex("smk_service")
      .update(UpdateServices)
      .where({ id: req.body.id });
    console.log(updateServices);
    if (updateServices) {
      res.json({
        status: 200,
        data: UpdateServices,
        message: "Services Updated Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Services Not Updated" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.deleteServices = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteServices = await knex("smk_service").delete().where({ id });
    console.log(deleteServices);
    if (deleteServices) {
      res.json({
        status: 200,
        data: deleteServices,
        message: "Services Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Services Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.singleServices = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleServices = await knex("smk_service")
      .select("*")
      .where({ id });
    console.log(getSingleServices);
    if (getSingleServices.length > 0) {
      res.json({
        status: 200,
        data: getSingleServices,
        message: "Service Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Services Not Get" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.GetAllServices = async (req, res) => {
  try {
    const id = req.body.id;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_service").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getFarmerQuery = knex("smk_service")
      .select("*")
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const getServices = await getFarmerQuery;

    if (getServices) {
      res.json({
        status: 200,
        data: getServices,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "Services Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "getServices Not Get" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};