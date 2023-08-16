const knex = require("knex")(require("../../helper/db"));
var worldMapData = require("city-state-country");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

module.exports.createUser = async (req, res) => {
  try {
    let roleID = req.body.roleId;
    const getSingleRole = await knex("smk_roletype")
      .select("*")
      .where({ id: roleID });
    const role = getSingleRole[0].roleType;
    if (role == "CENTERS" || role == "APMC TRADERS" || role == "VENDORS") {
      let userWithRole = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        state: req.body.state,
        city: req.body.city,
        village: req.body.village,
        roleId: req.body.roleId,
        taluka: req.body.taluka,
        pinCode: req.body.pinCode,
        role: req.body.role,
      };
      const checkEmail = await knex("smk_users").where({
        email: userWithRole.email,
      });
      if (checkEmail.length > 0) {
        res.json({ data: [], message: "Email Already Exist" });
      } else {
        const uID = await knex("smk_users").insert(userWithRole);
        const user = {
          //center on boarding
          centerName: req.body.centerName,
          centerRegisterUnderCompanyDate:
            req.body.centerRegisterUnderCompanyDate,
          centerKeyPerson: req.body.centerKeyPerson,
          centerHandlingPersonName: req.body.centerHandlingPersonName,
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
          // apmc treaders
          apmcFirmName: req.body.apmcFirmName,
          apmcAddress: req.body.apmcAddress,
          apmcName: req.body.apmcName,
          apmcPersonName: req.body.apmcPersonName,
          apmcConnectedFarmers: req.body.apmcConnectedFarmers,
          apmcMajorCropsSelling: req.body.apmcMajorCropsSelling,
          districtFarmerComingSellProduct:
            req.body.districtFarmerComingSellProduct,
          userId: uID[0],
        };
        if (user) {
          await knex("smk_usersdetails").insert(user);
          res.json({
            status: 200,
            data: user,
            message: "user Create Successfully",
          });
        } else {
          res.json({ status: 404, data: [], message: "user Not Create" });
        }
      }
    } else {
      let user2 = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        state: req.body.state,
        city: req.body.city,
        village: req.body.village,
        roleId: req.body.roleId,
        taluka: req.body.taluka,
        pinCode: req.body.pinCode,
        role: req.body.role,
      };
      const checkEmail = await knex("smk_users").where({ email: user2.email });
      if (checkEmail.length > 0) {
        res.json({ data: [], message: "Email Already Exist" });
      } else {
        if (user2) {
          await knex("smk_users").insert(user2);
          res.json({
            status: 200,
            data: user2,
            message: "user Create Successfully",
          });
        } else {
          res.json({ status: 404, data: [], message: "user Not Create" });
        }
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
      roleId: req.body.roleId,
      taluka: req.body.taluka,
      pinCode: req.body.pinCode,
      role: req.body.role,

      //center on boarding
    };

    const updateUserDetails = {
      centerName: req.body.centerName,
      centerRegisterUnderCompanyDate: req.body.centerRegisterUnderCompanyDate,
      centerKeyPerson: req.body.centerKeyPerson,
      centerHandlingPersonName: req.body.centerHandlingPersonName,
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
      // apmc treaders
      apmcFirmName: req.body.apmcFirmName,
      apmcAddress: req.body.apmcAddress,
      apmcName: req.body.apmcName,
      apmcPersonName: req.body.apmcPersonName,
      apmcConnectedFarmers: req.body.apmcConnectedFarmers,
      apmcMajorCropsSelling: req.body.apmcMajorCropsSelling,
      districtFarmerComingSellProduct: req.body.districtFarmerComingSellProduct,
    };
    const updateUser = await knex("smk_users").update(user).where({ id });
    const updateUser1 = await knex("smk_usersdetails")
      .update(updateUserDetails)
      .where({ userId: id });

    const UpdateUsers = { ...user, updateUserDetails };

    if (updateUser) {
      res.json({
        status: 200,
        data: UpdateUsers,
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
    const deleteUser = await knex("smk_users").delete().where({ id });
    await knex("smk_usersdetails").delete().where({ userId: id });
    console.log(deleteUser);
    if (deleteUser) {
      res.json({
        status: 200,
        data: [],
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
    const userId = req.params.id;
    const getUserQuery = await knex("smk_users")
      .leftJoin("smk_usersdetails", "smk_users.id", "smk_usersdetails.userId")
      .where("smk_users.id", userId)
      .first();
    console.log(getUserQuery);
    if (!getUserQuery) {
      return res.status(404).json({
        status: 404,
        message: "User not found",
      });
    }

    const formattedUser = {
      ...getUserQuery,
      id: userId,
    };

    res.json({
      status: 200,
      data: formattedUser,
      message: "User Get Successfully",
    });
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
      await knex("smk_users")
        .where({ email })
        .andWhere({ password })

        .then(async (content) => {
          if (content.length > 0) {
            console.log("dsds");
            const token = jwt.sign({ content }, "organicFarm", {
              expiresIn: "1h",
            });
            console.log("aa", token);
            const aa = await knex("smk_roletype").where({
              id: content[0].roleId,
            });
            await knex("smk_log").insert({
              userId: content[0].id,
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
      await knex("smk_users")
        .where({ phone })
        .andWhere({ password })
        .then(async (content) => {
          if (content.length > 0) {
            const token = jwt.sign({ content }, "organicFarm", {
              expiresIn: "1h",
            });
            console.log(token);
            const aa = await knex("smk_roletype").where({
              id: content[0].roleId,
            });
            await knex("smk_log").insert({
              userId: content[0].id,
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

module.exports.GetAllUser = async (req, res) => {
  try {
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_users").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);
    // const getFarmerQuery = knex("smk_users")
    //   .select("smk_users.*") // Select columns from both tables
    //   .leftJoin("smk_usersdetails", "smk_users.id", "smk_usersdetails.userId") // Perform a left join
    //   .orderBy("smk_users.createdAt", "desc")
    //   .limit(pageSize)
    //   .offset((page - 1) * pageSize);
    const getFarmerQuery = await knex("smk_users as u")
      .select(
        "u.*",
        "ud.centerName as centerName", // replace 'detailsColumn1' with actual column name
        "ud.centerRegisterUnderCompanyDate as centerRegisterUnderCompanyDate",
        "ud.centerKeyPerson as 	centerKeyPerson",
        "ud.centerDistrict as centerDistrict",
        "ud.centerTaluka as centerTaluka",
        "ud.centerTurnover as centerTurnover",
        "ud.centerMemberFarmer as centerMemberFarmer",
        "ud.centerPerDayMilkCollection as centerPerDayMilkCollection",
        "ud.centerMilkStorageCapacity as centerMilkStorageCapacity",
        "ud.centerSellingMilkFor as centerSellingMilkFor",
        "ud.centerOtherCompetitors as centerOtherCompetitors",
        "ud.centerPaymentCycle as centerPaymentCycle",
        "ud.centerOtherFacltyByMilkAgency as centerOtherFacltyByMilkAgency",
        "ud.centerFarmarPaymentProcess as centerFarmarPaymentProcess",
        "ud.centerMembersOnBoard as centerMembersOnBoard",
        "ud.centerCurrentHurdeles as centerCurrentHurdeles",
        "ud.centerNeededFacultys as centerNeededFacultys",
        "ud.centerAllFinancialAudits as centerAllFinancialAudits",
        "ud.apmcFirmName as apmcFirmName",
        "ud.apmcAddress as apmcAddress",
        "ud.apmcName as apmcName",
        "ud.apmcDistrict as apmcDistrict",
        "ud.apmcTaluka as apmcTaluka",
        "ud.apmcPersonName as apmcPersonName",
        "ud.apmcConnectedFarmers as apmcConnectedFarmers",
        "ud.apmcMajorCropsSelling as apmcMajorCropsSelling",
        "ud.districtFarmerComingSellProduct as districtFarmerComingSellProduct"

        // similarly, replace and add as many columns as needed
      )
      .leftJoin("smk_usersdetails as ud", "u.id", "=", "ud.userId")
      .orderBy("u.createdAt", "desc")
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const [getUsers, totalCount] = await Promise.all([
      getFarmerQuery,
      knex("smk_users").count("id as count").first(),
    ]);

    if (getUsers) {
      res.json({
        status: 200,
        data: getUsers,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalCount.count,
        message: "Users Get Successfully",
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
  }
};
