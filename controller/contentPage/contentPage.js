const { response } = require("express");
const knex = require("knex")(require("../../helper/db"));
const config = require("../../helper/config");
const base64ToImage = require("base64-to-image");
const path = require("path");
const fs = require("fs");
const { log } = require("util");

//create content page api
module.exports.createContentPage = async (req, res) => {
  try {
    const base64Str1 = req.body.image1;
    const base64Str2 = req.body.image2;
    const contentpages = {
      textEditor: req.body.textEditor || [],
      fildArray: req.body.fildArray || "",
      header: req.body.header || "",
      content: req.body.content || "",
    };

    if (!base64Str1) {
      return res.status(400).json({
        status: 400,
        data: [],
        message: "Please upload the first image",
      });
    } else {
      const path1 = "./uploads/contentImage/";
      let optionalObj1 = {
        fileName: req.body.fileName || "",
        type: base64Str1.split(";")[0].split("/")[1],
      };

      const imageInfo1 = base64ToImage(base64Str1, path1, optionalObj1);
      const filePath1 = `http://192.168.1.218:4001/samruddhKishan/contentPage/uploads/contentImage/${imageInfo1.fileName}`;
      contentpages["image1"] = filePath1;
      console.log("Image 1:", filePath1);

      if (base64Str2) {
        const path2 = "./uploads/contentImage/";
        let optionalObj2 = {
          fileName: req.body.fileName2 || "",
          type: base64Str2.split(";")[0].split("/")[1],
        };

        const imageInfo2 = base64ToImage(base64Str2, path2, optionalObj2);
        const filePath2 = `http://192.168.1.218:4001/samruddhKishan/contentPage/uploads/contentImage/${imageInfo2.fileName}`;
        contentpages["image2"] = filePath2;
        console.log("Image 2:", filePath2);
      } else {
        return res.status(400).json({
          status: 400,
          data: [],
          message: "Please upload the second image",
        });
      }

      if (Object.keys(contentpages).length > 0) {
        const insertedContentPageIds = await knex("contentpages").insert(
          contentpages
        );
        const insertedContentPages = await knex("contentpages").whereIn(
          "id",
          insertedContentPageIds
        );
        return res.status(200).json({
          status: 200,
          data: insertedContentPages, // Return the newly inserted data
          message: "Content page uploaded successfully",
        });
      } else {
        return res.status(400).json({
          status: 400,
          data: [],
          message: "Please fill all the required fields and upload both images",
        });
      }
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
