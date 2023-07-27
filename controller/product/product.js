const knex = require("knex")(require("../../helper/db"));
var worldMapData = require("city-state-country");
const base64ToImage = require("base64-to-image");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");

module.exports.createProduct = async (req, res) => {
  try {
    var product = {
      details: req.body.details,
      howToUseProductLink: req.body.howToUseProductLink,
      productDescription: req.body.productDescription,
      whyOrganicDescription: req.body.whyOrganicDescription,
      howToUseProductLink: req.body.howToUseProductLink,
      does: req.body.does,
      donts: req.body.donts,
      moreDetailsPdf: req.body.moreDetailsPdf,
      stackHight: req.body.stackHight,
      howtoHardle: req.body.howtoHardle,
      expiryDate: req.body.expiryDate,
      additionalProduct: req.body.additionalProduct,
      labReports: req.body.labReports,

      // productImage: req.body.productImage,
    };
    const base64Str = req.body.productImage;
    const path = "./uploads/productImage/";
    const optionalObj = {
      fileName: req.body.filename || "",
      type: base64Str.split(";")[0].split("/")[1],
    };
    const imageInfo = base64ToImage(base64Str, path, optionalObj);
    const filePath = `http://192.168.1.29:3005/product/uploads/productImage/${imageInfo.fileName}`;
    product["productImage"] = filePath;
    console.log(filePath);
    if (product) {
      // const data = {
      //   product,
      //   productImage: filePath,
      //   filename: req.body.filename,
      // };
      await knex("product").insert(product);
      res.json({
        status: 200,
        data: product,
        message: "product Create Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "product Not Create" });
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const UpdateProduct = {
      details: req.body.details,
      howToUseProductLink: req.body.howToUseProductLink,
      productDescription: req.body.productDescription,
      whyOrganicDescription: req.body.whyOrganicDescription,
      howToUseProductLink: req.body.howToUseProductLink,
      does: req.body.does,
      donts: req.body.donts,
      moreDetailsPdf: req.body.moreDetailsPdf,
      stackHight: req.body.stackHight,
      howtoHardle: req.body.howtoHardle,
      expiryDate: req.body.expiryDate,
      additionalProduct: req.body.additionalProduct,
      labReports: req.body.labReports,
    };
    console.log(UpdateProduct);
    const base64Str = req.body.productImage;
    const path = "./uploads/productImage/";
    const optionalObj = {
      fileName: req.body.filename || "",
      type: base64Str.split(";")[0].split("/")[1],
    };
    const imageInfo = base64ToImage(base64Str, path, optionalObj);
    const filePath = `http://192.168.1.29:3005/product/uploads/productImage/${imageInfo.fileName}`;
    UpdateProduct["productImage"] = filePath;

    const updateProduct = await knex("product")
      .update(UpdateProduct)
      .where({ id: req.params.id });

    if (updateProduct) {
      res.json({
        status: 200,
        data: UpdateProduct,
        message: "Product Updated Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Product Not Updated" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await knex("product").delete().where({ id });
    console.log(deleteProduct);
    if (deleteProduct) {
      res.json({
        status: 200,
        data: deleteProduct,
        message: "Product Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Product Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.singleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleProduct = await knex("product").select("*").where({ id });
    console.log(getSingleProduct);
    if (getSingleProduct.length > 0) {
      res.json({
        status: 200,
        data: getSingleProduct,
        message: "Product Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Product Not Get" });
    }
  } catch (err) {
    res.send(err);
  }
};

// // module.exports.GetAllFarmer = async (req, res) => {
// //   try {
// //     const id = req.body.id;

// //     const getFarmer = await knex("farmer").select("*");
// //     console.log(getFarmer);
// //     if (getFarmer) {
// //       res.json({
// //         status: 200,
// //         data: getFarmer,
// //         message: "Farmer Get Successfully",
// //       });
// //     } else {
// //       res.json({ status: 404, data: [], message: "Farmer Not Get" });
// //     }
// //   } catch (err) {
// //     res.send(err);
// //   }
// // };
// // module.exports.GetAllFarmer = async (req, res) => {
// //   try {
// //     const adminId = req.body.adminId;
// //     const page = req.body.page || 1; // Default to page 1 if not provided
// //     const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided

// //     const getFarmer = await knex("farmer")
// //       .select("*")
// //       .where({ adminId })
// //       .limit(pageSize)
// //       .offset((page - 1) * pageSize);
// //     console.log(getFarmer);

// //     // const totalCount = await knex(getFarmer).count("* as total").first();
// //     // const totalItems = parseInt(totalCount.total);
// //     // const getFarmer = await knex("farmer")
// //     //   .select("*")
// //     //   .limit(pageSize)
// //     //   .offset((page - 1) * pageSize);

// //     if (getFarmer) {
// //       res.json({
// //         status: 200,
// //         data: getFarmer,
// //         currentPage: page,
// //         pageSize: pageSize,
// //         message: "Farmer Get Successfully",
// //       });
// //     } else {
// //       res.json({ status: 404, data: [], message: "Farmer Not Get" });
// //     }
// //   } catch (err) {
// //     res.send(err);
// //   }
// // };

module.exports.GetAllProduct = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided

    const totalCountQuery = knex("product").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getFarmerQuery = knex("product")
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
        message: "Product Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Product Not Get" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};
