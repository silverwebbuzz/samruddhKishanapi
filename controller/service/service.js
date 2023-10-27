const knex = require("knex")(require("../../helper/db"));
var worldMapData = require("city-state-country");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");

// Create Services
module.exports.createServices = async (req, res) => {
  try {
    const { serviceBannerImage } = req.files;
    const Services = {
      // vendorName: req.body.vendorName,
      // categoryId: req.body.categoryId,
      vendorId: req.body.vendorId,
      categoryId: req.body.categoryId,
      serviceName: req.body.serviceName,
      serviceType: req.body.serviceType,
      serviceDetails: req.body.serviceDetails,
      serviceLocation: req.body.serviceLocation,
      minOrderQuantity: req.body.minOrderQuantity,
      availabilityStartDay: req.body.availabilityStartDay,
      availabilityEndDay: req.body.availabilityEndDay,
      status: req.body.status,
    };
    if (serviceBannerImage) {
      Services.serviceBannerImage = `https://devapi.hivecareer.com/samruddhKishan/service/uploads/serviceImage/${serviceBannerImage[0].filename}`;
    }
    console.log(Services.serviceBannerImage, "sd");
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
    const checkId = await knex("smk_service").where({ id: id });
    console.log(checkId[0].id);
    if (checkId[0].id) {
      console.log("sdds");
      const { serviceBannerImage } = req.files;
      //   if()
      if (serviceBannerImage) {
        console.log("dd");
        const UpdateServices = {
          // vendorName: req.body.vendorName,
          // categoryName: req.body.categoryName,
          vendorId: req.body.vendorId,
          categoryId: req.body.categoryId,
          serviceName: req.body.serviceName,
          serviceType: req.body.serviceType,
          serviceDetails: req.body.serviceDetails,
          serviceLocation: req.body.serviceLocation,
          minOrderQuantity: req.body.minOrderQuantity,
          availabilityStartDay: req.body.availabilityStartDay,
          availabilityEndDay: req.body.availabilityEndDay,
          status: req.body.status,
          serviceBannerImage: `https://devapi.hivecareer.com/samruddhKishan/service/uploads/serviceImage/${serviceBannerImage[0].filename}`,
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
      } else {
        const UpdateServices = {
          // vendorName: req.body.vendorName,
          // categoryName: req.body.categoryName,
          vendorId: req.body.vendorId,
          categoryId: req.body.categoryId,
          serviceName: req.body.serviceName,
          serviceType: req.body.serviceType,
          serviceDetails: req.body.serviceDetails,
          serviceLocation: req.body.serviceLocation,
          minOrderQuantity: req.body.minOrderQuantity,
          availabilityStartDay: req.body.availabilityStartDay,
          availabilityEndDay: req.body.availabilityEndDay,
          status: req.body.status,
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
      }
    } else {
      res.status(400).json({
        message: "Id Not Found",
      });
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

module.exports.multiDeleteServices = async (req, res) => {
  try {
    const ids = req.body.ids; // Assuming the request body contains an array of IDs
    const deleteServices = await knex("smk_service")
      .whereIn("id", ids)
      .delete();
    if (deleteServices) {
      res.json({
        status: 200,
        data: deleteServices,
        message: "Services Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Not Deleted" });
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
    const page = req.body.page; // Default to page 1 if not provided
    const pageSize = req.body.pageSize; // Default page size of 10 if not provided
    const categoryId = req.body.categoryId || "";
    const vendorId = req.body.vendorId || "";
    const order = req.body.order;
    const sortBy = req.body.sortBy;

    // Function to recursively fetch sub-categories
    async function getAllSubCategories(categoryId) {
      const subCategories = await knex("smk_category")
        .select("id")
        .where("categoryId", categoryId);

      const subCategoryIds = subCategories.map((category) => category.id);

      const allSubCategoryIds = await Promise.all(
        subCategoryIds.map((id) => getAllSubCategories(id))
      );

      return [categoryId, ...subCategoryIds, ...allSubCategoryIds.flat()];
    }

    async function getProductsWithCategories() {
      let queryBuilder = knex("smk_service")
        .select(
          "smk_service.*",
          "smk_category.categoryName",
          "smk_users.firstName",
          "smk_users.lastName"
        )
        .leftJoin("smk_category", "smk_service.categoryId", "smk_category.id")
        .leftJoin("smk_users", "smk_service.vendorId", "smk_users.id");
      // Conditionally apply the category filter
      if (categoryId !== "") {
        // Get all sub-categories for the provided categoryId
        const categoryIds = await getAllSubCategories(categoryId);
        queryBuilder = queryBuilder.whereIn(
          "smk_service.categoryId",
          categoryIds
        );
      }
      if (vendorId !== "") {
        queryBuilder = queryBuilder.andWhere("smk_service.vendorId", vendorId);
      }
          if (order === "asc") {
        queryBuilder = queryBuilder.orderBy("smk_service.serviceName", "asc");
      } else if (order === "desc") {
        queryBuilder = queryBuilder.orderBy("smk_service.serviceName", "desc");
      }

      if (sortBy === "asc") {
        queryBuilder = queryBuilder.orderBy("smk_service.createdAt", "asc");
      } else if (sortBy === "desc") {
        queryBuilder = queryBuilder.orderBy("smk_service.createdAt", "desc");
      }

      const totalCountQuery = queryBuilder
        .clone()
        .clearSelect()
        .count("* as total");
      const totalCountResult = await totalCountQuery.first();
      const totalItems = parseInt(totalCountResult.total);
      const getProductsQuery = queryBuilder
        .orderBy("smk_service.createdAt", "desc")
        .limit(pageSize)
        .offset((page - 1) * pageSize);
      const getProduct = await getProductsQuery;
      res.json({
        status: 200,
        data: getProduct,
        totalItems: totalItems,
      });
    }

    getProductsWithCategories().catch((error) => {
      // Handle any errors that may occur during the query
      console.error(error);
      res.status(500).json({ status: 500, error: "Internal Server Error" });
    });

    // const id = req.body.id;
    // const page = req.body.page || 1; // Default to page 1 if not provided
    // const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    // // const totalCountQuery = knex("smk_service").count("* as total");
    // // const totalCountResult = await totalCountQuery.first();
    // // const totalItems = parseInt(totalCountResult.total);
    // const categoryId = req.body.categoryId || "";
    // // const brandId = req.body.brandId || "";
    // const vendorId = req.body.vendorId || "";

    // const queryBuilder = knex("smk_service")
    //   .select(
    //     "smk_service.*",
    //     "smk_category.categoryName",
    //     "smk_users.firstName",
    //     "smk_users.lastName"
    //   )
    //   .leftJoin("smk_category", "smk_service.categoryId", "smk_category.id")
    //   .leftJoin("smk_users", "smk_service.vendorId", "smk_users.id")
    //   .andWhere(function () {
    //     if (categoryId !== "") {
    //       this.where({ "smk_service.categoryId": categoryId }); // Specify the table alias or name
    //     }
    //   })
    //   .andWhere(function () {
    //     if (vendorId !== "") {
    //       this.where({ "smk_service.vendorId": vendorId }); // Specify the table alias or name
    //     }
    //   });
    // console.log(queryBuilder);
    // const totalCountQuery = queryBuilder
    //   .clone()
    //   .clearSelect()
    //   .count("* as total");
    // console.log(totalCountQuery);
    // const totalCountResult = await totalCountQuery.first();
    // const totalItems = parseInt(totalCountResult.total);

    // // Fetch filtered farmer data with pagination
    // const getFarmerQuery = queryBuilder
    //   .orderBy("createdAt", "desc")
    //   .limit(pageSize)
    //   .offset((page - 1) * pageSize);
    // const getServices = await getFarmerQuery;
    // //   .limit(pageSize)
    // //   .offset((page - 1) * pageSize);
    // // const getServices = await getFarmerQuery;

    // if (getServices) {
    //   res.json({
    //     status: 200,
    //     data: getServices,
    //     currentPage: page,
    //     pageSize: pageSize,
    //     totalItems: totalItems,
    //     message: "Services Get Successfully",
    //   });
    // } else {
    //   res.json({ status: 404, data: [], message: "getServices Not Get" });
    // }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};


// module.exports.GetAllServices = async (req, res) => {
//   try {
//     const id = req.body.id;
//     const page = req.body.page || 1; // Default to page 1 if not provided
//     const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
//     const totalCountQuery = knex("smk_service").count("* as total");
//     const totalCountResult = await totalCountQuery.first();
//     const totalItems = parseInt(totalCountResult.total);

//     const getFarmerQuery = knex("smk_service")
//       .select("*")
//       .limit(pageSize)
//       .offset((page - 1) * pageSize);
//     const getServices = await getFarmerQuery;

//     if (getServices) {
//       res.json({
//         status: 200,
//         data: getServices,
//         currentPage: page,
//         pageSize: pageSize,
//         totalItems: totalItems,
//         message: "Services Get Successfully",
//       });
//     } else {
//       res.json({ status: 404, data: [], message: "getServices Not Get" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(404).send({ status: 404, message: "Something Went Wrong !" });
//   }
// };

module.exports.updateServicesStatus = async (req, res) => {
  try {
    const ids = req.body.ids; // Assuming the request body contains an array of IDs
    const status = req.body.status; // Assuming the new status value is provided in the request body
    const UpdateStatus = await knex("smk_service")
      .whereIn("id", ids)
      .update({ status: status });
    if (UpdateStatus) {
      res.json({
        status: 200,
        data: UpdateStatus,
        message: "Service-Status Updated Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Not Updated" });
    }
  } catch (err) {
    res.send(err);
  }
};