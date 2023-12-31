const { response } = require("express");
const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");
// const handlebars = require("handlebars");
// const sha256 = require("crypto-js/sha256");
const knex = require("knex")(require("../../helper/db"));
const config = require("../../helper/config");
const sha256 = require("crypto-js/sha256");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res) => {
  try {
    const salt = await bcrypt.genSalt();
    var admin = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      role: req.body.role,
      password: await bcrypt.hash(req.body.password, salt),
    };
    const checkEmail = await knex("smk_admin").where({ email: admin.email });
    if (checkEmail.length > 0) {
      res.json({ data: [], message: "Email Already Exist" });
    } else {
      if (admin) {
        await knex("smk_admin").insert(admin);

        res.json({
          status: 200,
          data: admin,
          message: "Admin Create Successfully",
        });
      } else {
        res.json({ status: 404, data: [], message: "Admin Not Create" });
      }
    }
  } catch (err) {
    res.json(err);
  }
};

module.exports.login = async (req, res) => {
  try {
    var email = req.body.email;
    var password = req.body.password;
    await knex("smk_admin")
      .where({ email })
      .then(async (content) => {
        if (content.length > 0) {
          const isValidPassword = await bcrypt.compare(
            password,
            content[0].password
          );
          if (isValidPassword === false) {
            res.json({ data: [], message: "Invalid credential" });
          } else {
            const token = jwt.sign({ content }, "organicFarm", {
              expiresIn: "1h",
            });
            const Token = { token: token };
            const a = await knex("smk_settings").select("*");

            // const loginData = [content, Token];
            res.json({
              data: {
                ...content[0],
                token,
                logo: a[0].logo,
                favIcon: a[0].favIcon,
              },
              status: 200,
              message: "Login Successfully",
            });
            const GetData = await knex("smk_roletype").select("*");
            if (!GetData.length > 0) {
              let data1 = [
                {
                  id: 1,
                  roleType: "CENTERS",
                },
                {
                  id: 2,
                  roleType: "APMC TRADERS",
                },
                {
                  id: 3,
                  roleType: "VENDORS",
                },
              ];

              const allData = [...data1];
              await knex("smk_roletype").insert(allData);
            }
          }
        } else {
          res.json({
            data: [],
            status: 401,
            message: "Email Not Exist",
          });
        }
      })
      .catch((err) => {
        res.json(err);
      });
  } catch (err) {
    res.json(err);
  }
};

module.exports.changePassword = async (req, res) => {
  try {
    // const salt = await bcrypt.genSalt();
    const oldpass = req.body.oldpassword;
    await knex("smk_admin")
      .where({
        id: req.body.id,
      })
      .then(async (checkPass) => {
        const checkPassword = await bcrypt.compare(
          oldpass,
          checkPass[0].password
        );
        // console.log(a);
        if (checkPassword === false) {
          res.send({ message: "Old Password Is Incorrect" });
        } else {
          const salt = await bcrypt.genSalt();
          const hashPassword = await bcrypt.hash(req.body.newpassword, salt);
          await knex("smk_admin")
            .update({
              password: hashPassword,
            })
            .where({
              id: req.body.id,
            });
          res.send({ message: "password change successfully" });
        }
      });
  } catch (err) {
    console.log(err);
    res.send(err, false, undefined, 400);
  }
};

module.exports.logoAndFavIcon = async (req, res) => {
  const Images = await knex("smk_settings").select("*");
  res.json({
    data: { logo: Images[0].logo, favIcon: Images[0].favIcon },
    status: 200,
    message: "Get Logo",
  });
};

//forgot password with mail
// module.exports.forgotPassword = async (req, res) => {
//   try {
//     var val = Math.floor(100000 + Math.random() * 900000);
//     console.log(val);

//     var email = req.body.email;

//     await knex("admin")
//       .update({ password: val })
//       .where({ email: email })
//       .then(async (content) => {
//         if (content > 0) {
//           var transport = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//               user: "ashish.swb1234@gmail.com",
//               pass: "Password@123",
//             },
//           });
//           var mailOptions = {
//             from: "himanshusilverwebbuzz@gmail.com",
//             to: email,
//             subject: "changePassword",
//             html: `<html> ${val} is your one time password(OTP) for verification </html>`,
//           };
//           transport.sendMail(mailOptions, function (error, info) {
//             if (error) {
//               console.log(error);
//             }

//             res.send({ data: content, message: "otp sent" });
//           });
//           res.send(
//             middlewares.responseMiddleWares("otp sent", true, content, 200)
//           );
//         } else {
//           res.send(
//             middlewares.responseMiddleWares(
//               "otp not sent",
//               false,
//               undefined,
//               400
//             )
//           );
//         }
//       })
//       .catch((err) => {
//         res.send(middlewares.responseMiddleWares(err, false, undefined, 401));
//       });
//   } catch (err) {
//     res.send(middlewares.responseMiddleWares(err, false, undefined, 402));
//   }
// };
