const knex = require("knex")(require("../../helper/db"));
const { json } = require("body-parser");

// Create AboutUs
module.exports.createAboutUs = async (req, res) => {
  try {
    var aboutUsName = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      discription: req.body.discription,
    };
    if (aboutUsName) {
      await knex("smk_usercontactus").insert(aboutUsName);

      res.json({
        status: 200,
        data: aboutUsName,
        message: "AboutUs Create Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "AboutUs Not Create" });
    }
  } catch (err) {
    res.json(err);
  }
};

//update AboutUs api
module.exports.updateAboutUs = async (req, res) => {
  try {
    const updateAboutUs = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      discription: req.body.discription,
    };
    const id = req.body.id;
    const checkId = await knex("smk_usercontactus").where({ id: id });

    if (checkId[0]) {
      const updatedRows = await knex("smk_usercontactus")
        .update(updateAboutUs)
        .where({ id });

      if (updatedRows > 0) {
        res.status(200).json({
          status: 200,
          data: updateAboutUs,
          message: "AboutUs Updated Successfully",
        });
      } else {
        res.status(404).json({
          status: 404,
          data: [],
          message: "AboutUs Not Updated",
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

//delete AboutUs api
module.exports.deleteAboutUs = async (req, res) => {
  try {
    const id = req.body.id;
    const deleteAboutUs = await knex("smk_usercontactus")
      .delete()
      .where({ id });
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

//Get Single AboutUs api
module.exports.getSingleAboutUs = async (req, res) => {
  try {
    const id = req.body.id;
    const getSingleAboutUs = await knex("smk_usercontactus")
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

// Get All AboutUs api
module.exports.getAllAboutUs = async (req, res) => {
  try {
    const id = req.body.id;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_usercontactus").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getFarmerQuery = knex("smk_usercontactus")
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
