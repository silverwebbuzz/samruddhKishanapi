const knex = require("knex")(require("../../helper/db"));
var worldMapData = require("city-state-country");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const axios = require("axios");

module.exports.createUser = async (req, res) => {
  try {
    let roleID = req.body.roleId;
   const adminId = req.body.adminId;
    const getSingleRole = await knex("smk_roletype")
      .select("*")
      .where({ id: roleID });
  console.log("getSingleRole", getSingleRole);
    const role = getSingleRole[0].roleType;
  console.log("AAAAAAA", role);
    if (role == "1" || role == "2" || role == "3") {
    console.log("BBBBBB");
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
        // role: req.body.role,
      };
      const checkEmail = await knex("smk_users").where({
        email: userWithRole.email,
      });
    console.log("checkEmail", checkEmail);
      if (checkEmail.length > 0) {
        res.json({ data: [], message: "Email Already Exist" });
      } else {
       console.log("ABC");
        const uID = await knex("smk_users").insert(userWithRole);
       const flag = {
          flag: 1,
        };
        if (adminId) {
          await knex("smk_users").update(flag).where({ id: uID[0] });
        }
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
          //Vendors
          categoryId: req.body.categoryId,
          // vendorImage: req.body.vendorImage,
        };
      console.log(user, "user");
      const { vendorImage } = req.files;
          if (vendorImage) {
          user.vendorImage = `https://devapi.hivecareer.com/samruddhKishan/user/uploads/vendorImages/${vendorImage[0].filename}`;
               const transporter = nodemailer.createTransport({
          service: "gmail", // e.g., 'Gmail'
          auth: {
            user: "ashish.swb1234@gmail.com",
            pass: "oveprfbiugcfpoin",
            secure: true,
          },
        });
        console.log(transporter);
        const mailOptions = {
          from: "ashish.swb1234@gmail.com",
          to: userWithRole.email,
          subject: "Enquiry Created",
          html: `Thank You For Registration On SamruddhKishan`,
        };
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.log("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
          if (user) {
          console.log("DEF");
                  const Did = await knex("smk_usersdetails").insert(user);
              if (role == "1") {
              const apiKey = "AIzaSyBvp7N2PUcwwJyClscyZqOnoYnsmOQdryA";
              const address = userWithRole.city;
              console.log(address);
              if (address !== undefined || address !== "") {
                // URL for the Geocoding API request.
                const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                  address
                )}&key=${apiKey}`;
                axios
                  .get(geocodeUrl)
                  .then(async (response) => {
                    const location = response.data.results[0].geometry.location;
                    const aaa = await knex("smk_usersdetails")
                      // const recordd = { lat: location.lat, lng: location.lng }
                      .update({ lat: location.lat, lng: location.lng })
                      .where({ id: Did[0] });
                    console.log(aaa);
                  })
                  .catch((error) => {
                    console.error("Error:", error.message);
                  });
              }
            }
          
            res.json({
              status: 200,
              data: user,
              message: "user Create Successfully",
            });
          } else {
            res.json({ status: 404, data: [], message: "user Not Create" });
          }
        } else {
          if (user) {
            const Did = await knex("smk_usersdetails").insert(user);
              if (role == "1") {
              const apiKey = "AIzaSyBvp7N2PUcwwJyClscyZqOnoYnsmOQdryA";
              const address = userWithRole.city;
              console.log(address);
              if (address !== undefined || address !== "") {
                // URL for the Geocoding API request.
                const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
                  address
                )}&key=${apiKey}`;
                axios
                  .get(geocodeUrl)
                  .then(async (response) => {
                    const location = response.data.results[0].geometry.location;
                    const aaa = await knex("smk_usersdetails")
                      // const recordd = { lat: location.lat, lng: location.lng }
                      .update({ lat: location.lat, lng: location.lng })
                      .where({ id: Did[0] });
                    console.log(aaa);
                  })
                  .catch((error) => {
                    console.error("Error:", error.message);
                  });
              }
            }
            res.json({
              status: 200,
              data: user,
              message: "user Create Successfully",
            });
          } else {
            res.json({ status: 404, data: [], message: "user Not Create" });
          }
        }
      }
    } else {
    console.log("1");
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
        // role: req.body.role,
      };
    console.log("user2", user2);
      const checkEmail = await knex("smk_users").where({ email: user2.email });
    console.log("checkEmail", checkEmail);
      if (checkEmail.length > 0) {
        res.json({ data: [], message: "Email Already Exist" });
      } else {
        if (user2) {
          const UserID = await knex("smk_users").insert(user2);
         const flag = {
            flag: 1,
          };
          if (adminId) {
            await knex("smk_users").update(flag).where({ id: UserID[0] });
          }
          const transporter = nodemailer.createTransport({
            service: "gmail", // e.g., 'Gmail'
            auth: {
              user: "ashish.swb1234@gmail.com",
              pass: "oveprfbiugcfpoin",
              secure: true,
            },
          });
          console.log(transporter);
          const mailOptions = {
            from: "ashish.swb1234@gmail.com",
            to: user2.email,
            subject: "Enquiry Created",
            html: `Thank You For Registration On SamruddhKishan`,
          };
          transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
              console.log("Error sending email:", error);
            } else {
              console.log("Email sent:", info.response);
            }
          });
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
    const { vendorImage } = req.files;
    console.log(id);
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
      // role: req.body.role,

      //center on boarding
    };
    console.log(user.roleId);
    const getSingleRole = await knex("smk_roletype")
      .select("*")
      .where({ id: user.roleId });
    const role = getSingleRole[0].roleType;
    console.log(getSingleRole);
      if (role == "1" || role == "2" || role == "3") {
      const role = getSingleRole[0].roleType;
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
        districtFarmerComingSellProduct:
          req.body.districtFarmerComingSellProduct,
      };
      if (vendorImage) {
        updateUserDetails.vendorImage = `http://192.168.1.218:4001/samruddhKishan/product/user/vendorImages/${vendorImage[0].filename}`;
      }
      const updateUser = await knex("smk_users").update(user).where({ id });
      console.log(updateUser, "ddd");
      const updateUser1 = await knex("smk_usersdetails")
        .update(updateUserDetails)
        .where({ userId: id });
		if (role == "1") {
        console.log("dfdfdf");
        const apiKey = "AIzaSyBvp7N2PUcwwJyClscyZqOnoYnsmOQdryA";
        const address = user.city;
        console.log(address);
        if (address !== undefined || address !== "") {
          // URL for the Geocoding API request.
          const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
            address
          )}&key=${apiKey}`;
          axios
            .get(geocodeUrl)
            .then(async (response) => {
              const location = response.data.results[0].geometry.location;
              const aaa = await knex("smk_usersdetails")
                // const recordd = { lat: location.lat, lng: location.lng }
                .update({ lat: location.lat, lng: location.lng })
                .where({ userId: id });
              console.log(aaa);
            })
            .catch((error) => {
              console.error("Error:", error.message);
            });
        }
      }
      const UpdateUsers = { ...user, updateUserDetails };
      if (UpdateUsers) {
        res.json({
          status: 200,
          data: UpdateUsers,
          message: "user Updated Successfully",
        });
      } else {
        res.json({ status: 404, data: [], message: "user Not Updated" });
      }
    } else {
      const onlyUser = {
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
        // role: req.body.role,

        //center on boarding
      };
      const updateUser = await knex("smk_users").update(user).where({ id });
      if (updateUser) {
        res.json({
          status: 200,
          data: updateUser,
          message: "user Updated Successfully",
        });
      } else {
        res.json({ status: 404, data: [], message: "user Not Updated" });
      }
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

module.exports.multiDeleteUsers = async (req, res) => {
  try {
    const ids = req.body.ids; // Assuming the request body contains an array of IDs
    const deleteUsers = await knex("smk_users").whereIn("id", ids).delete();
    if (deleteUsers) {
      res.json({
        status: 200,
        data: deleteUsers,
        message: "Users Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.singleUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const get1 = await knex("smk_product").where(
      "smk_product.vendorId",
      userId
    );

    console.log(get1);

    const get2 = await knex("smk_farmer").where(
      "smk_farmer.referralId",
      userId
    );
    console.log(get2);
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
    let formattedUser = {};

    if (get1.length > 0 || get2.length > 0) {
      formattedUser = {
        ...getUserQuery,
        id: userId,
        flag: 1,
      };
    } else {
      formattedUser = {
        ...getUserQuery,
        id: userId,
        flag: 0,
      };
    }

    res.json({
      status: 200,
      data: formattedUser,
      message: "User Get Successfully",
    });
  } catch (err) {
    res.send(err);
  }
};



module.exports.sentMail = async (req, res) => {
  const userId = req.body.id;
  const GetId = await knex("smk_users").where({ id: userId });
  console.log(GetId[0].id, "sdsd");
  if (GetId) {
    const transporter = nodemailer.createTransport({
      service: "gmail", // e.g., 'Gmail'
      auth: {
        user: "mailto:ashish.swb1234@gmail.com",
        pass: "oveprfbiugcfpoin",
        secure: true,
      },
    });
    const mailOptions = {
      from: "mailto:ashish.swb1234@gmail.com",
      to: GetId[0].email,
      subject: "Verify Email For User Registration",
      html: `https://samruddhkishan.hivecareer.com/verify/${GetId[0].id}`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
        res.status(200).send({ message: "Email Sent" });
      }
    });
  } else {
  }
};

