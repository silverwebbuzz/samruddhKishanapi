// const { response } = require("express");
// const jwt = require("jsonwebtoken");
// // const multer = require("multer");
// // const nodemailer = require("nodemailer");
// const path = require("path");
// const fs = require("fs");
// const handlebars = require("handlebars");
// const sha256 = require("crypto-js/sha256");
const convert = require("convert-units");
const knex = require("knex")(require("../../helper/db"));
var worldMapData = require("city-state-country");
const axios = require("axios");
const XLSX = require("xlsx");
const base64ToImage = require("base64-to-image");
const crypto = require("crypto");
// const config = require("../../helper/config");
// const sha256 = require("crypto-js/sha256");
const bcrypt = require("bcrypt");

module.exports.farmerCreate = async (req, res) => {
  try {
    const prefix = "SMK";
    const randomString = crypto.randomBytes(6).toString("hex");
    const uniqId = `${prefix}${randomString}`;
    const salt = await bcrypt.genSalt();
    const { Document } = req.files;
    let farmer = {
      uniqId: uniqId,
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
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
      referralId: req.body.referralId,
      referralName: req.body.referralName,
      asPerAbove: req.body.asPerAbove,
      wpNumber: req.body.wpNumber,
      appliedForSoilTesting: req.body.appliedForSoilTesting,
    };

    if (farmer) {
      const getId = await knex("smk_farmer").insert(farmer);
      const id = getId[0];
      if (Document) {
        const galleryImages = Document.map(
          (image) =>
            `https://devapi.hivecareer.com/samruddhKishan/farmer/uploads/soilReports/${image.filename}`
        );
        const multiImages = galleryImages.map((imageUrl) => ({
          farmerId: id,
          file: imageUrl,
        }));
        await knex("smk_landdocument").insert(multiImages);
      }
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
    const { Document } = req.files;
    const farmer = {
      firstName: req.body.firstName,
      middleName: req.body.middleName,
      lastName: req.body.lastName,
      dateOfBirth: req.body.dateOfBirth,
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
      referralId: req.body.referralId,
      referralName: req.body.referralName,
      asPerAbove: req.body.asPerAbove,
      wpNumber: req.body.wpNumber,
      appliedForSoilTesting: req.body.appliedForSoilTesting,
    };

    const updateFarmer = await knex("smk_farmer").update(farmer).where({ id });
    console.log(updateFarmer);
    if (Document) {
      console.log("ddd");
      const galleryImages = Document.map(
        (image) =>
          `https://devapi.hivecareer.com/samruddhKishan/farmer/uploads/soilReports/${image.filename}`
      );

      const multiImages = galleryImages.map((imageUrl) => ({
        farmerId: id,
        file: imageUrl,
      }));

      await knex("smk_landdocument").insert(multiImages);
    }
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

module.exports.deleteLandDocument = async (req, res) => {
  try {
    const ids = req.body.ids; // Assuming the request body contains an array of IDs
    const deleteDocument = await knex("smk_landdocument")
      .whereIn("id", ids)
      .delete();

    if (deleteDocument) {
      res.json({
        status: 200,
        data: deleteDocument,
        message: "Land Document Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Document Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.deleteFarmer = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteFarmer = await knex("smk_farmer").delete().where({ id });
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

module.exports.multiDeleteFarmer = async (req, res) => {
  try {
    const ids = req.body.ids; // Assuming the request body contains an array of IDs
    const deleteFarmer = await knex("smk_farmer").whereIn("id", ids).delete();
    if (deleteFarmer) {
      res.json({
        status: 200,
        data: deleteFarmer,
        message: "Farmer Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.singleFarmer = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleFarmer = await knex("smk_farmer").select("*").where({ id });
    console.log(getSingleFarmer);
    const array = [];
    const getImage = await knex("smk_landdocument")
      .select("*")
      .where({ farmerId: id });

    console.log(
      getImage.map((e) => {
        array.push({ file: e.file, id: e.id });
        console.log(e.file);
      })
    );
    console.log(array, "array");
    // console.log(getSingleProduct);

    const data = {
      ...getSingleFarmer[0],
      file: [...array],
    };

    if (getSingleFarmer.length > 0) {
      res.json({
        status: 200,
        data: data,
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
    const uniqId = req.body.uniqId || "";
    const page = req.body.page;
    const pageSize = req.body.pageSize;
    const state = req.body.state || "";
    const district = req.body.district || "";
    const taluka = req.body.taluka || "";
    const createdAt = req.body.createdAt || "";
    const referralName = req.body.referralName || "";
    const farmerName = req.body.farmerName || "";
    let referralId = req.body.referralId || [];
    referralId = Array.isArray(referralId) ? referralId : [referralId];

    if (adminId) {
      console.log("1");
      const queryBuilder = knex("smk_farmer")
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
          if (referralId.length > 0) {
            this.whereIn("referralId", referralId);
          }
        })
        .andWhere(function () {
          if (farmerName !== "") {
            this.where(function () {
              this.where("firstName", "LIKE", `%${farmerName}%`).orWhere(
                "lastName",
                "LIKE",
                `%${farmerName}%`
              );
            });
          }
        })
        .andWhere(function () {
          if (uniqId !== "") {
            this.where(function () {
              this.where("uniqId", "LIKE", `%${uniqId}%`);
            });
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
      let totalCountFarmer = knex("smk_farmer")
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

        const queryBuilder = knex("smk_farmer")
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
            if (referralId.length > 0) {
              this.whereIn("referralId", referralId);
            }
          })
          .andWhere(function () {
            if (farmerName !== "") {
              this.where(function () {
                this.where("firstName", "LIKE", `%${farmerName}%`).orWhere(
                  "lastName",
                  "LIKE",
                  `%${farmerName}%`
                );
              });
            }
          })
          .andWhere(function () {
            if (uniqId !== "") {
              this.where(function () {
                this.where("uniqId", "LIKE", `%${uniqId}%`);
              });
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
        let totalCountFarmer = knex("smk_farmer").count("* as total");
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
//     let referralId = req.body.referralId || [];
//     referralId = Array.isArray(referralId) ? referralId : [referralId];

//     if (adminId) {
//       console.log("1");
//       const queryBuilder = knex("smk_farmer")
//         .select("*")
//         // .where({ adminId })
//         .andWhere(function () {
//           if (state !== "") {
//             this.where({ state });
//           }
//         })
//         .andWhere(function () {
//           if (district !== "") {
//             this.where({ district });
//           }
//         })
//         .andWhere(function () {
//           if (taluka !== "") {
//             this.where({ taluka });
//           }
//         })
//         .andWhere(function () {
//           if (referralName !== "") {
//             this.where({ referralName });
//           }
//         })
//         .andWhere(function () {
//           if (referralId.length > 0) {
//             this.whereIn("referralId", referralId);
//           }
//         });

//       // Get total count
//       const totalCountQuery = queryBuilder
//         .clone()
//         .clearSelect()
//         .count("* as total");
//       const totalCountResult = await totalCountQuery.first();
//       const totalItems = parseInt(totalCountResult.total);

//       // Fetch filtered farmer data with pagination
//       const getFarmerQuery = queryBuilder
//         .orderBy("createdAt", "desc")
//         .limit(pageSize)
//         .offset((page - 1) * pageSize);
//       const getFarmer = await getFarmerQuery;

//       // let TotalFarmerCount = knex("farmer")
//       //   .count("* as total")
//       //   .where({ adminId });
//       let totalCountFarmer = knex("smk_farmer")
//         .count("* as total")
//         .where({ adminId });
//       const totalResult = await totalCountFarmer.first();
//       const TotalFarmerCount = parseInt(totalResult.total);

//       if (getFarmer.length > 0) {
//         res.json({
//           status: 200,
//           data: getFarmer,
//           currentPage: page,
//           pageSize: pageSize,
//           totalFilterCount: totalItems,
//           totalFarmerCount: TotalFarmerCount,
//           message: "Farmer Get Successfully",
//         });
//       } else {
//         res.json({ status: 404, data: [], message: "Farmer Not Found" });
//       }
//     } else {
//       console.log("sdsd");
//       if (referralId) {
//         console.log("2");
//         console.log("sds");
//         // const find = knex("permission").select("*");
//         // const finddd = await find;
//         // console.log(finddd);

//         const queryBuilder = knex("smk_farmer")
//           .select("*")
//           .andWhere(function () {
//             if (state !== "") {
//               this.where({ state });
//             }
//           })
//           .andWhere(function () {
//             if (district !== "") {
//               this.where({ district });
//             }
//           })
//           .andWhere(function () {
//             if (taluka !== "") {
//               this.where({ taluka });
//             }
//           })
//           .andWhere(function () {
//             if (referralName !== "") {
//               this.where({ referralName });
//             }
//           })
//           .andWhere(function () {
//             if (referralId.length > 0) {
//               this.whereIn("referralId", referralId);
//             }
//           });

//         // Get total count
//         const totalCountQuery = queryBuilder
//           .clone()
//           .clearSelect()
//           .count("* as total");
//         const totalCountResult = await totalCountQuery.first();
//         const totalItems = parseInt(totalCountResult.total);

//         // Fetch filtered farmer data with pagination
//         const getFarmerQuery = queryBuilder
//           .orderBy("createdAt", createdAt)
//           .limit(pageSize)
//           .offset((page - 1) * pageSize);
//         const getFarmer = await getFarmerQuery;
//         // let TotalFarmerCount = knex("farmer")
//         //   .count("* as total")
//         //   .where({ adminId });
//         let totalCountFarmer = knex("smk_farmer").count("* as total");
//         const totalResult = await totalCountFarmer.first();
//         const TotalFarmerCount = parseInt(totalResult.total);
//         if (getFarmer.length > 0) {
//           res.json({
//             status: 200,
//             data: getFarmer,
//             currentPage: page,
//             pageSize: pageSize,
//             totalFilterCount: totalItems,
//             totalFarmerCount: TotalFarmerCount,
//             message: "Farmer Get Successfully",
//           });
//         } else {
//           res.json({ status: 404, data: [], message: "Farmer Not Found" });
//         }
//       } else {
//         res.json({ status: 404, data: [], message: "ReferralId Required" });
//       }
//     }

//     // const query = knex("farmer").select("*").where({ referralId });
//     // if (query) {
//     //   const get = query
//     //     .orderBy("createdAt", createdAt)
//     //     .limit(pageSize)
//     //     .offset((page - 1) * pageSize);
//     //   const getRefral = await get;

//     //   res.json({
//     //     status: 200,
//     //     data: getRefral,
//     //     message: "Farmer Get Successfully",
//     //   });
//     // } else {

//     // }
//   } catch (err) {
//     console.log(err);
//     res.status(404).send({ status: 404, message: "Something Went Wrong !" });
//   }
// };

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

module.exports.getCountry = async (req, res) => {
  try {
    const statesList = worldMapData.getAllCountries("name");
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

module.exports.getUnits = async (req, res) => {
  try {
    const unitsField = await knex("smk_massunits").columnInfo();
    console.log(unitsField, "unitsFieldunitsFieldunitsField");
    const unitFieldNames = Object.keys(unitsField);

    res.status(200).json({
      status: "success",
      units: unitFieldNames,
    });
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
      const dta = JSON.stringify(response.data);
      // console.log(dta);
      const village = [];
      const taluka = [];
      const fil = JSON.parse(dta);
      const check = fil[0].PostOffice;
      const name = check.map((e) => {
        // console.log(e.Name, "rr");
        village.push(e.Name);
        taluka.push(e.Block);
      });
      // function removeDuplicatesTaluka(taluka) {
      //   const unique = taluka?.filter(
      //     (obj, index) =>
      //       taluka?.findIndex((item) => item.Block === obj.Block) === index
      //   );
      //   return unique;
      // }

      // console.log(removeDuplicatesTaluka(taluka), "taluka");
      // console.log(fil[0].PostOffice);
      // dta.PostOffice.map((e) => {
      //   // console.log("1");
      //   e.Name, e.Block;
      // });
      const Final = {
        taluka: [taluka[0]],
        village: village,

        message: "Address get successfully",
      };
      res.send(Final);
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
    const checkId = await knex("smk_farmer").where({ id: req.body.id });
    if (checkId.app) console.log(checkStatus);
    if (checkId) {
      const path = "./uploads/soilReports/";
      const optionalObj = {
        fileName: req.body.filename || "",
        type: base64Str.split(";")[0].split("/")[1],
      };
      const imageInfo = base64ToImage(base64Str, path, optionalObj);
      const filePath = `https://devapi.hivecareer.com/samruddhKishan/farmer/uploads/soilReports/${imageInfo.fileName}`;
      const updateFarmer = await knex("smk_farmer")
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
// module.exports.UploadCSV = async (req, res) => {
//   try {
//     const users = await knex("smk_users").select("*");
//     const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//     const bulkCreateData = [];
//     const skippedRows = [];
//     const batchSize = 1000;
//     let i;
//     for (i = 1; i < data.length; i += batchSize) {
//       // Start from 1 to skip the header row
//       const chunk = data.slice(i, i + batchSize);
//       for (let j = 0; j < chunk.length; j++) {
//         if (!chunk[j][3]) {
//           console.error(`Skipping row ${i + j + 1}: productName is missing`);
//           skippedRows.push({
//             row: i + j + 1,
//             message: `Skipping row ${i + j + 1}: productName is missing`,
//           });
//           continue; // Skip this row and move to the next one
//         }
//         const prefix = "SMK";
//         const randomString = crypto.randomBytes(6).toString("hex");
//         const uniqId = `${prefix}${randomString}`;
//         const newProductData = {
//           adminId: 0,
//           uniqId: uniqId,
//           firstName: chunk[j][1],
//           middleName: chunk[j][2],
//           lastName: chunk[j][3],
//           dateOfBirth: chunk[j][4],
//           aadharNumber: chunk[j][5],
//           mobileNumber: chunk[j][6],
//           wpNumber: chunk[j][7],
//           address: chunk[j][8],
//           pinCode: chunk[j][9],
//           district: chunk[j][10],
//           state: chunk[j][11],
//           taluka: chunk[j][12],
//           villageName: chunk[j][13],
//           caste: chunk[j][14],
//           maritalStatus: chunk[j][15],
//           gender: chunk[j][16],
//           religion: chunk[j][17],
//           subDivision: chunk[j][18],
//           circle: chunk[j][19],
//           mouza: chunk[j][20],
//           landDistrict: chunk[j][21],
//           landVillage: chunk[j][22],
//           landArea: chunk[j][23],
//           landType: chunk[j][24],
//           pattaType: chunk[j][25],
//           latNo: chunk[j][26],
//           pattaNo: chunk[j][27],
//           farmerLandOwnershipType: chunk[j][28],
//           registerDate: chunk[j][29],
//           appliedForSoilTesting: chunk[j][30],
//           asPerAbove: chunk[j][31],
//         };
//         try {
//           const userName = chunk[j][0]; // Assuming categoryId is in the first column
//           console.log(userName, "userName");
//           const Users = users.find((user) => user.firstName === userName) || 0;
//           if (Users || Users == 0) {
//             newProductData.referralId = Users.id || 0;
//           } else {
//             console.error(`vandor not found for row ${i + j + 1}`);
//             skippedRows.push({
//               row: i + j + 1,
//               message: `vandor not found for row ${i + j + 1}`,
//             });
//             continue; // Skip this row and move to the next one
//           }
//           bulkCreateData.push(newProductData);
//         } catch (error) {
//           console.error(`Error creating Farmer for row ${i + j + 1}:`, error);
//           skippedRows.push({
//             row: i + j + 1,
//             message: `Error creating Farmer for row ${i + j + 1}: ${
//               error.message
//             }`,
//           });
//         }
//       }
//     }
//     try {
//       if (bulkCreateData.length > 0) {
//         await knex("smk_farmer").insert(bulkCreateData);
//         bulkCreateData.length = 0;
//       } else {
//         console.error("No valid Farmer found for insertion.");
//       }
//     } catch (error) {
//       console.error(
//         `Error creating Farmer for batch starting at row ${i + 1}:`,
//         error
//       );
//     }
//     const skipCount = skippedRows.length;
//     return res.json({
//       status: true,
//       statusCode: 200,
//       message: "Products Added Successfully!",
//       skippedRows: `${skipCount} Rows Skipped`,
//     });
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

module.exports.UploadCSV = async (req, res) => {
  try {
    const users = await knex("smk_users").select("*");
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    const bulkCreateData = [];
    const skippedRows = [];
    const batchSize = 1000;
    let i;
    for (i = 1; i < data.length; i += batchSize) {
      // Start from 1 to skip the header row
      const chunk = data.slice(i, i + batchSize);
      for (let j = 0; j < chunk.length; j++) {
        const requiredFields = [
          "firstName",
          "middleName",
          "lastName",
          "dateOfBirth",
          "mobileNumber",
          "wpNumber",
        ];

        // Check if any of the required fields is missing in the current row
        const missingField = requiredFields.find(
          (field) => !chunk[j][data[0].indexOf(field)]
        );
        if (missingField) {
          console.error(
            `Skipping row ${i + j + 1}: ${missingField} is missing`
          );
          skippedRows.push({
            row: i + j + 1,
            message: `Skipping row ${i + j + 1}: ${missingField} is missing`,
          });
          continue; // Skip this row and move to the next one
        }

        const prefix = "SMK";
        const randomString = crypto.randomBytes(6).toString("hex");
        const uniqId = `${prefix}${randomString}`;
        const newProductData = {
          adminId: 0,
          uniqId: uniqId,
          firstName: chunk[j][data[0].indexOf("firstName")],
          middleName: chunk[j][data[0].indexOf("middleName")],
          lastName: chunk[j][data[0].indexOf("lastName")],
          dateOfBirth: chunk[j][data[0].indexOf("dateOfBirth")],
          aadharNumber: chunk[j][data[0].indexOf("aadharNumber")],
          mobileNumber: chunk[j][data[0].indexOf("mobileNumber")],
          wpNumber: chunk[j][data[0].indexOf("wpNumber")],
          address: chunk[j][data[0].indexOf("address")],
          pinCode: chunk[j][data[0].indexOf("pinCode")],
          district: chunk[j][data[0].indexOf("district")],
          state: chunk[j][data[0].indexOf("state")],
          taluka: chunk[j][data[0].indexOf("taluka")],
          villageName: chunk[j][data[0].indexOf("villageName")],
          caste: chunk[j][data[0].indexOf("caste")],
          maritalStatus: chunk[j][data[0].indexOf("maritalStatus")],
          gender: chunk[j][data[0].indexOf("gender")],
          religion: chunk[j][data[0].indexOf("religion")],
          subDivision: chunk[j][data[0].indexOf("subDivision")],
          circle: chunk[j][data[0].indexOf("circle")],
          mouza: chunk[j][data[0].indexOf("mouza")],
          landDistrict: chunk[j][data[0].indexOf("landDistrict")],
          landVillage: chunk[j][data[0].indexOf("landVillage")],
          landArea: chunk[j][data[0].indexOf("landArea")],
          landType: chunk[j][data[0].indexOf("landType")],
          pattaType: chunk[j][data[0].indexOf("pattaType")],
          latNo: chunk[j][data[0].indexOf("latNo")],
          pattaNo: chunk[j][data[0].indexOf("pattaNo")],
          farmerLandOwnershipType:
            chunk[j][data[0].indexOf("farmerLandOwnershipType")],
          registerDate: chunk[j][data[0].indexOf("registerDate")],
          appliedForSoilTesting:
            chunk[j][data[0].indexOf("appliedForSoilTesting")],
          asPerAbove: chunk[j][data[0].indexOf("asPerAbove")],
        };
        try {
          const userName = chunk[j][data[0].indexOf("referralId")] || 0; // Assuming userName is in the first column
          console.log(userName, "userName");
          const Users = users.find((user) => user.firstName === userName) || 0;
          if (Users || Users == 0) {
            newProductData.referralId = Users.id || 0;
          } else {
            console.error(`Vendor not found for row ${i + j + 1}`);
            skippedRows.push({
              row: i + j + 1,
              message: `Vendor not found for row ${i + j + 1}`,
            });
            continue; // Skip this row and move to the next one
          }
          bulkCreateData.push(newProductData);
        } catch (error) {
          console.error(`Error creating Farmer for row ${i + j + 1}:`, error);
          skippedRows.push({
            row: i + j + 1,
            message: `Error creating Farmer for row ${i + j + 1}: ${
              error.message
            }`,
          });
        }
      }
    }
    try {
      if (bulkCreateData.length > 0) {
        await knex("smk_farmer").insert(bulkCreateData);
        bulkCreateData.length = 0;
      } else {
        console.error("No valid Farmer found for insertion.");
      }
    } catch (error) {
      console.error(
        `Error creating Farmer for batch starting at row ${i + 1}:`,
        error
      );
    }
    const skipCount = skippedRows.length;
    return res.json({
      status: true,
      statusCode: 200,
      message: "Products Added Successfully!",
      skippedRows: `${skipCount} Rows Skipped`,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports.excelExports = async (req, res) => {
  try {
    // Fetch data from smk_farmer table
    const farmers = await knex("smk_farmer").select("*");
    if (farmers.length === 0) {
      return res.status(404).json({ message: "No data found for export" });
    }
    // Convert data to XLSX format
    const ws = XLSX.utils.json_to_sheet(farmers);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Farmers");
    // Set up the response headers for downloading the file
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=exported-farmers.xlsx"
    );

    // Send the XLSX file as a response
    XLSX.write(wb, { bookType: "xlsx", type: "buffer" });
    res.send(XLSX.write(wb, { bookType: "xlsx", type: "buffer" }));
  } catch (error) {
    console.error("Error exporting data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// module.exports.UploadCSV = async (req, res) => {
//   try {
//     const users = await knex("smk_users").select("*");
//     const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
//     const sheetName = workbook.SheetNames[0];
//     const sheet = workbook.Sheets[sheetName];
//     const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
//     const bulkCreateData = [];
//     const skippedRows = [];
//     const batchSize = 1000;

//     for (let i = 1; i < data.length; i += batchSize) {
//       const chunk = data.slice(i, i + batchSize);
//       for (let j = 0; j < chunk.length; j++) {
//         const requiredFields = [
//           "firstName",
//           "middleName",
//           "lastName",
//           "dateOfBirth",
//           "mobileNumber",
//           "wpNumber",
//         ];

//         const missingField = requiredFields.find((field) => !chunk[j][field]);
//         if (missingField) {
//           console.error(
//             `Skipping row ${i + j + 1}: ${missingField} is missing`
//           );
//           skippedRows.push({
//             row: i + j + 1,
//             message: `Skipping row ${i + j + 1}: ${missingField} is missing`,
//           });
//           continue;
//         }

//         const prefix = "SMK";
//         const randomString = crypto.randomBytes(6).toString("hex");
//         const uniqId = `${prefix}${randomString}`;
//         const newProductData = {
//           adminId: 0,
//           uniqId: uniqId,
//           firstName: chunk[j][1],
//           middleName: chunk[j][2],
//           lastName: chunk[j][3],
//           dateOfBirth: chunk[j][4],
//           aadharNumber: chunk[j][5],
//           mobileNumber: chunk[j][6],
//           wpNumber: chunk[j][7],
//           address: chunk[j][8],
//           pinCode: chunk[j][9],
//           district: chunk[j][10],
//           state: chunk[j][11],
//           taluka: chunk[j][12],
//           villageName: chunk[j][13],
//           caste: chunk[j][14],
//           maritalStatus: chunk[j][15],
//           gender: chunk[j][16],
//           religion: chunk[j][17],
//           subDivision: chunk[j][18],
//           circle: chunk[j][19],
//           mouza: chunk[j][20],
//           landDistrict: chunk[j][21],
//           landVillage: chunk[j][22],
//           landArea: chunk[j][23],
//           landType: chunk[j][24],
//           pattaType: chunk[j][25],
//           latNo: chunk[j][26],
//           pattaNo: chunk[j][27],
//           farmerLandOwnershipType: chunk[j][28],
//           registerDate: chunk[j][29],
//           appliedForSoilTesting: chunk[j][30],
//           asPerAbove: chunk[j][31],
//         };

//         try {
//           const userName = chunk[j][0];
//           const Users = users.find((user) => user.firstName === userName) || 0;

//           if (Users || Users == 0) {
//             newProductData.referralId = Users.id || 0;
//           } else {
//             console.error(`Vendor not found for row ${i + j + 1}`);
//             skippedRows.push({
//               row: i + j + 1,
//               message: `Vendor not found for row ${i + j + 1}`,
//             });
//             continue;
//           }

//           bulkCreateData.push(newProductData);
//         } catch (error) {
//           console.error(`Error creating Farmer for row ${i + j + 1}:`, error);
//           skippedRows.push({
//             row: i + j + 1,
//             message: `Error creating Farmer for row ${i + j + 1}: ${
//               error.message
//             }`,
//           });
//         }
//       }
//     }

//     try {
//       if (bulkCreateData.length > 0) {
//         await knex("smk_farmer").insert(bulkCreateData);
//         bulkCreateData.length = 0;
//       } else {
//         console.error("No valid Farmer found for insertion.");
//       }
//     } catch (error) {
//       console.error(
//         `Error creating Farmer for batch starting at row ${i + 1}:`,
//         error
//       );
//     }

//     const skipCount = skippedRows.length;
//     return res.json({
//       status: true,
//       statusCode: 200,
//       message: "Products Added Successfully!",
//       skippedRows: `${skipCount} Rows Skipped`,
//     });
//   } catch (error) {
//     console.error("Error uploading file:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
