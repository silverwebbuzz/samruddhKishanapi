const knex = require("knex")(require("../../helper/db"));
var worldMapData = require("city-state-country");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");

// Create Services
module.exports.createBrand = async (req, res) => {
  try {
    console.log("ss");
    const { brandLogo } = req.files;
    const Brand = {
      brandName: req.body.brandName,
    };
    if (brandLogo) {
      Brand.brandLogo = `https://devapi.hivecareer.com/samruddhKishan/brand/uploads/brandImages/${brandLogo[0].filename}`;
    }
    console.log(Brand.brandLogo, "sd");
    if (Brand) {
      await knex("smk_brand").insert(Brand);
      res.json({
        status: 200,
        data: Brand,
        message: "Category Brand Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Brand Not Create" });
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.updateBrand = async (req, res) => {
  try {
    const id = req.body.id;
    const checkId = await knex("smk_brand").where({ id: id });
    console.log(checkId[0].id);
    if (checkId[0].id) {
      console.log("sdds");
      const { brandLogo } = req.files;
      //   if()
      if (brandLogo) {
        console.log("dd");
        const brand = {
          brandName: req.body.brandName,
          brandLogo: `https://devapi.hivecareer.com/samruddhKishan/brand/uploads/brandImages/${brandLogo[0].filename}`,
        };
        const Brand = await knex("smk_brand")
          .update(brand)
          .where({ id: req.body.id });
        console.log(Brand);
        if (Brand) {
          res.json({
            status: 200,
            data: brand,
            message: "Brand Updated Successfully",
          });
        } else {
          res.json({ status: 404, data: [], message: "Brand Not Updated" });
        }
      } else {
        const Brand = {
          brandName: req.body.brandName,
        };
        const brand = await knex("smk_brand")
          .update(Brand)
          .where({ id: req.body.id });
        console.log(brand);
        if (brand) {
          res.json({
            status: 200,
            data: Brand,
            message: "Brand Updated Successfully",
          });
        } else {
          res.json({ status: 404, data: [], message: "Brand Not Updated" });
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

module.exports.deleteBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteBrand = await knex("smk_brand").delete().where({ id });
    console.log(deleteBrand);
    if (deleteBrand) {
      res.json({
        status: 200,
        data: deleteBrand,
        message: "Brand Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Brand Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.multiDeleteBrand = async (req, res) => {
  try {
    const ids = req.body.ids; // Assuming the request body contains an array of IDs
    const deleteBrand = await knex("smk_brand").whereIn("id", ids).delete();
    if (deleteBrand) {
      res.json({
        status: 200,
        data: deleteBrand,
        message: "Brand Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.singleBrand = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleBrand = await knex("smk_brand").select("*").where({ id });
    console.log(getSingleBrand);
    if (getSingleBrand.length > 0) {
      res.json({
        status: 200,
        data: getSingleBrand,
        message: "Brand Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Brand Not Get" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.GetAllBrand = async (req, res) => {
  try {
    const id = req.body.id;
    const page = req.body.page; // Default to page 1 if not provided
    const pageSize = req.body.pageSize; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_brand").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getFarmerQuery = knex("smk_brand")
      .select("*")
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const getBrand = await getFarmerQuery;

    if (getBrand) {
      res.json({
        status: 200,
        data: getBrand,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "Brand Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Brand Not Get" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};
