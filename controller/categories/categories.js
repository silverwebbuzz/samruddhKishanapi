const knex = require("knex")(require("../../helper/db"));
var worldMapData = require("city-state-country");

const bcrypt = require("bcrypt");
const { json } = require("body-parser");

module.exports.createCategories = async (req, res) => {
  try {
    var Categories = {
      organicSeeds: req.body.organicSeeds,
      organicFertilizer: req.body.organicFertilizer,
      organicPesticide: req.body.organicPesticide,
    };

    if (Categories) {
      await knex("category").insert(Categories);
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
      organicSeeds: req.body.organicSeeds,
      organicFertilizer: req.body.organicFertilizer,
      organicPesticide: req.body.organicPesticide,
    };
    const updateCategories = await knex("category")
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
    const deleteCategory = await knex("category").delete().where({ id });
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
    const getSingleCategory = await knex("category").select("*").where({ id });
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

// module.exports.GetAllFarmer = async (req, res) => {
//   try {
//     const id = req.body.id;

//     const getFarmer = await knex("farmer").select("*");
//     console.log(getFarmer);
//     if (getFarmer) {
//       res.json({
//         status: 200,
//         data: getFarmer,
//         message: "Farmer Get Successfully",
//       });
//     } else {
//       res.json({ status: 404, data: [], message: "Farmer Not Get" });
//     }
//   } catch (err) {
//     res.send(err);
//   }
// };
// module.exports.GetAllFarmer = async (req, res) => {
//   try {
//     const adminId = req.body.adminId;
//     const page = req.body.page || 1; // Default to page 1 if not provided
//     const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided

//     const getFarmer = await knex("farmer")
//       .select("*")
//       .where({ adminId })
//       .limit(pageSize)
//       .offset((page - 1) * pageSize);
//     console.log(getFarmer);

//     // const totalCount = await knex(getFarmer).count("* as total").first();
//     // const totalItems = parseInt(totalCount.total);
//     // const getFarmer = await knex("farmer")
//     //   .select("*")
//     //   .limit(pageSize)
//     //   .offset((page - 1) * pageSize);

//     if (getFarmer) {
//       res.json({
//         status: 200,
//         data: getFarmer,
//         currentPage: page,
//         pageSize: pageSize,
//         message: "Farmer Get Successfully",
//       });
//     } else {
//       res.json({ status: 404, data: [], message: "Farmer Not Get" });
//     }
//   } catch (err) {
//     res.send(err);
//   }
// };

module.exports.GetAllCategory = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided

    const totalCountQuery = knex("category").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getFarmerQuery = knex("category")
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