module.exports.verifyUser = async (req, res) => {
  const id = req.params.id;
  const data = {
    flag: req.body.flag,
  };
  const GetId = await knex("smk_users").where({ id: id });
  if (GetId) {
    const UpdateData = await knex("smk_users").update(data).where({ id });
    if (UpdateData) {
      res.json({
        status: 200,
        data: UpdateData,
        message: "User Update Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Not Updated" });
    }
  } else {
  }
};
// module.exports.UserLogin = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     let user;
//     if (email.includes("@")) {
//       user = await knex("smk_users").where("email", email).first();
//     } else {
//       user = await knex("smk_users").where("phone", email).first();
//     }
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     // const isPasswordCorrect = await bcrypt.compare(password, user.password);
//     if (user.password != password) {
//       res.status(400).json({ error: "Password Incorrect" });
//     } else {
//       const token = jwt.sign({ email }, "organicFarm", {
//         expiresIn: "1h",
//       });
//       const aa = await knex("smk_roletype").where({
//         id: user.roleId,
//       });
//       await knex("smk_log").insert({
//         userId: user.id,
//       });
//       res.json({
//         data: {
//           token: token,
//           Permission: aa[0].rolePermission,
//         },
//         status: 200,
//         message: "Login Successfully",
//       });
//     }

//     // let email = req.body.email;
//     // const password = req.body.password;
//     // const phone = req.body.phone;

