const knex = require("knex")(require("../../helper/db"));
var worldMapData = require("city-state-country");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");

module.exports.createCategories = async (req, res) => {
  try {
    var Categories = {
      categoryName: req.body.categoryName,
      categoryId: req.body.categoryId,
      categoryStatus: req.body.categoryStatus,
    };

    if (Categories) {
      await knex("smk_category").insert(Categories);
      res.json({
        status: 200,
        data: Categories,
        message: "Category Create Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Category Not Create" });
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.updateCategories = async (req, res) => {
  try {
    const id = req.params.id;
    const UpdateCategories = {
      categoryName: req.body.categoryName,
      categoryStatus: req.body.categoryStatus,
      categoryId: req.body.categoryId,
    };
    const updateCategories = await knex("smk_category")
      .update(UpdateCategories)
      .where({ id: req.params.id });
    console.log(updateCategories);
    if (updateCategories) {
      res.json({
        status: 200,
        data: UpdateCategories,
        message: "Categories Updated Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Categories Not Updated" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.deleteCategories = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteCategory = await knex("smk_category").delete().where({ id });
    console.log(deleteCategory);
    if (deleteCategory) {
      res.json({
        status: 200,
        data: deleteCategory,
        message: "Category Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Category Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.singleCategories = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleCategory = await knex("smk_category")
      .select("*")
      .where({ id });
    console.log(getSingleCategory);
    if (getSingleCategory.length > 0) {
      res.json({
        status: 200,
        data: getSingleCategory,
        message: "Category Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Category Not Get" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.GetAllCategory = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_category").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getFarmerQuery = knex("smk_category")
      .select("*")
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const getCategory = await getFarmerQuery;

    if (getCategory) {
      res.json({
        status: 200,
        data: getCategory,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "Category Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Category Not Get" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};
