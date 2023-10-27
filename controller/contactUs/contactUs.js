const knex = require("knex")(require("../../helper/db"));
const { json } = require("body-parser");

// Create contactUs
module.exports.createContactUs = async (req, res) => {
  try {
    var contactUsName = {
      name: req.body.name,
      email: req.body.email,
      ourLocation: req.body.ourLocation,
    };
    if (contactUsName) {
      await knex("smk_contactus").insert(contactUsName);

      res.json({
        status: 200,
        data: contactUsName,
        message: "contactUs page Create Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "contactUs page Not Create" });
    }
  } catch (err) {
    res.json(err);
  }
};

//update contactUs api
module.exports.updateContactUs = async (req, res) => {
  try {
    const updateContactUs = {
      name: req.body.name,
      email: req.body.email,
      ourLocation: req.body.ourLocation,
    };
    const id = req.body.id;
    const checkId = await knex("smk_contactus").where({ id: id });

    if (checkId[0]) {
      const updatedRows = await knex("smk_contactus")
        .update(updateContactUs)
        .where({ id });

      if (updatedRows > 0) {
        res.status(200).json({
          status: 200,
          data: updateContactUs,
          message: "ContactUs page Updated Successfully",
        });
      } else {
        res.status(404).json({
          status: 404,
          data: [],
          message: "ContactUs page Not Updated",
        });
      }
    } else {
      return res.status(400).json({
        message: "Id Not Found",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

//delete contactUs api
module.exports.deleteContactUs = async (req, res) => {
  try {
    const id = req.body.id;
    const deleteAboutUs = await knex("smk_contactus").delete().where({ id });
    console.log(deleteAboutUs);
    if (deleteAboutUs) {
      res.json({
        status: 200,
        // data: deleteAboutUs,
        message: "AboutUs Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "AboutUs Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

//Get Single contactUs api
module.exports.getSingleContactUs = async (req, res) => {
  try {
    const id = req.body.id;
    const getSingleAboutUs = await knex("smk_contactus")
      .select("*")
      .where({ id });
    console.log(getSingleAboutUs);

    if (getSingleAboutUs.length > 0) {
      res.json({
        status: 200,
        data: getSingleAboutUs,
        message: "Get Single AboutUs Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "AboutUs Not Get" });
    }
  } catch (err) {
    res.send(err);
  }
};

// Get All contactUs api
module.exports.getAllContactUs = async (req, res) => {
  try {
    const id = req.body.id;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_contactus").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getFarmerQuery = knex("smk_contactus")
      .select("*")
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const getAboutUs = await getFarmerQuery;

    if (getAboutUs) {
      res.json({
        status: 200,
        data: getAboutUs,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "AboutUs Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "AboutUs Not Get" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};
