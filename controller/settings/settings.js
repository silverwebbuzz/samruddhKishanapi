const knex = require("knex")(require("../../helper/db"));
const { json } = require("body-parser");

// General Settings
module.exports.createGeneralSetting = async (req, res) => {
  try {
    console.log("1");
    const {
      applicationName,
      applicationTitle,
      adminEmail,
      adminAddress,
      adminPhone,
    } = req.body;
    const { logo, favIcon } = req.files;
    const General = {
      applicationName: applicationName,
      applicationTitle: applicationTitle,
      //   Logo: Logo,
      //   favIcon: favIcon,
      adminEmail: adminEmail,
      adminAddress: adminAddress,
      adminPhone: adminPhone,
    };

    if (logo) {
      console.log("3");
      General.logo = `https://devapi.hivecareer.com/samruddhKishan/settings/uploads/settingImages/${logo[0].filename}`;
      // console.log(General);
    }
    if (favIcon) {
      General.favIcon = `https://devapi.hivecareer.com/samruddhKishan/settings/uploads/settingImages/${favIcon[0].filename}`;
    }

    // if (General) {
    await knex("smk_settings").insert(General);
    res.json({
      status: 200,
      data: General,
      message: "General-Settings Create Successfully",
    });
    // } else {
    //   res.json({ status: 404, data: [], message: " Not Created" });
    // }
  } catch (err) {
    res.json(err);
  }
};


