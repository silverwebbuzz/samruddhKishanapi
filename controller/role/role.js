const knex = require("knex")(require("../../helper/db"));
var worldMapData = require("city-state-country");

const bcrypt = require("bcrypt");
const { json } = require("body-parser");
module.exports.createRole = async (req, res) => {
  try {
    var role = {
      roleType: req.body.roleType,
      rolePermission: JSON.stringify(req.body.rolePermission),
    };

    if (role) {
      await knex("roletype").insert(role);
      res.json({
        status: 200,
        data: role,
        message: "Role Create Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Role Not Create" });
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.updateRole = async (req, res) => {
  try {
    const id = req.body.id;
    const role = {
      roleType: req.body.roleType,
      rolePermission: JSON.stringify(req.body.rolePermission),
    };
    const updateRole = await knex("roletype").update(role).where({ id });
    console.log(updateRole);
    if (updateRole) {
      res.json({
        status: 200,
        data: role,
        message: "Role Updated Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Role Not Updated" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.deleteRole = async (req, res) => {
  try {
    const id = req.params.id;

    const getSingleRole = await knex("roletype").select("*").where({ id });
    console.log(getSingleRole[0].roleType);

    const roleType = getSingleRole[0].roleType;

    // Use WHERE clause to filter rows where referralName matches roleType
    const queryBuilder = knex("farmer")
      .select("*")
      .where("referralName", roleType);
    const getAllFarmer = await queryBuilder;
    if (getAllFarmer.length > 0) {
      res.json({
        status: 400,
        data: [],
        message: "! Worning Because This Role In Some Data",
      });
    } else {
      const deleteRole = await knex("roletype").delete().where({ id });
      res.json({
        status: 200,
        data: deleteRole,
        message: "Role Deleted Successfully",
      });
    }
  } catch (err) {
    res.send(err);
  }
};


module.exports.singleRole = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleRole = await knex("roletype").select("*").where({ id });
    console.log(getSingleRole);
    if (getSingleRole.length > 0) {
      res.json({
        status: 200,
        data: getSingleRole,
        message: "Role Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Role Not Get" });
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

module.exports.GetAllRole = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided

    const totalCountQuery = knex("roletype").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getFarmerQuery = knex("roletype")
      .select("*")
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const getRoles = await getFarmerQuery;
    if (getRoles) {
      res.json({
        status: 200,
        data: getRoles,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "Role Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Role Not Get" });
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
