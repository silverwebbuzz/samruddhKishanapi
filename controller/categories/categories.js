const knex = require("knex")(require("../../helper/db"));
var worldMapData = require("city-state-country");

const XLSX = require("xlsx");
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
      page: page,
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

module.exports.UploadCSV = async (req, res) => {
  try {
    // if (req.files == null || req.files == undefined) {
    //   return res.json({
    //     status: false,
    //     statusCode: 204,
    //     message: "Please Re-Upload File",
    //   });
    // }

    const getCategory = await knex("smk_category").select("*");
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const bulkCreateData = [];
    const skippedRows = [];
    const batchSize = 1000;
    for (let i = 0; i < data.length; i += batchSize) {
      const chunk = data.slice(i, i + batchSize);
      for (let j = 0; j < chunk.length; j++) {
        const newLeadData = {
          categoryId: chunk[j]["categoryId"],
          categoryName: chunk[j]["categoryName"],
          categoryStatus: chunk[j]["categoryStatus"],
        };
        try {
          // Continue with your existing lead creation logic
          const leadCustomerType = chunk[j]["categoryName"];
          const customerType = getCategory.find(
            (type) => type.categoryName == leadCustomerType
          );
          // Set lead_status to 1 if the entry is not found
          newLeadData.categoryName = categoryName ? customerType.id : 1;
          bulkCreateData.push(newLeadData);
        } catch (error) {
          console.error(`Error creating lead for row ${i + j + 1}:`, error);
          skippedRows.push({
            row: i + j + 1,
            message: `Error creating lead for row ${i + j + 1}: ${
              error.message
            }`,
          });
        }
      }
    }
    try {
      // Use bulk create to insert the current chunk of leads
      await knex("smk_category").insert(bulkCreateData);
      // Clear bulk create data for the next batch
      bulkCreateData.length = 0;
    } catch (error) {
      console.error(
        `Error creating leads for batch starting at row ${i + 1}:`,
        error
      );
      // Handle the error as needed
    }
    const skipCount = skippedRows.length;
    // Return response
    return res.json({
      status: true,
      statusCode: 200,
      message: "Leads Added Successfully!",
      skippedRows: `${skipCount} Rows Skipped`,
    });
    // const workbook = xlsx.read(req.file.buffer, { type: "buffer" });
    // const sheetName = workbook.SheetNames[0];
    // const sheet = workbook.Sheets[sheetName];

    // const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    // Assuming the first row in the Excel file contains headers
    // const headers = data[0];

    // // Remove the headers from the data
    // const rows = data.slice(1);

    // // Save data to the database
    // await knex("smk_category").insert(
    //   rows.map((row) => {
    //     // await db('your_table_name').insert(rows.map((row) => {
    //     const rowData = {};
    //     headers.forEach((header, index) => {
    //       rowData[header] = row[index];
    //     });
    //     return rowData;
    //   })
    // );

    // res.status(200).json({ message: "Data uploaded successfully" });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