module.exports.updateGeneralSetting = async (req, res) => {
  try {
    const id = req.body.id;
    // console.log(id);
    const { logo, favIcon } = req.files;
    const updateSetting = {
      applicationName: req.body.applicationName,
      applicationTitle: req.body.applicationTitle,
      adminEmail: req.body.adminEmail,
      adminAddress: req.body.adminAddress,
      adminPhone: req.body.adminPhone,
    };
    if (logo) {
      updateSetting.logo = `http://devapi.hivecareer.com/samruddhKishan/settings/uploads/settingImages/${logo[0].filename}`;
      // console.log(General);
    }
    if (favIcon) {
      updateSetting.favIcon = `http://devapi.hivecareer.com/samruddhKishan/settings/uploads/settingImages/${favIcon[0].filename}`;
    }
    if (id) {
      const UpdateSetting = await knex("smk_settings")
        .update(updateSetting)
        .where({ id });
      if (UpdateSetting) {
        res.json({
          status: 200,
          data: updateSetting,
          message: "Setting Updated Successfully",
        });
      } else {
        res.json({ status: 404, data: [], message: "Not Updated" });
      }
    } else {
      const getId = await knex("smk_settings").insert(updateSetting);
      const insertedId = getId[0];

      const mergeData = { ...updateSetting, id: insertedId };
      res.json({
        status: 200,
        data: mergeData,
        message: "General-Settings Create Successfully",
      });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.updateEmailSetting = async (req, res) => {
  try {
    const id = req.body.id;
    const updateSetting = {
      mailProtocol: req.body.mailProtocol,
      mailTitle: req.body.mailTitle,
      mailHost: req.body.mailHost,
      mailPort: req.body.mailPort,
      mailUsername: req.body.mailUsername,
      mailPassword: req.body.mailPassword,
    };
    if (id) {
      const UpdateSetting = await knex("smk_settings")
        .update(updateSetting)
        .where({ id });
      if (UpdateSetting) {
        res.json({
          status: 200,
          data: updateSetting,
          message: "Setting Updated Successfully",
        });
      } else {
        res.json({ status: 404, data: [], message: "Not Updated" });
      }
    } else {
      const getId = await knex("smk_settings").insert(updateSetting);
      const insertedId = getId[0];

      const mergeData = { ...updateSetting, id: insertedId };
      res.json({
        status: 200,
        data: mergeData,
        message: "General-Settings Create Successfully",
      });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.updateSocialSetting = async (req, res) => {
  try {
    const id = req.body.id;
    const updateSetting = {
      facebook: req.body.facebook,
      twitter: req.body.twitter,
      instagram: req.body.instagram,
      linkedin: req.body.linkedin,
    };
    if (id) {
      const UpdateSetting = await knex("smk_settings")
        .update(updateSetting)
        .where({ id });
      if (UpdateSetting) {
        res.json({
          status: 200,
          data: updateSetting,
          message: "Setting Updated Successfully",
        });
      } else {
        res.json({ status: 404, data: [], message: "Not Updated" });
      }
    } else {
      const getId = await knex("smk_settings").insert(updateSetting);
      const insertedId = getId[0];

      const mergeData = { ...updateSetting, id: insertedId };
      res.json({
        status: 200,
        data: mergeData,
        message: "General-Settings Create Successfully",
      });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.updateGoogleSetting = async (req, res) => {
  try {
    const id = req.body.id;
    const updateSetting = {
      googleAnalyticsCode: req.body.googleAnalyticsCode,
    };
    if (id) {
      const UpdateSetting = await knex("smk_settings")
        .update(updateSetting)
        .where({ id });
      if (UpdateSetting) {
        res.json({
          status: 200,
          data: updateSetting,
          message: "Setting Updated Successfully",
        });
      } else {
        res.json({ status: 404, data: [], message: "Not Updated" });
      }
    } else {
      const getId = await knex("smk_settings").insert(updateSetting);
      const insertedId = getId[0];

      const mergeData = { ...updateSetting, id: insertedId };
      res.json({
        status: 200,
        data: mergeData,
        message: "General-Settings Create Successfully",
      });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.updateScoSetting = async (req, res) => {
  try {
    const id = req.body.id;
    const updateSetting = {
      metaTitle: req.body.metaTitle,
      metaKeywords: req.body.metaKeywords,
      metaDescription: req.body.metaDescription,
    };
    if (id) {
      const UpdateSetting = await knex("smk_settings")
        .update(updateSetting)
        .where({ id });
      if (UpdateSetting) {
        res.json({
          status: 200,
          data: updateSetting,
          message: "Setting Updated Successfully",
        });
      } else {
        res.json({ status: 404, data: [], message: "Not Updated" });
      }
    } else {
      const getId = await knex("smk_settings").insert(updateSetting);
      const insertedId = getId[0];

      const mergeData = { ...updateSetting, id: insertedId };
      res.json({
        status: 200,
        data: mergeData,
        message: "General-Settings Create Successfully",
      });
    }
  } catch (err) {
    res.send(err);
  }
};
// module.exports.deleteGeneralSetting = async (req, res) => {
//   try {
//     const id = req.body.id;
//     const deleteSetting = await knex("smk_settings").delete().where({ id });
//     console.log(deleteSetting);
//     if (deleteSetting) {
//       res.json({
//         status: 200,
//         data: deleteSetting,
//         message: "Settings Deleted Successfully",
//       });
//     } else {
//       res.json({ status: 404, data: [], message: "Not Deleted" });
//     }
//   } catch (err) {
//     res.send(err);
//   }
// };

//Get Single Menu api
module.exports.getSingleSetting = async (req, res) => {
  try {
    const id = req.body.id;
    const getSingle = await knex("smk_settings").select("*").where({ id });
    console.log(getSingle);

    if (getSingle.length > 0) {
      res.json({
        status: 200,
        data: getSingle,
        message: "Get Settings Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: " Not Get" });
    }
  } catch (err) {
    res.send(err);
  }
};

// Email Settings



// module.exports.getSingleSetting = async (req, res) => {
//   try {
//     const id = req.body.id;
//     const getSingle = await knex("smk_settings").select("*").where({ id });
//     console.log(getSingle);

//     if (getSingle.length > 0) {
//       res.json({
//         status: 200,
//         data: getSingle,
//         message: "Get Settings Successfully",
//       });
//     } else {
//       res.json({ status: 404, data: [], message: " Not Get" });
//     }
//   } catch (err) {
//     res.send(err);
//   }
// };

// Social Media Settings




// module.exports.getGraphCount = async (req, res) => {
//   // const name = req.body.name;
//   const allMonths = [
//     "Jan",
//     "Feb",
//     "Mar",
//     "Apr",
//     "May",
//     "Jun",
//     "Jul",
//     "Aug",
//     "Sep",
//     "Oct",
//     "Nov",
//     "Dec",
//   ];
//   const userCounts = await knex("smk_users")
//     .select(
//       "smk_roletype.id AS roleId",
//       "smk_roletype.roleType AS roleType",
//       knex.raw("COUNT(smk_users.id) AS count")
//     )
//     .leftJoin("smk_roletype", "smk_users.roleId", "smk_roletype.id")
//     .groupBy("roleId", "roleType");

//   console.log(userCounts, "userCounts");
//   // Execute the query to get monthly counts for farmers
//   const monthlyCountsFarmer = await knex("smk_farmer")
//     .select(
//       knex.raw('DATE_FORMAT(createdAt, "%b") AS month, COUNT(*) as count')
//     )
//     .groupByRaw("month")
//     .orderByRaw("MONTH(createdAt)");
//   const formattedCountsFarmer = {};
//   allMonths.forEach((month) => {
//     formattedCountsFarmer[month] = 0;
//   });
//   monthlyCountsFarmer.forEach((row) => {
//     const month = row.month;
//     const count = row.count;
//     formattedCountsFarmer[month] = count;
//   });
//   const result = await knex("smk_roletype")
//     .select("smk_users.createdAt")
//     .join("smk_users", "smk_roletype.id", "smk_users.roleId")
//     .where("smk_roletype.roleType", "VENDORS");
//   const monthlyCounts = {};
//   allMonths.forEach((month) => {
//     monthlyCounts[month] = 0;
//   });
//   result.forEach((row) => {
//     const monthAbbreviation = row.createdAt.toLocaleString("default", {
//       month: "short",
//     });
//     const capitalizedMonth =
//       monthAbbreviation.charAt(0).toUpperCase() +
//       monthAbbreviation.slice(1).toLowerCase();
//     monthlyCounts[capitalizedMonth] =
//       (monthlyCounts[capitalizedMonth] || 0) + 1;
//   });
//   const a = await knex("smk_farmer").count("* as total");
//   const TotalFarmerCount = {
//     count: a[0].total,
//     roleType: "Farmers",
//   };
//   const currentMonth = new Date().getMonth() + 1; // Get the current month (1-based)
//   console.log(currentMonth);
//   const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1; // Get the previous month
//   const currentMonthCount = await knex("smk_enquiry")
//     .whereRaw(`MONTH(createdAt) = ${currentMonth}`)
//     .count("id as count")
//     .first();
//   const previousMonthCount = await knex("smk_enquiry")
//     .whereRaw(`MONTH(createdAt) = ${previousMonth}`)
//     .count("id as count")
//     .first();
//   const currentMonthTotal = currentMonthCount.count;
//   const previousMonthTotal = previousMonthCount.count;
//   const percentage =
//     ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;
//   const totalEnquiry = await knex("smk_enquiry")
//     .whereRaw(`MONTH(createdAt) = ${currentMonth}`)
//     .count("id as count")
//     .first();
//   const productCount = await knex("smk_enquiry")
//     .where("enquiryType", "product")
//     .whereRaw(`MONTH(createdAt) = ${currentMonth}`)
//     .count("id as count")
//     .first();
//   const serviceCount = await knex("smk_enquiry")
//     .where("enquiryType", "service")
//     .whereRaw(`MONTH(createdAt) = ${currentMonth}`)
//     .count("id as count")
//     .first();
//   const counts = {
//     totalEnquiry: totalEnquiry.count,
//     Product: productCount.count,
//     Service: serviceCount.count,
//     percentage,
//   };
//   res.status(200).json({
//     status: "success",
//     vendorCount: [monthlyCounts],
//     farmerCount: [formattedCountsFarmer],
//     allRoleCount: userCounts,
//     counts,
//   });
// };

module.exports.getGraphCount = async (req, res) => {
  // const name = req.body.name;
  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const userCounts = await knex("smk_users")
    .select(
      "smk_roletype.id AS roleId",
      "smk_roletype.roleType AS roleType",
      knex.raw("COUNT(smk_users.id) AS count")
    )
    .leftJoin("smk_roletype", "smk_users.roleId", "smk_roletype.id")
    .groupBy("roleId", "roleType");

  console.log(userCounts, "userCounts");
  // Execute the query to get monthly counts for farmers
  const monthlyCountsFarmer = await knex("smk_farmer")
    .select(
      knex.raw('DATE_FORMAT(createdAt, "%b") AS month, COUNT(*) as count')
    )
    .groupByRaw("month")
    .orderByRaw("MONTH(createdAt)");
  const formattedCountsFarmer = {};
  allMonths.forEach((month) => {
    formattedCountsFarmer[month] = 0;
  });
  monthlyCountsFarmer.forEach((row) => {
    const month = row.month;
    const count = row.count;
    formattedCountsFarmer[month] = count;
  });
  const result = await knex("smk_roletype")
    .select("smk_users.createdAt")
    .join("smk_users", "smk_roletype.id", "smk_users.roleId")
    .where("smk_roletype.id", "3");
  const monthlyCounts = {};
  allMonths.forEach((month) => {
    monthlyCounts[month] = 0;
  });
  result.forEach((row) => {
    const monthAbbreviation = row.createdAt.toLocaleString("default", {
      month: "short",
    });
    const capitalizedMonth =
      monthAbbreviation.charAt(0).toUpperCase() +
      monthAbbreviation.slice(1).toLowerCase();
    monthlyCounts[capitalizedMonth] =
      (monthlyCounts[capitalizedMonth] || 0) + 1;
  });
  const a = await knex("smk_farmer").count("* as total");
  const TotalFarmerCount = {
    count: a[0].total,
    roleType: "Farmers",
  };
  const currentMonth = new Date().getMonth() + 1; // Get the current month (1-based)
  console.log(currentMonth);
  const previousMonth = currentMonth === 1 ? 12 : currentMonth - 1; // Get the previous month
  const currentMonthCount = await knex("smk_enquiry")
    .whereRaw(`MONTH(createdAt) = ${currentMonth}`)
    .count("id as count")
    .first();
  const previousMonthCount = await knex("smk_enquiry")
    .whereRaw(`MONTH(createdAt) = ${previousMonth}`)
    .count("id as count")
    .first();
  const currentMonthTotal = currentMonthCount.count;
  const previousMonthTotal = previousMonthCount.count;
  const percentage =
    ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;
  const totalEnquiry = await knex("smk_enquiry")
    .whereRaw(`MONTH(createdAt) = ${currentMonth}`)
    .count("id as count")
    .first();
  const productCount = await knex("smk_enquiry")
    .where("flag", "product")
    .whereRaw(`MONTH(createdAt) = ${currentMonth}`)
    .count("id as count")
    .first();
  const serviceCount = await knex("smk_enquiry")
    .where("flag", "service")
    .whereRaw(`MONTH(createdAt) = ${currentMonth}`)
    .count("id as count")
    .first();
  const counts = {
    totalEnquiry: totalEnquiry.count,
    Product: productCount.count,
    Service: serviceCount.count,
    percentage,
  };
  res.status(200).json({
    status: "success",
    vendorCount: [monthlyCounts],
    farmerCount: [formattedCountsFarmer],
    allRoleCount: userCounts,
    TotalFarmerCount,
    counts,
  });
};

module.exports.getLogo = async (req, res) => {
  try {
    const getSingle = await knex("smk_settings").select("*");
    const data = {
      logo: getSingle[0].logo,
      favIcon: getSingle[0].favIcon,
    };
    if (getSingle.length > 0) {
      res.json({
        status: 200,
        data: data,
        message: "Get Logo Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: " Not Get" });
    }
  } catch (err) {
    res.send(err);
  }
};

// module.exports.deleteSocialMedia = async (req, res) => {
//   try {
//     const id = req.body.id;
//     const deleteSetting = await knex("smk_settings").delete().where({ id });
//     console.log(deleteSetting);
//     if (deleteSetting) {
//       res.json({
//         status: 200,
//         data: deleteSetting,
//         message: "Settings Deleted Successfully",
//       });
//     } else {
//       res.json({ status: 404, data: [], message: "Not Deleted" });
//     }
//   } catch (err) {
//     res.send(err);
//   }
// };

module.exports.getSingleSetting = async (req, res) => {
  try {
    // const id = req.body.id;
    const getSingle = await knex("smk_settings").select("*");
    console.log(getSingle);

    if (getSingle.length > 0) {
      res.json({
        status: 200,
        data: getSingle,
        message: "Get All Settings Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: " Not Get" });
    }
  } catch (err) {
    res.send(err);
  }
};
