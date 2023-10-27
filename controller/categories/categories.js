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

    async function getAllSubCategories(id) {
      const subCategories = await knex("smk_category")
        .select("id")
        .where("categoryId", id);

      const subCategoryIds = subCategories.map((category) => category.id);

      const allSubCategoryIds = await Promise.all(
        subCategoryIds.map((subCategoryId) =>
          getAllSubCategories(subCategoryId)
        )
      );

      return [id, ...subCategoryIds, ...allSubCategoryIds.flat()];
    }

    const categoryIdsToDelete = await getAllSubCategories(id);
    console.log(categoryIdsToDelete);

    const deleteCategory = await knex("smk_category")
      .whereIn("id", categoryIdsToDelete)
      .del();

    if (deleteCategory) {
      res.json({
        status: 200,
        data: deleteCategory,
        message: "Category and its Subcategories Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Category Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.multiDeleteCategories = async (req, res) => {
  try {
    const ids = req.body.ids; // Assuming the request body contains an array of IDs
    const deleteCategories = await knex("smk_category")
      .whereIn("id", ids)
      .delete();
    if (deleteCategories) {
      res.json({
        status: 200,
        data: deleteCategories,
        message: "Delete Categories Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Not Deleted" });
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

// module.exports.GetAllCategory = async (req, res) => {
//   try {
//     // const userId = req.body.userId;
//     const page = req.body.page || 1; // Default to page 1 if not provided
//     const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
//     const totalCountQuery = knex("smk_category").count("* as total");
//     const totalCountResult = await totalCountQuery.first();
//     const totalItems = parseInt(totalCountResult.total);

//     const getFarmerQuery = knex("smk_category")
//       .select("*")
//       .limit(pageSize)
//       .offset((page - 1) * pageSize);
//     const getCategory = await getFarmerQuery;

//     if (getCategory) {
//       res.json({
//         status: 200,
//         data: getCategory,
//         currentPage: page,
//         pageSize: pageSize,
//         totalItems: totalItems,
//         message: "Category Get Successfully",
//       });
//     } else {
//       res.json({ status: 404, data: [], message: "Category Not Get" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(404).send({ status: 404, message: "Something Went Wrong !" });
//   }
// };

async function fetchTreeData(id = 0, page, pageSize) {
  const offset = (page - 1) * pageSize;
  const results = await knex("smk_category")
    .where({ categoryId: id })
    .offset(offset)
    .limit(pageSize);

  const tree = [];
  for (const result of results) {
    const children = await fetchTreeData(result.id, page, pageSize);
    if (children.length) {
      result.children = children;
    }
    tree.push(result);
  }

  return tree;
}

async function getTotalCategoryCount(id = 0) {
  const count = await knex("smk_category")
    .where({ categoryId: id })
    .count("id as count")
    .first();
  return count.count;
}
module.exports.GetAllCategory = async (req, res) => {
  try {
    const page = req.body.page;
    const pageSize = req.body.pageSize;

    const tree = await fetchTreeData(0, page, pageSize);
    const totalCount = await getTotalCategoryCount();
    res.json({
      status: 200,
      data: tree,
     totalCount: totalCount,
    page:page,
      message: "Category Get Successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};


module.exports.updateMultiSelectStatus = async (req, res) => {
  try {
    const ids = req.body.ids; // Assuming the request body contains an array of IDs
    const categoryStatus = req.body.categoryStatus; // Assuming the new status value is provided in the request body

    // Update the status of selected categories
    const UpdateCategories = await knex("smk_category")
      .whereIn("id", ids)
      .update({ categoryStatus: categoryStatus });

    // Delete the categories
    // const UpdateCategories = await knex("smk_category")
    //   .whereIn("id", ids)
    //   .delete();

    if (UpdateCategories) {
      res.json({
        status: 200,
        data: UpdateCategories,
        message: "Categories-Status Updated Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Not Updated" });
    }
  } catch (err) {
    res.send(err);
  }
  // try {
  //   const id = req.params.id;
  //   const UpdateCategories = {
  //     categoryName: req.body.categoryName,
  //     categoryStatus: req.body.categoryStatus,
  //     categoryId: req.body.categoryId,
  //   };
  //   const updateCategories = await knex("smk_category")
  //     .update(UpdateCategories)
  //     .where({ id: req.params.id });
  //   console.log(updateCategories);
  //   if (updateCategories) {
  //     res.json({
  //       status: 200,
  //       data: UpdateCategories,
  //       message: "Categories Updated Successfully",
  //     });
  //   } else {
  //     res.json({ status: 404, data: [], message: "Categories Not Updated" });
  //   }
  // } catch (err) {
  //   res.send(err);
  // }
};