//     // if (email) {
//     //   console.log("2q3");
//     //   await knex("smk_users")
//     //     .where({ email })
//     //     .andWhere({ password })
//     //     .then(async (content) => {
//     //       if (content.length > 0) {
//     //         console.log("dsds");
//     //         const token = jwt.sign({ content }, "organicFarm", {
//     //           expiresIn: "1h",
//     //         });
//     //         console.log("aa", token);
//     //         const aa = await knex("smk_roletype").where({
//     //           id: content[0].roleId,
//     //         });
//     //         await knex("smk_log").insert({
//     //           userId: content[0].id,
//     //         });
//     //         res.json({
//     //           data: {
//     //             ...content[0],
//     //             token: token,
//     //             Permission: aa[0].rolePermission,
//     //           },
//     //           status: 200,
//     //           message: "Login Successfully",
//     //         });
//     //       } else {
//     //         res.json({
//     //           data: [],
//     //           status: 401,
//     //           message: "Credential Not Exist",
//     //         });
//     //       }
//     //     })
//     //     .catch((err) => {
//     //       res.json(err);
//     //     });
//     // } else if (phone) {
//     //   console.log("ff");
//     //   await knex("smk_users")
//     //     .where({ phone })
//     //     .andWhere({ password })
//     //     .then(async (content) => {
//     //       if (content.length > 0) {
//     //         const token = jwt.sign({ content }, "organicFarm", {
//     //           expiresIn: "1h",
//     //         });
//     //         console.log(token);
//     //         const aa = await knex("smk_roletype").where({
//     //           id: content[0].roleId,
//     //         });
//     //         await knex("smk_log").insert({
//     //           userId: content[0].id,
//     //         });
//     //         res.json({
//     //           data: {
//     //             ...content[0],
//     //             token: token,
//     //             Permission: aa[0].rolePermission,
//     //           },
//     //           status: 200,
//     //           message: "Login Successfully",
//     //         });
//     //         // }
//     //       } else {
//     //         res.json({
//     //           data: [],
//     //           status: 401,
//     //           message: "Credential Not Exist",
//     //         });
//     //       }
//     //     })
//     //     .catch((err) => {
//     //       res.json(err);
//     //     });
//     // }
//   } catch (err) {
//     res.json(err);
//   }
// };
module.exports.UserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user;
    if (email.includes("@")) {
      user = await knex("smk_users").where("email", email).first();
    } else {
      user = await knex("smk_users").where("phone", email).first();
    }
    console.log(user);
    if (!user) {
      return res.status(404).json({ status: 404, msg: "User not found" });
    }
    // const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (user.password != password) {
      res.status(400).json({ status: 404, msg: "Password Incorrect" });
    } else {
      const token = jwt.sign({ email }, "organicFarm", {
        expiresIn: "1h",
      });
      const aa = await knex("smk_roletype").where({
        id: user.roleId,
      });

      await knex("smk_log").insert({
        userId: user.id,
      });
      const a = await knex("smk_settings").select("*");
      // console.log();
      // const array = aa[0].rolePermission;
      // console.log();
      const array = JSON.parse(aa[0].rolePermission).length;
      if (array === [].length) {
        res.json({ message: "You are not authorized for login. Please contact the admin" });
      } else {
        res.json({
          data: {
            id: user.id,
            // role: user.role,
            roleId: user.roleId,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phone: user.phone,
            state: user.state,
            city: user.city,
            taluka: user.taluka,
            village: user.village,
            pinCode: user.pinCode,
            token: token,
            Permission: aa[0].rolePermission,
            role: aa[0].roleType,
            logo: a[0].logo,
            favIcon: a[0].favIcon,
          },
          status: 200,
          message: "Login Successfully",
        });
      }
    }

    // let email = req.body.email;
    // const password = req.body.password;
    // const phone = req.body.phone;

    // if (email) {
    //   console.log("2q3");
    //   await knex("smk_users")
    //     .where({ email })
    //     .andWhere({ password })
    //     .then(async (content) => {
    //       if (content.length > 0) {
    //         console.log("dsds");
    //         const token = jwt.sign({ content }, "organicFarm", {
    //           expiresIn: "1h",
    //         });
    //         console.log("aa", token);
    //         const aa = await knex("smk_roletype").where({
    //           id: content[0].roleId,
    //         });
    //         await knex("smk_log").insert({
    //           userId: content[0].id,
    //         });
    //         res.json({
    //           data: {
    //             ...content[0],
    //             token: token,
    //             Permission: aa[0].rolePermission,
    //           },
    //           status: 200,
    //           message: "Login Successfully",
    //         });
    //       } else {
    //         res.json({
    //           data: [],
    //           status: 401,
    //           message: "Credential Not Exist",
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       res.json(err);
    //     });
    // } else if (phone) {
    //   console.log("ff");
    //   await knex("smk_users")
    //     .where({ phone })
    //     .andWhere({ password })
    //     .then(async (content) => {
    //       if (content.length > 0) {
    //         const token = jwt.sign({ content }, "organicFarm", {
    //           expiresIn: "1h",
    //         });
    //         console.log(token);
    //         const aa = await knex("smk_roletype").where({
    //           id: content[0].roleId,
    //         });
    //         await knex("smk_log").insert({
    //           userId: content[0].id,
    //         });
    //         res.json({
    //           data: {
    //             ...content[0],
    //             token: token,
    //             Permission: aa[0].rolePermission,
    //           },
    //           status: 200,
    //           message: "Login Successfully",
    //         });
    //         // }
    //       } else {
    //         res.json({
    //           data: [],
    //           status: 401,
    //           message: "Credential Not Exist",
    //         });
    //       }
    //     })
    //     .catch((err) => {
    //       res.json(err);
    //     });
    // }
  } catch (err) {
    res.json(err);
  }
};



