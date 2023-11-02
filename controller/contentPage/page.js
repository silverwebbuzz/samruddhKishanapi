const knex = require("knex")(require("../../helper/db"));
const { json } = require("body-parser");

// Create contactUs
module.exports.createPage = async (req, res) => {
  try {
    const pages = req.body.pages;
    const id = req.body.id || "";

    const existingRecord = await knex("smk_page").where({ id: id }).first();

    if (!existingRecord) {
      // Insert a new record
      await knex("smk_page").insert({ pages: JSON.stringify(pages) });
      res.status(200).json({
        status: "success",
        message: "Page added successfully",
        pages: pages,
      });
    } else {
      // Update the existing record


      await knex("smk_page")
        .update({ pages: JSON.stringify(pages) })
        .where({ id: id });

      res.status(200).json({
        status: "success",
        message: "Pages added successfully",
        pages: pages, // Return the updated array
      });
    }
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
};

//update contactUs api
module.exports.updatePage = async (req, res) => {
  try {
    const updatePage = {
      pageTitle: req.body.pageTitle,
      pageSlug: req.body.pageSlug,
      pageDescription: req.body.pageDescription,
    };
    const id = req.body.id;
    const checkId = await knex("smk_page").where({ id: id });
    if (checkId[0]) {
      const updatedRows = await knex("smk_page")
        .update(updatePage)
        .where({ id });
      if (updatedRows > 0) {
        res.status(200).json({
          status: 200,
          data: updatePage,
          message: "Page Updated Successfully",
        });
      } else {
        res.status(404).json({
          status: 404,
          data: [],
          message: "Page Not Updated",
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
module.exports.deletePage = async (req, res) => {
  try {
    const id = req.body.id;
    const deletePage = await knex("smk_page").delete().where({ id });
    console.log(deletePage);
    if (deletePage) {
      res.json({
        status: 200,
        // data: deleteAboutUs,
        message: "Page Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Page Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

//Get Single contactUs api
module.exports.getSinglePage = async (req, res) => {
  try {
    const id = req.body.id;
    const getSinglePage = await knex("smk_page").select("*").where({ id });
    console.log(getSinglePage);

    if (getSinglePage.length > 0) {
      res.json({
        status: 200,
        data: getSinglePage,
        message: "Get Single Page Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Page Not Get" });
    }
  } catch (err) {
    res.send(err);
  }
};

// Get All contactUs api
module.exports.getAllPage = async (req, res) => {
  try {
    const id = req.body.id;
    const page = req.body.page; // Default to page 1 if not provided
    const pageSize = req.body.pageSize; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_page").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);
    const getPageQuery = knex("smk_page")
      .select("*")
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const getPage = await getPageQuery;
    if (getPage) {
      res.json({
        status: 200,
        data: getPage,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "Page Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Page Not Get" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};
