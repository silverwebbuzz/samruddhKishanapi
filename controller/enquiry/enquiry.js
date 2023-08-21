const knex = require("knex")(require("../../helper/db"));
var worldMapData = require("city-state-country");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");

module.exports.createEnquiry = async (req, res) => {
  try {
    let Enquiry = {
      productId: req.body.productId,
      status: req.body.status,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email,
      fullName: req.body.fullName,
      quantity: req.body.quantity,
    };
    if (Enquiry) {
      await knex("smk_enquiry").insert(Enquiry);
      res.json({
        status: 200,
        data: Enquiry,
        message: "Enquiry Create Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Enquiry Not Create" });
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.updateEnquiry = async (req, res) => {
  try {
    const id = req.params.id;
    const UpdateEnquiry = {
      productId: req.body.productId,
      status: req.body.status,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email,
      fullName: req.body.fullName,
      quantity: req.body.quantity,
    };
    const UpdateEnquirys = await knex("smk_enquiry")
      .update(UpdateEnquiry)
      .where({ id: req.params.id });
    console.log(UpdateEnquirys);
    if (UpdateEnquirys) {
      res.json({
        status: 200,
        data: UpdateEnquirys,
        message: "Update-Enquirys Updated Successfully",
      });
    } else {
      res.json({
        status: 404,
        data: [],
        message: "Update-Enquiryss Not Updated",
      });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.deleteEnquiry = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteEnquiry = await knex("smk_enquiry").delete().where({ id });
    console.log(deleteEnquiry);
    if (deleteEnquiry) {
      res.json({
        status: 200,
        data: deleteEnquiry,
        message: "Delete-Enquiry Deleted Successfully",
      });
    } else {
      res.json({
        status: 404,
        data: [],
        message: "Delete-Enquiry Not Deleted",
      });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.singleEnquiry = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleEnquiry = await knex("smk_enquiry")
      .select("*")
      .where({ id });
    console.log(getSingleEnquiry);
    if (getSingleEnquiry.length > 0) {
      res.json({
        status: 200,
        data: getSingleEnquiry,
        message: "Enquiry Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Enquiry Not Get" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.GetAllEnquiry = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_enquiry").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getFarmerQuery = knex("smk_enquiry")
      .select("*")
      .orderBy("createdAt", "desc")
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const getEnquiry = await getFarmerQuery;

    if (getEnquiry) {
      res.json({
        status: 200,
        data: getEnquiry,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "Enquiry Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Enquiry Not Get" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};
