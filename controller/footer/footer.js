const { response } = require("express");
const knex = require("knex")(require("../../helper/db"));
const db = require("../../helper/db");
const config = require("../../helper/config");
const path = require("path");
const fs = require("fs");
const { log } = require("util");
const base64ToImage = require("base64-to-image");
const uuid = require("uuid");

function imageToBase64(imagePath) {
  const image = fs.readFileSync(imagePath);
  return image.toString("base64");
}

//update footer exploer
module.exports.updateFooterExploer = async (req, res) => {
  try {
    const { id, name, link, positionId } = req.body;

    const existingRecord = await knex("smk_footer").where({ id }).first();

    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }

    const footerExploerArray = JSON.parse(existingRecord.explore || "[]");
    console.log(footerExploerArray, "footerExploerArray");
    if (!positionId) {
      const newPositionId = footerExploerArray.length + 1;
      let record = {
        positionId: newPositionId,
        name: name,
        link: link,
      };

      footerExploerArray.push(record);
      await knex("smk_footer")
        .update({ explore: JSON.stringify(footerExploerArray) })
        .where({ id: id });

      res.status(200).json({
        status: "success",
        message: "explor page updated successfully",
        explore: JSON.stringify(footerExploerArray),
      });
    } else {
      let updatedCardIndex = -1;

      for (let i = 0; i < footerExploerArray.length; i++) {
        if (footerExploerArray[i].positionId == positionId) {
          updatedCardIndex = i;
          break; // Exit the loop once a match is found
        }
      }

      if (updatedCardIndex !== -1) {
        footerExploerArray[updatedCardIndex].name = name;
        footerExploerArray[updatedCardIndex].link = link;
        await knex("smk_footer")
          .update({ explore: JSON.stringify(footerExploerArray) })
          .where({ id: id });

        res.status(200).json({
          status: "success",
          message: "explor updated successfully",
          userQA: JSON.stringify(footerExploerArray),
        });
      } else {
        console.log("Card with positionId not found for update");
        res.status(404).json({
          status: "error",
          message: "Card with specified positionId not found",
        });
      }
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

//delete footer exploer
module.exports.deleteFooterExploer = async (req, res) => {
  try {
    const positionId = req.body.positionId;
    const id = req.body.id;

    const existingRecord = await knex("smk_footer").where({ id: id }).first();
    const footerExploerCardArray = JSON.parse(existingRecord.explore || "[]");
    console.log(footerExploerCardArray, "footerExploerCardArray");
    let updatedCardIndex = -1;

    for (let i = 0; i < footerExploerCardArray.length; i++) {
      if (footerExploerCardArray[i].positionId == positionId) {
        updatedCardIndex = i;
        break; // Exit the loop once a match is found
      }
    }

    if (updatedCardIndex !== -1) {
      footerExploerCardArray.splice(updatedCardIndex, 1);

      await knex("smk_footer")
        .update({
          explore: JSON.stringify(footerExploerCardArray),
        })
        .where({ id: id });

      res.status(200).json({
        status: "success",
        message: "Exploer Card removed successfully",
        explore: JSON.stringify(footerExploerCardArray),
      });
    } else {
      console.log("Card with positionId not found for update");
      res.status(404).json({
        status: "error",
        message: "Card with specified positionId not found",
      });
    }
  } catch (err) {
    res.send(err);
  }
};

//Get All footer
module.exports.getAllFooterExploerCard = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page; // Default to page 1 if not provided
    const pageSize = req.body.pageSize; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_footer").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getAllFooterExploerCardQuery = knex("smk_footer")
      .select("*")
      .limit(pageSize)
      .offset((page - 1) * pageSize);
  		console.log("Hii");

    const getAllExplorCard = await getAllFooterExploerCardQuery;

    if (getAllExplorCard) {
      res.json({
        status: 200,
        data: getAllExplorCard[0],
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "explor Card Get Successfully",
      });
    } else {
      res.json({
        status: 404,
        data: [],
        message: "Id Not Found!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};

//update featuresProduct
module.exports.featuresProductCard = async (req, res) => {
  try {
    const { id, fetureProductName, fetureDescription, positionId } = req.body;
    const fetureImages = req.files;

    const existingRecord = await knex("smk_footer").where({ id: id }).first();

    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }

    const featuresProductCardArray = JSON.parse(
      existingRecord.featuresProduct || "[]"
    );
    console.log(featuresProductCardArray, "featuresProductCardArray");

    if (!positionId) {
      const newPositionId = featuresProductCardArray.length + 1; // Generate new positionId
      const newContentCard = {
        positionId: newPositionId,
        fetureProductName,
        fetureDescription,
      };

      if (fetureImages.length > 0) {
        newContentCard.contentCardImage = `https://devapi.hivecareer.com/samruddhKishan/footer/uploads/fetureImages/${fetureImages[0].filename}`;
      }
      featuresProductCardArray.push(newContentCard);
      console.log(newContentCard, "cardArray");
      await knex("smk_footer")
        .update({ featuresProduct: JSON.stringify(featuresProductCardArray) })
        .where({ id: id });

      res.status(200).json({
        status: "success",
        message: "Content card added successfully",
        // newContentCard,
        contentCards: JSON.stringify(featuresProductCardArray), // Return the updated array
      });
    } else {
      let updatedCardIndex = -1;

      for (let i = 0; i < featuresProductCardArray.length; i++) {
        if (featuresProductCardArray[i].positionId == positionId) {
          updatedCardIndex = i;
          break; // Exit the loop once a match is found
        }
      }

      if (updatedCardIndex !== -1) {
        featuresProductCardArray[updatedCardIndex].fetureProductName =
          fetureProductName;
        featuresProductCardArray[updatedCardIndex].fetureDescription =
          fetureDescription;

        if (fetureImages.length > 0) {
          featuresProductCardArray[
            updatedCardIndex
          ].fetureImages = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/fetureImages/${fetureImages[0].filename}`;
        }

        await knex("smk_footer")
          .update({ featuresProduct: JSON.stringify(featuresProductCardArray) })
          .where({ id: id });

        res.status(200).json({
          status: "success",
          message: "feature product updated successfully",
          featuresProduct: JSON.stringify(featuresProductCardArray),
        });
      } else {
        console.log("Card with positionId not found for update");
        res.status(404).json({
          status: "error",
          message: "Card with specified positionId not found",
        });
      }
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
