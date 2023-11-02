const knex = require("knex")(require("../../helper/db"));
const { json } = require("body-parser");

// Create contactUs
module.exports.aboutUsPage = async (req, res) => {
  try {
    const updateAboutUs = {
      title: req.body.title,
      description: req.body.description,
      title2: req.body.title2,
      description2: req.body.description2,
    };
    const id = req.body.id || "";
    const checkId = await knex("smk_mainaboutpage").where({ id: id });

    if (checkId[0]) {
      const updatedRows = await knex("smk_mainaboutpage")
        .update(updateAboutUs)
        .where({ id });
      if (updatedRows > 0) {
        res.status(200).json({
          status: 200,
          data: updateAboutUs,
          message: "About-Us page Updated Successfully",
        });
      } else {
        res.status(404).json({
          status: 404,
          data: [],
          message: "About_Us page Not Updated",
        });
      }
    } else {
      await knex("smk_mainaboutpage").insert(updateAboutUs);
      res.json({
        status: 200,
        data: updateAboutUs,
        message: "About-Us page Create Successfully",
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
  //   try {
  //     const id = req.body.id;

  //     var aboutPage = {
  //       title: req.body.title,
  //       description: req.body.description,
  //       title2: req.body.title2,
  //       description2: req.body.description2,
  //     };
  //     if (aboutPage) {
  //       await knex("smk_mainaboutpage").insert(aboutPage);
  //       res.json({
  //         status: 200,
  //         data: aboutPage,
  //         message: "About-Us page Create Successfully",
  //       });
  //     } else {
  //       res.json({ status: 404, data: [], message: "About-Us page Not Create" });
  //     }
  //   } catch (err) {
  //     res.json(err);
  //   }
};

//update contactUs api

//delete contactUs api
module.exports.deleteAboutUsPage = async (req, res) => {
  try {
    const id = req.body.id;
    const deleteAboutUs = await knex("smk_mainaboutpage")
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

//Get Single contactUs api
module.exports.getSingleAboutUsPage = async (req, res) => {
  try {
    const id = req.body.id;
    const getSingleAboutUs = await knex("smk_mainaboutpage")
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
module.exports.getAllAboutUsPage = async (req, res) => {
  try {
    const id = req.body.id;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_mainaboutpage").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getFarmerQuery = knex("smk_mainaboutpage")
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
