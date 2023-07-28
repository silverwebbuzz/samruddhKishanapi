// const { response } = require("express");
// const jwt = require("jsonwebtoken");
// // const multer = require("multer");
// // const nodemailer = require("nodemailer");
// const path = require("path");
// const fs = require("fs");
// const handlebars = require("handlebars");
// const sha256 = require("crypto-js/sha256");
const knex = require("knex")(require("../../helper/db"));
var worldMapData = require("city-state-country");
const axios = require("axios");
const base64ToImage = require("base64-to-image");
// const config = require("../../helper/config");
// const sha256 = require("crypto-js/sha256");
const bcrypt = require("bcrypt");
module.exports.farmerCreate = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    let farmer = {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      DOB: req.body.DOB,
      aadharNumber: req.body.aadharNumber,
      mobileNumber: req.body.mobileNumber,
      address: req.body.address,
      villageName: req.body.villageName,
      taluka: req.body.taluka,
      district: req.body.district,
      state: req.body.state,
      pinCode: req.body.pinCode,
      caste: req.body.caste,
      maritalStatus: req.body.maritalStatus,
      gender: req.body.gender,
      religion: req.body.religion,
      landDistrict: req.body.landDistrict,
      subDivision: req.body.subDivision,
      circle: req.body.circle,
      mouza: req.body.mouza,
      landVillage: req.body.landVillage,
      pattaType: req.body.pattaType,
      latNo: req.body.latNo,
      pattaNo: req.body.pattaNo,
      landArea: req.body.landArea,
      landType: req.body.landType,
      farmerLandOwnershipType: req.body.farmerLandOwnershipType,
      adminId: req.body.adminId,
    };
    if (farmer) {
      const getId = await knex("farmer").insert(farmer);
      const id = getId[0];
      const data = { ...farmer, id: id };
      res.json({
        status: 200,
        data: data,
        message: "Farmer Create Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Farmer Not Create" });
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.updateFarmer = async (req, res) => {
  try {
    const id = req.body.id;
    const farmer = {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      DOB: req.body.DOB,
      aadharNumber: req.body.aadharNumber,
      mobileNumber: req.body.mobileNumber,
      address: req.body.address,
      villageName: req.body.villageName,
      taluka: req.body.taluka,
      district: req.body.district,
      state: req.body.state,
      pinCode: req.body.pinCode,
      caste: req.body.caste,
      maritalStatus: req.body.maritalStatus,
      gender: req.body.gender,
      religion: req.body.religion,
      landDistrict: req.body.landDistrict,
      subDivision: req.body.subDivision,
      circle: req.body.circle,
      mouza: req.body.mouza,
      landVillage: req.body.landVillage,
      pattaType: req.body.pattaType,
      latNo: req.body.latNo,
      pattaNo: req.body.pattaNo,
      landArea: req.body.landArea,
      landType: req.body.landType,
      farmerLandOwnershipType: req.body.farmerLandOwnershipType,
      adminId: req.body.adminId,
    };

    const updateFarmer = await knex("farmer").update(farmer).where({ id });
    console.log(updateFarmer);
    if (updateFarmer) {
      res.json({
        status: 200,
        data: farmer,
        message: "Farmer Updated Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Farmer Not Updated" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.deleteFarmer = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteFarmer = await knex("farmer").delete().where({ id });
    console.log(deleteFarmer);
    if (deleteFarmer) {
      res.json({
        status: 200,
        data: deleteFarmer,
        message: "Farmer Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Farmer Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.singleFarmer = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleFarmer = await knex("farmer").select("*").where({ id });
    console.log(getSingleFarmer);
    if (getSingleFarmer.length > 0) {
      res.json({
        status: 200,
        data: getSingleFarmer,
        message: "Farmer Single Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Farmer Not Get" });
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

// module.exports.GetAllFarmer = async (req, res) => {
//   try {
//     const adminId = req.body.adminId;
//     const page = req.body.page || 1; // Default to page 1 if not provided
//     const pageSize = req.body.pageSize || 10;
//     const taluka = req.body.taluka || "";
//     // Default page size of 10 if not provided

//     let totalCountQuery = knex("farmer").count("* as total").where({ adminId });

//     const totalCountResult = await totalCountQuery.first();
//     const totalItems = parseInt(totalCountResult.total);
//     const getFarmerQuery = knex("farmer")
//       .select("*")
//       .where({ adminId })
//       .andWhere({ taluka: req.body.taluka })
//       .limit(pageSize)
//       .offset((page - 1) * pageSize);
//     const getFarmer = await getFarmerQuery;
//     if (getFarmer) {
//       res.json({
//         status: 200,
//         data: getFarmer,
//         currentPage: page,
//         pageSize: pageSize,
//         totalItems: totalItems,
//         message: "Farmer Get Successfully",
//       });
//     } else {
//       res.json({ status: 404, data: [], message: "Farmer Not Get" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(404).send({ status: 404, message: "Something Went Wrong !" });
//   }
// };
// module.exports.GetAllFarmer = async (req, res) => {
//   try {
//     const adminId = req.body.adminId;
//     const page = req.body.page || 1;
//     const pageSize = req.body.pageSize || 10;
//     const state = req.body.state || "";
//     const district = req.body.district || "";
//     const taluka = req.body.taluka || "";
//     const createdAt = req.body.createdAt || "";
//     const referralName = req.body.referralName || "";
//     const referralId = req.body.referralId || "";

//     // Total count query
//     let totalCountQuery = knex("farmer").count("* as total").where({ adminId });
//     const totalCountResult = await totalCountQuery.first();
//     const totalItems = parseInt(totalCountResult.total);
//     const getFarmerQuery = knex("farmer")
//       .select("*")
//       .where({ adminId })
//       .andWhere(function () {
//         if (state !== "") {
//           this.where({ state });
//         }
//       })
//       .andWhere(function () {
//         if (district !== "") {
//           this.where({ district });
//         }
//       })
//       .andWhere(function () {
//         if (taluka !== "") {
//           this.where({ taluka });
//         }
//       })
//       .andWhere(function () {
//         if (referralName !== "") {
//           this.where({ referralName });
//         }
//       })
//       .andWhere(function () {
//         if (referralId !== "") {
//           this.where({ referralId });
//         }
//       })
//       .orderBy("farmer.createdAt", createdAt)
//       .limit(pageSize)
//       .offset((page - 1) * pageSize);
//     const getFarmer = await getFarmerQuery;

//     if (getFarmer.length > 0) {
//       res.json({
//         status: 200,
//         data: getFarmer,
//         currentPage: page,
//         pageSize: pageSize,
//         totalItems: totalItems,
//         message: "Farmer Get Successfully",
//       });
//     } else {
//       res.json({ status: 404, data: [], message: "Farmer Not Found" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(404).send({ status: 404, message: "Something Went Wrong !" });
//   }
// };

// module.exports.GetAllFarmer = async (req, res) => {
//   try {
//     const adminId = req.body.adminId;
//     const page = req.body.page || 1;
//     const pageSize = req.body.pageSize || 10;
//     const state = req.body.state || "";
//     const district = req.body.district || "";
//     const taluka = req.body.taluka || "";
//     const createdAt = req.body.createdAt || "";
//     const referralName = req.body.referralName || "";
//     const referralId = req.body.referralId || "";

//     // Total count query
//     let totalCountQuery = knex("farmer").count("* as total").where({ adminId });

//     // Add conditions for other filters
//     totalCountQuery
//       .andWhere(function () {
//         if (state !== "") {
//           this.where({ state });
//         }
//       })
//       .andWhere(function () {
//         if (district !== "") {
//           this.where({ district });
//         }
//       })
//       .andWhere(function () {
//         if (taluka !== "") {
//           this.where({ taluka });
//         }
//       })
//       .andWhere(function () {
//         if (referralName !== "") {
//           this.where({ referralName });
//         }
//       })
//       .andWhere(function () {
//         if (referralId !== "") {
//           this.where({ referralId });
//         }
//       });

//     const totalCountResult = await totalCountQuery.first();
//     const totalItems = parseInt(totalCountResult.total);

//     // Fetch filtered farmer data with pagination
//     const getFarmerQuery = knex("farmer")
//       .select("*")
//       .where({ adminId })
//       .andWhere(function () {
//         if (state !== "") {
//           this.where({ state });
//         }
//       })
//       .andWhere(function () {
//         if (district !== "") {
//           this.where({ district });
//         }
//       })
//       .andWhere(function () {
//         if (taluka !== "") {
//           this.where({ taluka });
//         }
//       })
//       .andWhere(function () {
//         if (referralName !== "") {
//           this.where({ referralName });
//         }
//       })
//       .andWhere(function () {
//         if (referralId !== "") {
//           this.where({ referralId });
//         }
//       })
//       .orderBy("farmer.createdAt", createdAt)
//       .limit(pageSize)
//       .offset((page - 1) * pageSize);

//     const getFarmer = await getFarmerQuery;

//     if (getFarmer.length > 0) {
//       res.json({
//         status: 200,
//         data: getFarmer,
//         currentPage: page,
//         pageSize: pageSize,
//         totalItems: totalItems,
//         message: "Farmer Get Successfully",
//       });
//     } else {
//       res.json({ status: 404, data: [], message: "Farmer Not Found" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.status(404).send({ status: 404, message: "Something Went Wrong !" });
//   }
// };
module.exports.GetAllFarmer = async (req, res) => {
  try {
    const adminId = req.body.adminId;
    const page = req.body.page || 1;
    const pageSize = req.body.pageSize || 10;
    const state = req.body.state || "";
    const district = req.body.district || "";
    const taluka = req.body.taluka || "";
    const createdAt = req.body.createdAt || "";
    const referralName = req.body.referralName || "";
    const referralId = req.body.referralId || "";
    if (adminId) {
      console.log("1");
      const queryBuilder = knex("farmer")
        .select("*")
        // .where({ adminId })
        .andWhere(function () {
          if (state !== "") {
            this.where({ state });
          }
        })
        .andWhere(function () {
          if (district !== "") {
            this.where({ district });
          }
        })
        .andWhere(function () {
          if (taluka !== "") {
            this.where({ taluka });
          }
        })
        .andWhere(function () {
          if (referralName !== "") {
            this.where({ referralName });
          }
        })
        .andWhere(function () {
          if (referralId !== "") {
            this.where({ referralId });
          }
        });

      // Get total count
      const totalCountQuery = queryBuilder
        .clone()
        .clearSelect()
        .count("* as total");
      const totalCountResult = await totalCountQuery.first();
      const totalItems = parseInt(totalCountResult.total);

      // Fetch filtered farmer data with pagination
      const getFarmerQuery = queryBuilder
        .orderBy("createdAt", "desc")
        .limit(pageSize)
        .offset((page - 1) * pageSize);
      const getFarmer = await getFarmerQuery;
      // let TotalFarmerCount = knex("farmer")
      //   .count("* as total")
      //   .where({ adminId });
      let totalCountFarmer = knex("farmer")
        .count("* as total")
        .where({ adminId });
      const totalResult = await totalCountFarmer.first();
      const TotalFarmerCount = parseInt(totalResult.total);
      if (getFarmer.length > 0) {
        res.json({
          status: 200,
          data: getFarmer,
          currentPage: page,
          pageSize: pageSize,
          totalFilterCount: totalItems,
          totalFarmerCount: TotalFarmerCount,
          message: "Farmer Get Successfully",
        });
      } else {
        res.json({ status: 404, data: [], message: "Farmer Not Found" });
      }
    } else {
      console.log("sdsd");
      if (referralId) {
        console.log("2");
        console.log("sds");
        // const find = knex("permission").select("*");
        // const finddd = await find;

        // console.log(finddd);

        const queryBuilder = knex("farmer")
          .select("*")
          .andWhere(function () {
            if (state !== "") {
              this.where({ state });
            }
          })
          .andWhere(function () {
            if (district !== "") {
              this.where({ district });
            }
          })
          .andWhere(function () {
            if (taluka !== "") {
              this.where({ taluka });
            }
          })
          .andWhere(function () {
            if (referralName !== "") {
              this.where({ referralName });
            }
          })
          .andWhere(function () {
            if (referralId !== "") {
              this.where({ referralId });
            }
          });

        // Get total count
        const totalCountQuery = queryBuilder
          .clone()
          .clearSelect()
          .count("* as total");
        const totalCountResult = await totalCountQuery.first();
        const totalItems = parseInt(totalCountResult.total);

        // Fetch filtered farmer data with pagination
        const getFarmerQuery = queryBuilder
          .orderBy("createdAt", createdAt)
          .limit(pageSize)
          .offset((page - 1) * pageSize);
        const getFarmer = await getFarmerQuery;
        // let TotalFarmerCount = knex("farmer")
        //   .count("* as total")
        //   .where({ adminId });
        let totalCountFarmer = knex("farmer").count("* as total");
        const totalResult = await totalCountFarmer.first();
        const TotalFarmerCount = parseInt(totalResult.total);
        if (getFarmer.length > 0) {
          res.json({
            status: 200,
            data: getFarmer,
            currentPage: page,
            pageSize: pageSize,
            totalFilterCount: totalItems,
            totalFarmerCount: TotalFarmerCount,
            message: "Farmer Get Successfully",
          });
        } else {
          res.json({ status: 404, data: [], message: "Farmer Not Found" });
        }
      } else {
        res.json({ status: 404, data: [], message: "ReferralId Required" });
      }
    }

    // const query = knex("farmer").select("*").where({ referralId });

    // if (query) {
    //   const get = query
    //     .orderBy("createdAt", createdAt)
    //     .limit(pageSize)
    //     .offset((page - 1) * pageSize);
    //   const getRefral = await get;

    //   res.json({
    //     status: 200,
    //     data: getRefral,
    //     message: "Farmer Get Successfully",
    //   });
    // } else {

    // }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};
module.exports.getState = async (req, res) => {
  try {
    const statesList = worldMapData.getAllStatesFromCountry("India");
    if (statesList.length > 0) {
      res.json({ data: statesList });
    } else {
      res.json({ data: [], message: "State Not Found" });
    }
  } catch (err) {
    res.json(err);
    // throw new HttpException(err, HttpStatus.BAD_REQUEST);
  }
};

module.exports.getCity = async (req, res) => {
  try {
    const state = req.body.state;
    const citysList = worldMapData.getAllCitiesFromState(`${state}`);
    console.log(citysList);
    if (citysList.length > 0) {
      res.json({ data: citysList, message: "Get All City" });
    } else {
      res.json({ data: [], message: "City Not Found" });
    }
  } catch (err) {
    res.send(err);
    // throw new HttpException(err, HttpStatus.BAD_REQUEST);
  }
};

module.exports.getPincode = async (req, res) => {
  try {
    const pinCode = req.params.pinCode;
    // try {
    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${pinCode}`
    );

    if (response.status === 200) {
      // Pincode data found
      res.send(response.data);
      console.log(response.data);
    } else {
      // Pincode data not found
      console.log("Pincode data not found");
    }
    // } catch (error) {
    //   // Error occurred during the API request
    //   console.error(error);
    // }
  } catch (err) {
    res.send(err);
    // throw new HttpException(err, HttpStatus.BAD_REQUEST);
  }
};

module.exports.uploadImage = async (req, res) => {
  try {
    const base64Str = req.body.file;
    const checkId = await knex("farmer").where({ id: req.body.id });
    if (checkId.app) console.log(checkStatus);
    if (checkId) {
      const path = "./uploads/soilReports/";
      const optionalObj = {
        fileName: req.body.filename || "",
        type: base64Str.split(";")[0].split("/")[1],
      };
      const imageInfo = base64ToImage(base64Str, path, optionalObj);
      const filePath = `http://192.168.1.29:3005/farmer/uploads/soilReports/${imageInfo.fileName}`;
      const updateFarmer = await knex("farmer")
        .update({
          file: filePath,
          filename: req.body.filename,
          appliedForSoilTesting: true,
        })
        .where({ id: req.body.id });
      res.send({ data: filePath, message: "Image Upload Successfully" });
    } else {
      return { data: [], message: "User Not Exits", status: 400 };
    }
  } catch (err) {
    return err;
  }
};
const getImage = async (req, res) => {
  const filename = req.params.filename;
  res.sendFile(filename, { root: "uploads/soilReports" });
};
// module.exports.getVillage = async (req, res) => {
//   try {
//     const state = req.body.village;
//     const citysList = worldMapData.(`${village}`);
//     console.log(citysList);
//     if (citysList.length > 0) {
//       res.json({ data: citysList, message: "Get All City" });
//     } else {
//       res.json({ data: [], message: "City Not Found" });
//     }
//   } catch (err) {
//     res.send(err);
//     // throw new HttpException(err, HttpStatus.BAD_REQUEST);
//   }
// };
