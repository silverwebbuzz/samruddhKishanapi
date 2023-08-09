const knex = require("knex")(require("../../helper/db"));
var worldMapData = require("city-state-country");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.createUser = async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt();
    let user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      state: req.body.state,
      city: req.body.city,
      village: req.body.village,
      role: req.body.role,
      taluka: req.body.taluka,
      pinCode: req.body.pinCode,

      //center on boarding
      centerName: req.body.centerName,
      centerRegisterUnderCompanyDate: req.body.centerRegisterUnderCompanyDate,
      centerKeyPerson: req.body.centerKeyPerson,
      // centerCellNo: req.body.centerCellNo,
      // centerEmail: req.body.centerEmail,
      centerHandlingPersonName: req.body.centerHandlingPersonName,
      centerTaluka: req.body.centerTaluka,
      centerDistrict: req.body.centerDistrict,
      centerTurnover: req.body.centerTurnover,
      centerMemberFarmer: req.body.centerMemberFarmer,
      centerPerDayMilkCollection: req.body.centerPerDayMilkCollection,
      centerMilkStorageCapacity: req.body.centerMilkStorageCapacity,
      centerSellingMilkFor: req.body.centerSellingMilkFor,
      centerOtherCompetitors: req.body.centerOtherCompetitors,
      centerPaymentCycle: req.body.centerPaymentCycle,
      centerOtherFacltyByMilkAgency: req.body.centerOtherFacltyByMilkAgency,
      centerFarmarPaymentProcess: req.body.centerFarmarPaymentProcess,
      centerMembersOnBoard: req.body.centerMembersOnBoard,
      centerCurrentHurdeles: req.body.centerCurrentHurdeles,
      centerNeededFacultys: req.body.centerNeededFacultys,
      centerAllFinancialAudits: req.body.centerAllFinancialAudits,

      // //apmc treaders
      apmcFirmName: req.body.apmcFirmName,
      apmcAddress: req.body.apmcAddress,
      apmcName: req.body.apmcName,
      apmcTaluka: req.body.apmcTaluka,
      apmcDistrict: req.body.apmcDistrict,
      apmcPersonName: req.body.apmcPersonName,
      // apmcCellNo: req.body.apmcCellNo,
      // apmcEmail: req.body.apmcEmail,
      apmcConnectedFarmers: req.body.apmcConnectedFarmers,
      apmcMajorCropsSelling: req.body.apmcMajorCropsSelling,
      districtFarmerComingSellProduct: req.body.districtFarmerComingSellProduct,
    };

    const checkEmail = await knex("users").where({ email: user.email });
    if (checkEmail.length > 0) {
      res.json({ data: [], message: "Email Already Exist" });
    } else {
      if (user) {
        await knex("users").insert(user);
        res.json({
          status: 200,
          data: user,
          message: "user Create Successfully",
        });
      } else {
        res.json({ status: 404, data: [], message: "user Not Create" });
      }
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.updateUser = async (req, res) => {
  try {
    const id = req.body.id;
    // const salt = await bcrypt.genSalt();
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      phone: req.body.phone,
      password: req.body.password,
      state: req.body.state,
      city: req.body.city,
      village: req.body.village,
      role: req.body.role,
      pinCode: req.body.pinCode,
      taluka: req.body.taluka,

      //center on boarding
      centerName: req.body.centerName,
      centerRegisterUnderCompanyDate: req.body.centerRegisterUnderCompanyDate,
      centerKeyPerson: req.body.centerKeyPerson,
      // centerCellNo: req.body.centerCellNo,
      // centerEmail: req.body.centerEmail,
      centerHandlingPersonName: req.body.centerHandlingPersonName,
      centerTaluka: req.body.centerTaluka,
      centerDistrict: req.body.centerDistrict,
      centerTurnover: req.body.centerTurnover,
      centerMemberFarmer: req.body.centerMemberFarmer,
      centerPerDayMilkCollection: req.body.centerPerDayMilkCollection,
      centerMilkStorageCapacity: req.body.centerMilkStorageCapacity,
      centerSellingMilkFor: req.body.centerSellingMilkFor,
      centerOtherCompetitors: req.body.centerOtherCompetitors,
      centerPaymentCycle: req.body.centerPaymentCycle,
      centerOtherFacltyByMilkAgency: req.body.centerOtherFacltyByMilkAgency,
      centerFarmarPaymentProcess: req.body.centerFarmarPaymentProcess,
      centerMembersOnBoard: req.body.centerMembersOnBoard,
      centerCurrentHurdeles: req.body.centerCurrentHurdeles,
      centerNeededFacultys: req.body.centerNeededFacultys,
      centerAllFinancialAudits: req.body.centerAllFinancialAudits,

      // //apmc treaders
      apmcFirmName: req.body.apmcFirmName,
      apmcAddress: req.body.apmcAddress,
      apmcName: req.body.apmcName,
      apmcTaluka: req.body.apmcTaluka,
      apmcDistrict: req.body.apmcDistrict,
      apmcPersonName: req.body.apmcPersonName,
      // apmcCellNo: req.body.apmcCellNo,
      // apmcEmail: req.body.apmcEmail,
      apmcConnectedFarmers: req.body.apmcConnectedFarmers,
      apmcMajorCropsSelling: req.body.apmcMajorCropsSelling,
      districtFarmerComingSellProduct: req.body.districtFarmerComingSellProduct,
    };

    const updateUser = await knex("users").update(user).where({ id });
    console.log(updateUser);
    if (updateUser) {
      res.json({
        status: 200,
        data: user,
        message: "user Updated Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "user Not Updated" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteUser = await knex("users").delete().where({ id });
    console.log(deleteUser);
    if (deleteUser) {
      res.json({
        status: 200,
        data: deleteUser,
        message: "User Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "User Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.singleUser = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleUser = await knex("users").select("*").where({ id });
    console.log(getSingleUser);
    if (getSingleUser.length > 0) {
      res.json({
        status: 200,
        data: getSingleUser,
        message: "User Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "User Not Get" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.UserLogin = async (req, res) => {
  try {
    let email = req.body.email;
    const password = req.body.password;
    const phone = req.body.phone;

    if (email) {
      console.log("2q3");
      await knex("users")
        .where({ email })
        .andWhere({ password })

        .then(async (content) => {
          if (content.length > 0) {
            // let isValidPassword = await knex("users").where({ password });

            // console.log(isValidPassword, "isValidPassword");
            // if (!isValidPassword) {
            //   res.json({ data: [], message: "Invalid credential" });
            // } else {
            console.log("dsds");
            const token = jwt.sign({ content }, "organicFarm", {
              expiresIn: "1h",
            });
            console.log(token);
            // const Token = { token: token };
            // const loginData = [content, Token];
            const aa = await knex("roletype").where({
              roleType: content[0].role,
            });
            res.json({
              data: {
                ...content[0],
                token: token,
                Permission: aa[0].rolePermission,
              },
              status: 200,
              message: "Login Successfully",
            });
            // }
          } else {
            res.json({
              data: [],
              status: 401,
              message: "Credential Not Exist",
            });
          }
        })
        .catch((err) => {
          res.json(err);
        });
    } else if (phone) {
      console.log("ff");
      await knex("users")
        .where({ phone })
        .andWhere({ password })
        .then(async (content) => {
          if (content.length > 0) {
            // const isValidPassword = await bcrypt.compare(
            //   password,
            //   content[0].password
            // );
            // console.log(isValidPassword, "isValidPassword");
            // if (isValidPassword === false) {
            //   res.json({ data: [], message: "Invalid credential" });
            // } else {
            console.log("dsds");
            const token = jwt.sign({ content }, "organicFarm", {
              expiresIn: "1h",
            });
            console.log(token);
            // const Token = { token: token };
            // const loginData = [content, Token];
            const aa = await knex("roletype").where({
              roleType: content[0].role,
            });
            res.json({
              data: {
                ...content[0],
                token: token,
                Permission: aa[0].rolePermission,
              },
              status: 200,
              message: "Login Successfully",
            });
            // }
          } else {
            res.json({
              data: [],
              status: 401,
              message: "Credential Not Exist",
            });
          }
        })
        .catch((err) => {
          res.json(err);
        });
    }
  } catch (err) {
    res.json(err);
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

module.exports.GetAllUser = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("users").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);
    const getFarmerQuery = knex("users")
      .where()
      .orderBy("createdAt", "desc")
      .select("*")
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const getUsers = await getFarmerQuery;
    if (getUsers) {
      res.json({
        status: 200,
        data: getUsers,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "users Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "users Not Get" });
    }
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