module.exports.GetAllUser = async (req, res) => {
  try {
    const page = req.body.page; // Default to page 1 if not provided
    const pageSize = req.body.pageSize; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_users").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);
   const fullName = req.body.fullName || "";
    const roleId = req.body.roleId || "";

  
    // const getFarmerQuery = knex("smk_users")
    //   .select("smk_users.*") // Select columns from both tables
    //   .leftJoin("smk_usersdetails", "smk_users.id", "smk_usersdetails.userId") // Perform a left join
    //   .orderBy("smk_users.createdAt", "desc")
    //   .limit(pageSize)
    //   .offset((page - 1) * pageSize);
    const getFarmerQuery = await knex("smk_users as u")
      .select(
        "u.id as id",
        "u.roleId as roleId",
        "u.firstName as firstName",
        "u.lastName as lastName",
        "u.email as email",
        "u.phone as phone",
        "u.state as state",
        "u.city as city",
        "u.taluka as taluka",
        "u.village as village",
        "u.pinCode as pinCode",
        "u.flag as flag",
        "ud.centerName as centerName", // replace 'detailsColumn1' with actual column name
        "ud.centerRegisterUnderCompanyDate as centerRegisterUnderCompanyDate",
        "ud.centerKeyPerson as 	centerKeyPerson",
        // "ud.centerDistrict as centerDistrict",
        // "ud.centerTaluka as centerTaluka",
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
        "ud.lng as lng",
        "ud.lat as lat",
        // "ud.apmcDistrict as apmcDistrict",
        // "ud.apmcTaluka as apmcTaluka",
        "ud.apmcPersonName as apmcPersonName",
        "ud.apmcConnectedFarmers as apmcConnectedFarmers",
        "ud.apmcMajorCropsSelling as apmcMajorCropsSelling",
        "ud.districtFarmerComingSellProduct as districtFarmerComingSellProduct",
         "rt.roleType as role"

        // similarly, replace and add as many columns as needed
      )
    
      .leftJoin("smk_usersdetails as ud", "u.id", "=", "ud.userId")
         .leftJoin("smk_roletype as rt", "u.roleId", "=", "rt.id")
          .andWhere(function () {
        if (roleId !== "") {
          this.where({ roleId });
        }
      })
    .andWhere(function () {
        if (fullName) {
          this.where(function () {
            this.where("firstName", "LIKE", `%${fullName}%`).orWhere(
              "lastName",
              "LIKE",
              `%${fullName}%`
            );
          });
        }
      })
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

module.exports.getAllCenters = async (req, res) => {
  try {
    const page = req.body.page;
    const pageSize = req.body.pageSize;
    const fullName = req.body.fullName || "";
    const state = req.body.state || "";
    const city = req.body.city || "";
    const taluka = req.body.taluka || "";
    const centerName = req.body.centerName || "";
    const totalCountQuery = knex("smk_users").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getFarmerQuery = await knex("smk_users as u")
      .select(
        "u.id as id",
        "u.roleId as roleId",
        "u.firstName as firstName",
        "u.lastName as lastName",
        "u.email as email",
        "u.phone as phone",
        "u.state as state",
        "u.city as city",
        "u.taluka as taluka",
        "u.village as village",
        "u.pinCode as pinCode",
        "u.flag as flag",
        "ud.centerName as centerName", // replace 'detailsColumn1' with actual column name
        "ud.centerRegisterUnderCompanyDate as centerRegisterUnderCompanyDate",
        "ud.centerKeyPerson as 	centerKeyPerson",
        // "ud.centerDistrict as centerDistrict",
        // "ud.centerTaluka as centerTaluka",
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
        "ud.lng as lng",
        "ud.lat as lat",
        "rt.roleType as role"
        // ... (other columns)
      )
      .leftJoin("smk_usersdetails as ud", "u.id", "=", "ud.userId")
      .leftJoin("smk_roletype as rt", "u.roleId", "=", "rt.id")
     
      .andWhere(function () {
        if (fullName) {
          this.where(function () {
            this.where("firstName", "LIKE", `%${fullName}%`).orWhere(
              "lastName",
              "LIKE",
              `%${fullName}%`
            );
          });
        }
      })
      .andWhere(function () {
        if (state) {
          this.where("u.state", "=", state);
        }
        if (city) {
          this.where("u.city", "=", city);
        }
        if (taluka) {
          this.where("u.taluka", "=", taluka);
        }
      })
      .andWhere(function () {
        if (centerName) {
          this.where("ud.centerName", "LIKE", `%${centerName}%`);
        }
      })
      .andWhere("rt.id", "=", "1")
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
      res.json({ status: 404, data: [], message: "Users Not Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Something Went Wrong!" });
  }
};

module.exports.centersCount = async (req, res) => {
  try {
    const page = req.body.page;
    const pageSize = req.body.pageSize;
    const getFarmerQuery = await knex("smk_users as u")
      .select(
        "u.city as city",
        knex.raw("count(*) as count"),
        knex.raw(
          "MAX(CASE WHEN ud.lat IS NOT NULL AND ud.lng IS NOT NULL THEN ud.lat ELSE null END) as lat"
        ),
        knex.raw(
          "MAX(CASE WHEN ud.lat IS NOT NULL AND ud.lng IS NOT NULL THEN ud.lng ELSE null END) as lng"
        )
      )
      .leftJoin("smk_usersdetails as ud", "u.id", "=", "ud.userId")
      .leftJoin("smk_roletype as rt", "u.roleId", "=", "rt.id")
      .andWhere("rt.id", "=", "1")
      .groupBy("u.city");
    const getUsersAndCityCounts = await Promise.all([getFarmerQuery]);
    const [getUsers, cityCountsResult] = getUsersAndCityCounts;
    if (getUsers) {
      res.json({
        status: 200,
        data: getUsers,
        currentPage: page,
        pageSize: pageSize,
        message: "Users Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Users Not Found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: "Something Went Wrong!" });
  }
};