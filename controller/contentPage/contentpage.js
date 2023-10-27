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

module.exports.sliderImages = async (req, res) => {
  try {
    const sliderSubHeader = req.body.sliderSubHeader;
    const sliderMainHeaderWithColor = req.body.sliderMainHeaderWithColor;
    const sliderSubHeader2 = req.body.sliderSubHeader2;
    const sliderDescription = req.body.sliderDescription;
    const sliderNumber = req.body.sliderNumber;

    const images = req.files;
    const imageUrls = [];

    for (const image of images) {
      const imageUrl = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/sliderImage/${image.filename}`;
      imageUrls.push(imageUrl);
    }

    const sliderData = {
      sliderSubHeader: sliderSubHeader,
      sliderMainHeaderWithColor: sliderMainHeaderWithColor,
      sliderSubHeader2: sliderSubHeader2,
      sliderDescription: sliderDescription,
      sliderNumber: sliderNumber,
      sliderImages: imageUrls.join(", "), // Join image URLs into a single string
    };

    // Insert the slider data into the database
    await knex("smk_sliderimages").insert(sliderData);

    res.status(200).json({
      status: "success",
      message: "Slider images uploaded successfully",
      sliderData: sliderData,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

//update slider Image
module.exports.updateSliderImages = async (req, res) => {
  try {
    const sliderSubHeader = req.body.sliderSubHeader;
    const sliderMainHeaderWithColor = req.body.sliderMainHeaderWithColor;
    const sliderSubHeader2 = req.body.sliderSubHeader2;
    const sliderDescription = req.body.sliderDescription;
    const sliderNumber = req.body.sliderNumber;
    const id = req.body.id;
    const checkId = await knex("smk_sliderimages").where({ id: id });
    const sliderImage = req.files;

    console.log(sliderImage, "image");

    if (checkId[0]) {
      if (sliderImage.length > 0) {
        const imageUrl = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/sliderImage/${sliderImage[0].filename}`;
        const sliderData = {
          sliderSubHeader: sliderSubHeader,
          sliderMainHeaderWithColor: sliderMainHeaderWithColor,
          sliderSubHeader2: sliderSubHeader2,
          sliderDescription: sliderDescription,
          sliderNumber: sliderNumber,
          sliderImages: imageUrl,
        };
        console.log(sliderData, "data");
        // const dataArray = [sliderData]; // Create an array to store the data
        // update the slider data into the database
        const updateProduct = await knex("smk_sliderimages")
          .update(sliderData)
          .where({ id: req.body.id });

        res.status(200).json({
          status: "success",
          message: "Images uploaded successfully",
          sliderData,
        });
      } else {
        const sliderData = {
          sliderSubHeader: sliderSubHeader,
          sliderMainHeaderWithColor: sliderMainHeaderWithColor,
          sliderSubHeader2: sliderSubHeader2,
          sliderDescription: sliderDescription,
          sliderNumber: sliderNumber,
        };
        // // const dataArray = [sliderData]; // Create an array to store the data
        // // update the slider data into the database
        const updateProduct = await knex("smk_sliderimages")
          .update(sliderData)
          .where({ id: req.body.id });
        res.status(200).json({
          status: "success",
          message: "Images uploaded successfully",
          sliderData,
        });
      }
    } else {
      res.status(400).json({
        message: "Id Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

//Delete slider Images
module.exports.deleteSliderImage = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteDeleteSlider = await knex("smk_sliderimages")
      .delete()
      .where({ id });
    console.log(deleteDeleteSlider);

    if (deleteDeleteSlider) {
      res.json({
        status: 200,
        data: deleteDeleteSlider,
        message: "Slider Image Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Slider Image Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

//get single slider
module.exports.getSingleSlider = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleSlider = await knex("smk_sliderimages")
      .select("*")
      .where({ id });
    console.log(getSingleSlider);

    if (getSingleSlider.length > 0) {
      res.json({
        status: 200,
        data: getSingleSlider,
        message: "sliderimage Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "sliderimage Not Get" });
    }
  } catch (err) {
    res.send(err);
  }
};

//Get All Sliders
module.exports.getAllSliderImages = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_sliderimages").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getSliderQuery = knex("smk_sliderimages")
      .select("*")
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const getSlider = await getSliderQuery;

    if (getSlider) {
      res.json({
        status: 200,
        data: getSlider,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "sliderImages Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "sliderImage Not Get" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};

//Secton 2: Content Main Images using base64 (T1)
//update content Page(Main original)
module.exports.updateContent = async (req, res) => {
  try {
    const { id, contentHeader, contentText } = req.body;
    const { contentMainImg, contentSubImg } = req.files;

    const existingRecord = await knex("smk_contentpages").where({ id }).first();

    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }

    const record = {
      contentHeader: contentHeader,
      contentText: contentText,
    };

    if (contentMainImg) {
      record.contentMainImg = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/contentImages/${contentMainImg[0].filename}`;
    }

    if (contentSubImg) {
      record.contentSubImg = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/contentImages/${contentSubImg[0].filename}`;
    }

    await knex("smk_contentpages").where({ id }).update(record);
    res.status(200).json({
      status: "success",
      message: "content Page updated successfully",
      ...record,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

//update content card with multer
module.exports.contentCard = async (req, res) => {
  try {
    const { id, contentCardHeading, contentCardText, positionId } = req.body;
    const contentCardImage = req.files;

    const existingRecord = await knex("smk_contentpages")
      .where({ id: id })
      .first();

    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }

    const contentCardArray = JSON.parse(existingRecord.contentCards || "[]");
    console.log(contentCardArray, "contentCardArray");

    if (!positionId) {
      // Create new card with a new positionId
      const newPositionId = contentCardArray.length + 1; // Generate new positionId
      const newContentCard = {
        positionId: newPositionId,
        // id: newPositionId, // Use positionId as a unique ID
        contentCardHeading,
        contentCardText,
      };

      if (contentCardImage.length > 0) {
        newContentCard.contentCardImage = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/contentCardImages/${contentCardImage[0].filename}`;
      }
      contentCardArray.push(newContentCard);
      console.log(newContentCard, "cardArray");
      await knex("smk_contentpages")
        .update({ contentCards: JSON.stringify(contentCardArray) })
        .where({ id: id });

      res.status(200).json({
        status: "success",
        message: "Content card added successfully",
        // newContentCard,
        contentCards: JSON.stringify(contentCardArray), // Return the updated array
      });
    } else {
      let updatedCardIndex = -1;

      for (let i = 0; i < contentCardArray.length; i++) {
        if (contentCardArray[i].positionId == positionId) {
          updatedCardIndex = i;
          break; // Exit the loop once a match is found
        }
      }

      if (updatedCardIndex !== -1) {
        contentCardArray[updatedCardIndex].contentCardHeading =
          contentCardHeading;
        contentCardArray[updatedCardIndex].contentCardText = contentCardText;

        if (contentCardImage.length > 0) {
          contentCardArray[
            updatedCardIndex
          ].contentCardImage = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/contentCardImages/${contentCardImage[0].filename}`;
        }

        await knex("smk_contentpages")
          .update({ contentCards: JSON.stringify(contentCardArray) })
          .where({ id: id });

        res.status(200).json({
          status: "success",
          message: "Content card updated successfully",
          contentCards: JSON.stringify(contentCardArray),
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

//delete content page
module.exports.deleteContentCard = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteContentCard = await knex("smk_contentpages")
      .delete()
      .where({ id });

    if (deleteContentCard) {
      res.json({
        status: 200,
        // data: deleteContentCard,
        message: "ContentCard Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "ContentCard Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

//get single slider
module.exports.getSingleContent = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleContent = await knex("smk_contentpages")
      .select(
       "*"
      )
      .where({ id });
    console.log(getSingleContent);

    if (getSingleContent.length > 0) {
      res.json({
        status: 200,
        data: getSingleContent,
        message: "Single Content Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Single Content Not Get" });
    }
  } catch (err) {
    res.send(err);
  }
};

//Get all contect
module.exports.getAllContent = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_contentpages").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);
    const getContentQuery = knex("smk_contentpages")
      .select("*")
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const socialSettings = knex("smk_settings")
      .select(
        "adminEmail",
        "adminAddress",
        "adminPhone",
        "facebook",
        "twitter",
        "instagram",
        "linkedin"
      )
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const getSocialSettings = await socialSettings;
    const getContent = await getContentQuery;
    const getProductCardsQuery = knex("smk_product")
      .select("productImage", "productDescription", "createdAt","productShort", "productName")
       .orderBy("createdAt", "desc")
      .limit(2);

    // Query to get records from smk_footer
    const getFooterCardsQuery = knex("smk_footer")
      .select("*")
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    Promise.all([getProductCardsQuery, getFooterCardsQuery])

      .then(([productCards, footerCards]) => {
        console.log(getProductCardsQuery, "getProductCardsQuery");
        // Combine the results from both queries
        const featuresProduct = [...productCards, ...footerCards];
        res.json({
          status: 200,
          data: {
            ...getContent[0],
            ...getSocialSettings[0],
            featuresProduct,
          },
          currentPage: page,
          pageSize: pageSize,
          totalItems: totalItems,
          message: "Content Get Successfully",
        });
        console.log("Combined Results:", combinedResults);
      })
      .catch((error) => {
        res.json({
          status: 404,
          data: [],
          message: "Id Not Found!",
        });
      });
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};

//contentPointDetail
module.exports.contentPointDetail = async (req, res) => {
  try {
    const { id, contentPointDetail, positionId } = req.body;

    const existingRecord = await knex("smk_contentpages")
      .where({ id: id })
      .first();

    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }

    const contentCardArray = JSON.parse(
      existingRecord.contentPointDetail || "[]"
    );
    console.log(contentCardArray, "contentCardArray");

    if (!positionId) {
      const newPositionId = contentCardArray.length + 1; // Generate new positionId
      const newContentCard = {
        positionId: newPositionId,
        contentPointDetail,
      };

      // if (contentCardImage.length > 0) {
      //   newContentCard.contentCardImage = `http://192.168.1.39:4001/samruddhKishan/contentPage/uploads/contentCardImages/${contentCardImage[0].filename}`;
      // }
      contentCardArray.push(newContentCard);
      console.log(newContentCard, "cardArray");
      await knex("smk_contentpages")
        .update({ contentPointDetail: JSON.stringify(contentCardArray) })
        .where({ id: id });

      res.status(200).json({
        status: "success",
        message: "Content card added successfully",
        // newContentCard,
        contentPointDetail: JSON.stringify(contentCardArray), // Return the updated array
      });
    } else {
      let updatedCardIndex = -1;

      for (let i = 0; i < contentCardArray.length; i++) {
        if (contentCardArray[i].positionId == positionId) {
          updatedCardIndex = i;
          break; // Exit the loop once a match is found
        }
      }

      if (updatedCardIndex !== -1) {
        contentCardArray[updatedCardIndex].contentPointDetail =
          contentPointDetail;
        // contentCardArray[updatedCardIndex].contentCardText = contentCardText;

        // if (contentCardImage.length > 0) {
        //   contentCardArray[
        //     updatedCardIndex
        //   ].contentCardImage = `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/contentCardImages/${contentCardImage[0].filename}`;
        // }

        await knex("smk_contentpages")
          .update({ contentPointDetail: JSON.stringify(contentCardArray) })
          .where({ id: id });

        res.status(200).json({
          status: "success",
          message: "content Point Detail updated successfully",
          contentPointDetail: JSON.stringify(contentCardArray),
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

//delete content Point details
module.exports.deleteContentPoint = async (req, res) => {
  try {
    const positionId = req.body.positionId;
    const id = req.body.id;

    const existingRecord = await knex("smk_contentpages")
      .where({ id: id })
      .first();
    const contentCardArray = JSON.parse(
      existingRecord.contentPointDetail || "[]"
    );
    console.log(contentCardArray, "contentCardArray");
    let updatedCardIndex = -1;

    for (let i = 0; i < contentCardArray.length; i++) {
      if (contentCardArray[i].positionId == positionId) {
        updatedCardIndex = i;
        break; // Exit the loop once a match is found
      }
    }

    if (updatedCardIndex !== -1) {
      contentCardArray.splice(updatedCardIndex, 1);

      await knex("smk_contentpages")
        .update({ contentPointDetail: JSON.stringify(contentCardArray) })
        .where({ id: id });

      res.status(200).json({
        status: "success",
        message: "Content point deleted successfully",
        contentPointDetail: JSON.stringify(contentCardArray),
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

//Section 3 : Big Product content Card Api
//bigProductContent Headings(Main Code) need to remove card
module.exports.updateBigProductContentHeadings = async (req, res) => {
  try {
    const {
      id,
      productContentMainHeading,
      productContentSubHeading,
      productContentText,
      //this fields are inside the card
      // bigProductContentSubHeading,
      // bigProductContentText,
    } = req.body;

    const { productContentMainCardImage } = req.files;

    const existingRecord = await knex("smk_contentpages").where({ id }).first();

    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }

    // const bigProductContentCardDetails = [
    //   {
    //     bigProductContentSubHeading: bigProductContentSubHeading,
    //     bigProductContentText: bigProductContentText,
    //     productContentMainCardImage: productContentMainCardImage
    //       ? `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/productContentMainCardImages/${productContentMainCardImage[0].filename}`
    //       : "",
    //   },
    // ];

    const updatedRecord = {
      productContentMainHeading,
      productContentSubHeading,
      productContentText,
      // bigProductContentCard: JSON.stringify(bigProductContentCardDetails),
    };

    await knex("smk_contentpages").where({ id }).update(updatedRecord);
    res.status(200).json({
      status: "success",
      message: "Content Page updated successfully",
      ...updatedRecord,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

//bigProductContentCard
module.exports.BigProductContentCard = async (req, res) => {
  try {
    const {
      id,
      bigProductContentSubHeading,
      bigProductContentText,
      positionId,
    } = req.body;
    const productContentMainCardImage = req.files;

    const existingRecord = await knex("smk_contentpages")
      .where({ id: id })
      .first();

    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }

    const contentCardArray = JSON.parse(
      existingRecord.bigProductContentCard || "[]"
    );
    console.log(contentCardArray, "contentCardArray");

    if (!positionId) {
      // Create new card with a new positionId
      const newPositionId = contentCardArray.length + 1; // Generate new positionId
      const newContentCard = {
        positionId: newPositionId,
        // id: newPositionId, // Use positionId as a unique ID
        bigProductContentSubHeading,
        bigProductContentText,
      };

      if (productContentMainCardImage.length > 0) {
        newContentCard.productContentMainCardImage = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/productContentMainCardImages/${productContentMainCardImage[0].filename}`;
      }
      contentCardArray.push(newContentCard);
      console.log(newContentCard, "cardArray");
      await knex("smk_contentpages")
        .update({ bigProductContentCard: JSON.stringify(contentCardArray) })
        .where({ id: id });

      res.status(200).json({
        status: "success",
        message: "Content card added successfully",
        // newContentCard,
        bigProductContentCard: JSON.stringify(contentCardArray), // Return the updated array
      });
    } else {
      let updatedCardIndex = -1;

      for (let i = 0; i < contentCardArray.length; i++) {
        if (contentCardArray[i].positionId == positionId) {
          updatedCardIndex = i;
          break; // Exit the loop once a match is found
        }
      }

      if (updatedCardIndex !== -1) {
        contentCardArray[updatedCardIndex].bigProductContentSubHeading =
          bigProductContentSubHeading;
        contentCardArray[updatedCardIndex].bigProductContentText =
          bigProductContentText;

        if (productContentMainCardImage.length > 0) {
          contentCardArray[
            updatedCardIndex
          ].productContentMainCardImage = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/productContentMainCardImages/${productContentMainCardImage[0].filename}`;
        }

        await knex("smk_contentpages")
          .update({ bigProductContentCard: JSON.stringify(contentCardArray) })
          .where({ id: id });

        res.status(200).json({
          status: "success",
          message: "Content card updated successfully",
          bigProductContentCard: JSON.stringify(contentCardArray),
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

//get single slider
module.exports.getSingleBigProductContentCard = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleBigProductContentCard = await knex("smk_contentpages")
      .select(
        "productContentMainHeading",
        "productContentSubHeading",
        "productContentText",
        "bigProductContentCard"
      )
      .where({ id });

    if (getSingleBigProductContentCard.length > 0) {
      res.json({
        status: 200,
        data: getSingleBigProductContentCard,
        message: "Single Big Product ContentCard Get Successfully",
      });
    } else {
      res.json({
        status: 404,
        data: [],
        message: "Single Big Product ContentCard Not Get",
      });
    }
  } catch (err) {
    res.send(err);
  }
};

//get All BigProductContentCard
module.exports.getAllBigProductContentCard = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_contentpages").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getBigProductContentCardQuery = knex("smk_contentpages")
      .select(
        "productContentMainHeading",
        "productContentSubHeading",
        "productContentText",
        "bigProductContentCard"
      )
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const getAllBigProductContentCard = await getBigProductContentCardQuery;

    if (getAllBigProductContentCard) {
      res.json({
        status: 200,
        data: getAllBigProductContentCard,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "Content Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Content Not Get" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};

//Delete Big Product Content Card
module.exports.deleteBigProductContentCard = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteBigProductContentCard = await knex("smk_contentpages")
      .delete()
      .where({ id });

    if (deleteBigProductContentCard) {
      res.json({
        status: 200,
        message: "Big Product Content Card Deleted Successfully",
      });
    } else {
      res.json({
        status: 404,
        data: [],
        message: "Id Not found",
      });
    }
  } catch (err) {
    res.send(err);
  }
};

// Section 4: small Product Content Card api

//update Small Product Content Details
module.exports.updateSmallProductContentDetails = async (req, res) => {
  try {
    const { id, smallProductContentMainHeading } = req.body;

    const existingRecord = await knex("smk_contentpages").where({ id }).first();
    console.log(existingRecord);
    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }

    // const smallProductContentData = [
    //   {
    //     productContentName: productContentName,
    //     smallProductContentCardImage: smallProductContentCardImage
    //       ? `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/smallProductContentCardImges/${smallProductContentCardImage[0].filename}`
    //       : "",
    //   },
    // ];

    const updatedRecord = {
      smallProductContentMainHeading,
      // bigProductContentCard: JSON.stringify(smallProductContentData),
    };

    await knex("smk_contentpages").where({ id }).update(updatedRecord);
    res.status(200).json({
      status: "success",
      message: "small Product Content Card updated successfully",
      ...updatedRecord,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

//update Small Product content Card
module.exports.updateSmallProductcontentCard = async (req, res) => {
  try {
    const { id, productContentName, positionId } = req.body;

    const smallProductContentCardImage = req.files;

    const existingRecord = await knex("smk_contentpages").where({ id }).first();

    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }
    const SmallContentCardArray = JSON.parse(
      existingRecord.smallProductContentCard || "[]"
    );
    console.log(SmallContentCardArray, "contentCardArray");
    if (!positionId) {
      const newPositionId = SmallContentCardArray.length + 1;
      const smallProductContentData = {
        positionId: newPositionId,
        productContentName: productContentName,
      };
      if (smallProductContentCardImage.length > 0) {
        smallProductContentData.smallProductContentCardImage = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/smallProductContentCardImges/${smallProductContentCardImage[0].filename}`;
      }
      console.log(smallProductContentData);
      SmallContentCardArray.push(smallProductContentData);

      await knex("smk_contentpages")
        .update({
          smallProductContentCard: JSON.stringify(SmallContentCardArray),
        })
        .where({ id: id });
      res.status(200).json({
        status: "success",
        message: "small Product Content Card updated successfully",
        smallProductContentCard: JSON.stringify(SmallContentCardArray),
      });
    } else {
      console.log("ss");
      let updatedCardIndex = -1;

      for (let i = 0; i < SmallContentCardArray.length; i++) {
        if (SmallContentCardArray[i].positionId == positionId) {
          updatedCardIndex = i;
          break; // Exit the loop once a match is found
        }
      }

      if (updatedCardIndex !== -1) {
        SmallContentCardArray[updatedCardIndex].productContentName =
          productContentName;

        if (smallProductContentCardImage.length > 0) {
          SmallContentCardArray[
            updatedCardIndex
          ].smallProductContentCardImage = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/smallProductContentCardImges/${smallProductContentCardImage[0].filename}`;
        }

        await knex("smk_contentpages")
          .update({
            smallProductContentCard: JSON.stringify(SmallContentCardArray),
          })
          .where({ id: id });

        res.status(200).json({
          status: "success",
          message: "Content card updated successfully",
          smallProductContentCard: JSON.stringify(SmallContentCardArray),
        });
      } else {
        console.log("Card with positionId not found for update");
        res.status(404).json({
          status: "error",
          message: "Card with specified positionId not found",
        });
      }
    }

    // const updatedRecord = {
    //   smallProductContentMainHeading,
    //   bigProductContentCard: JSON.stringify(smallProductContentData),
    // };
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

//get single slider
module.exports.getSingleSmallProductContentCard = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleSmallProductcontentCard = await knex("smk_contentpages")
      .select("smallProductContentMainHeading", "smallProductContentCard")
      .where({ id });

    if (getSingleSmallProductcontentCard.length > 0) {
      res.json({
        status: 200,
        data: getSingleSmallProductcontentCard,
        message: "Single Small Product content Card Get Successfully",
      });
    } else {
      res.json({
        status: 404,
        data: [],
        message: "Single Small Product content Card Not Get",
      });
    }
  } catch (err) {
    res.send(err);
  }
};

//get All Small Product ContentCard
module.exports.getAllSmallProductContentCard = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_contentpages").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getAllSmallProductContentCardQuery = knex("smk_contentpages")
      .select("smallProductContentMainHeading", "smallProductContentCard")
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const getAllSmallProductContentCard =
      await getAllSmallProductContentCardQuery;

    if (getAllSmallProductContentCard) {
      res.json({
        status: 200,
        data: getAllSmallProductContentCard,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "All Small Product Content Card Get Successfully",
      });
    } else {
      res.json({
        status: 404,
        data: [],
        message: "All Small Product Content Card Not Get",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};

//Delete Small Product ContentCard
module.exports.deleteSmallProductContentCard = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteSmallProductContentCard = await knex("smk_contentpages")
      .delete()
      .where({ id });

    if (deleteSmallProductContentCard) {
      res.json({
        status: 200,
        message: "Small Product Content Card Deleted Successfully",
      });
    } else {
      res.json({
        status: 404,
        data: [],
        message: "Id Not found",
      });
    }
  } catch (err) {
    res.send(err);
  }
};

//Section-5 QA content page
//Create QA ContentPage

//Qa content card
module.exports.updateQaContentCard = async (req, res) => {
  try {
    const { id, userQuestion, userAnswer, userQA, positionId } = req.body;

    const existingRecord = await knex("smk_contentpages").where({ id }).first();

    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }

    const userQAArray = JSON.parse(existingRecord.userQA || "[]");
    console.log(userQAArray, "contentCardArray");
    if (!positionId) {
      const newPositionId = userQAArray.length + 1;
      let record = {
        positionId: newPositionId,
        userAnswer: userAnswer,
        userQuestion: userQuestion,
      };

      userQAArray.push(record);
      await knex("smk_contentpages")
        .update({ userQA: JSON.stringify(userQAArray) })
        .where({ id: id });

      res.status(200).json({
        status: "success",
        message: "qaContent Page updated successfully",
        userQA: JSON.stringify(userQAArray),
      });
    } else {
      let updatedCardIndex = -1;

      for (let i = 0; i < userQAArray.length; i++) {
        if (userQAArray[i].positionId == positionId) {
          updatedCardIndex = i;
          break; // Exit the loop once a match is found
        }
      }

      if (updatedCardIndex !== -1) {
        userQAArray[updatedCardIndex].userAnswer = userAnswer;
        userQAArray[updatedCardIndex].userQuestion = userQuestion;

        await knex("smk_contentpages")
          .update({ userQA: JSON.stringify(userQAArray) })
          .where({ id: id });

        res.status(200).json({
          status: "success",
          message: "Quation answer updated successfully",
          userQA: JSON.stringify(userQAArray),
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

//Update QA ContentPage
module.exports.updateQaContent = async (req, res) => {
  try {
    const {
      id,
      qaContentCounter,
      qaContentCounterText,
      qaContentMainHeader,
      qaContentSubHeader,
    } = req.body;

    const { qaContentMainImg, qaContentlogo } = req.files;

    const existingRecord = await knex("smk_contentpages").where({ id }).first();

    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }

    let record = {
      qaContentCounter: qaContentCounter,
      qaContentCounterText: qaContentCounterText,
      qaContentMainHeader: qaContentMainHeader,
      qaContentSubHeader: qaContentSubHeader,
    };

    if (qaContentMainImg) {
      record.qaContentMainImg = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/qaContentImages/${qaContentMainImg[0].filename}`;
    }

    if (qaContentlogo) {
      record.qaContentlogo = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/qaContentImages/${qaContentlogo[0].filename}`;
    }

    await knex("smk_contentpages").where({ id }).update(record);

    res.status(200).json({
      status: "success",
      message: "qaContent Page updated successfully",
      ...record,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

//Delete QA ContentPage
module.exports.deleteQaContent = async (req, res) => {
  try {
    const positionId = req.body.positionId;
    const id = req.body.id;

    const existingRecord = await knex("smk_contentpages")
      .where({ id: id })
      .first();
    const qaContentCardArray = JSON.parse(existingRecord.userQA || "[]");
    console.log(qaContentCardArray, "qaContentCardArray");
    let updatedCardIndex = -1;

    for (let i = 0; i < qaContentCardArray.length; i++) {
      if (qaContentCardArray[i].positionId == positionId) {
        updatedCardIndex = i;
        break; // Exit the loop once a match is found
      }
    }

    if (updatedCardIndex !== -1) {
      qaContentCardArray.splice(updatedCardIndex, 1);

      await knex("smk_contentpages")
        .update({
          userQA: JSON.stringify(qaContentCardArray),
        })
        .where({ id: id });

      res.status(200).json({
        status: "success",
        message: "QA content removed successfully",
        bigProductContentCard: JSON.stringify(qaContentCardArray),
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
//Get single QA Content Page
module.exports.getSingleQaContentCard = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleQaContentCard = await knex("smk_contentpages")
      .select(
        "qaContentMainImg",
        "qaContentlogo",
        "qaContentCounter",
        "qaContentCounter",
        "qaContentCounterText",
        "qaContentMainHeader",
        "qaContentSubHeader",
        "userQA"
      )
      .where({ id });

    if (getSingleQaContentCard.length > 0) {
      res.json({
        status: 200,
        data: getSingleQaContentCard,
        message: "Single QA ContentPage Get Successfully",
      });
    } else {
      res.json({
        status: 404,
        data: [],
        message: "Id Not Found!",
      });
    }
  } catch (err) {
    res.send(err);
  }
};

//Get All QA content pages
module.exports.getAllQaContentCard = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_contentpages").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getAllQaContentCardQuery = knex("smk_contentpages")
      .select(
        "qaContentMainImg",
        "qaContentlogo",
        "qaContentCounter",
        "qaContentCounter",
        "qaContentCounterText",
        "qaContentMainHeader",
        "qaContentSubHeader",
        "userQA"
      )
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const getAllQaContentCardCard = await getAllQaContentCardQuery;

    if (getAllQaContentCardCard) {
      res.json({
        status: 200,
        data: getAllQaContentCardCard,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "All QA Content Card Get Successfully",
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

//Section-6 Testimonial

//updateTestimonialCard
module.exports.updateTestimonialCard = async (req, res) => {
  try {
    const {
      id,
      testimonialTitle,
      testimonialDescription,
      testimonialPersonName,
      testimonialPersonRole,
      positionId,
    } = req.body; // Get these fields from the request body

    const existingRecord = await knex("smk_contentpages").where({ id }).first();

    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }
    const testimonialContentArray = JSON.parse(
      existingRecord.testimonialCard || "[]"
    );
    console.log(testimonialContentArray, "contentCardArray");
    if (!positionId) {
      const newPositionId = testimonialContentArray.length + 1;
      const testimonial = {
        positionId: newPositionId,
        testimonialPersonName: testimonialPersonName,
        testimonialPersonRole: testimonialPersonRole,
        testimonialDescription: testimonialDescription,
      };
      testimonialContentArray.push(testimonial);

      await knex("smk_contentpages")
        .where({ id })
        .update({ testimonialCard: JSON.stringify(testimonialContentArray) });

      res.status(200).json({
        status: "success",
        message: "testimonial Pages updated successfully",
        testimonialCard: JSON.stringify(testimonialContentArray),
      });
    } else {
      let updatedCardIndex = -1;

      for (let i = 0; i < testimonialContentArray.length; i++) {
        if (testimonialContentArray[i].positionId == positionId) {
          updatedCardIndex = i;
          break; // Exit the loop once a match is found
        }
      }

      if (updatedCardIndex !== -1) {
        testimonialContentArray[updatedCardIndex].testimonialPersonName =
          testimonialPersonName;
        testimonialContentArray[updatedCardIndex].testimonialPersonRole =
          testimonialPersonRole;
        testimonialContentArray[updatedCardIndex].testimonialDescription =
          testimonialDescription;

        await knex("smk_contentpages")
          .update({ testimonialCard: JSON.stringify(testimonialContentArray) })
          .where({ id: id });

        res.status(200).json({
          status: "success",
          message: "Content card updated successfully",
          testimonialCard: JSON.stringify(testimonialContentArray),
        });
      } else {
        console.log("Card with positionId not found for update");
        res.status(404).json({
          status: "error",
          message: "Card with specified positionId not found",
        });
      }
    }
    // Create an array with the desired fields
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

//TestimonialImage
module.exports.testimonialImage = async (req, res) => {
  try {
    const { id, testimonialTitle } = req.body; // Get these fields from the request body
    const {
      testimonialImg1,
      testimonialImg2,
      testimonialImg3,
      testimonialImg4,
    } = req.files;

    const existingRecord = await knex("smk_contentpages").where({ id }).first();

    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }

    // Create an array with the desired fields

    let testimonialRecord = {
      testimonialTitle: testimonialTitle,
      // Convert the array to JSON
    };

    if (testimonialImg1) {
      testimonialRecord.testimonialImg1 = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/testimonialImages/${testimonialImg1[0].filename}`;
    }

    if (testimonialImg2) {
      testimonialRecord.testimonialImg2 = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/testimonialImages/${testimonialImg2[0].filename}`;
    }

    if (testimonialImg3) {
      testimonialRecord.testimonialImg3 = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/testimonialImages/${testimonialImg3[0].filename}`;
    }

    if (testimonialImg4) {
      testimonialRecord.testimonialImg4 = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/testimonialImages/${testimonialImg4[0].filename}`;
    }

    await knex("smk_contentpages").where({ id }).update(testimonialRecord);

    res.status(200).json({
      status: "success",
      message: "testimonial Pages updated successfully",
      ...testimonialRecord,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

//detete Testimonial page

//deleteTestimonialPage
module.exports.deleteTestimonialCard = async (req, res) => {
  try {
    const positionId = req.body.positionId;
    const id = req.body.id;

    const existingRecord = await knex("smk_contentpages")
      .where({ id: id })
      .first();
    const testimonialCard = JSON.parse(existingRecord.testimonialCard || "[]");
    console.log(testimonialCard, "testimonialCard");
    let updatedCardIndex = -1;

    for (let i = 0; i < testimonialCard.length; i++) {
      if (testimonialCard[i].positionId == positionId) {
        updatedCardIndex = i;
        break; // Exit the loop once a match is found
      }
    }

    if (updatedCardIndex !== -1) {
      testimonialCard.splice(updatedCardIndex, 1);

      await knex("smk_contentpages")
        .update({
          testimonialCard: JSON.stringify(testimonialCard),
        })
        .where({ id: id });

      res.status(200).json({
        status: "success",
        message: "testimonial Card Removed successfully",
        testimonialCard: JSON.stringify(testimonialCard),
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
//Get All Testimonial pages
module.exports.getAllTestimonialCard = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_contentpages").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getAllTestimonialCardQuery = knex("smk_contentpages")
      .select(
        "testimonialImg1",
        "testimonialImg2",
        "testimonialImg3",
        "testimonialImg4",
        "testimonialTitle",
        "testimonialCard"
      )
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const getAllTestimonialCard = await getAllTestimonialCardQuery;

    if (getAllTestimonialCard) {
      res.json({
        status: 200,
        data: getAllTestimonialCard,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "All QA Content Card Get Successfully",
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

//Section-7

module.exports.updateImageGallery = async (req, res) => {
  try {
    const { id, gallerySubHeader, galleryMainHeader } = req.body;

    const existingRecord = await knex("smk_contentpages").where({ id }).first();

    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }

    const updatedRecord = {
      gallerySubHeader,
      galleryMainHeader,
    };

    await knex("smk_contentpages").where({ id }).update(updatedRecord);
    res.status(200).json({
      status: "success",
      message: "Image Gallery updated successfully",
      ...updatedRecord,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

//update Image Gallery Card
module.exports.updateImageGalleryCard = async (req, res) => {
  try {
    const { id, positionId, imgSubText, imgText } = req.body;

    const galleryImage = req.files;

    const existingRecord = await knex("smk_contentpages").where({ id }).first();

    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }

    const GalleryCardArray = JSON.parse(
      existingRecord.ImageGalleryCard || "[]"
    );
    console.log(GalleryCardArray, "contentCardArray");

    if (!positionId) {
      const newPositionId = GalleryCardArray.length + 1;
      const ImageGalleryCardData = {
        imgText: imgText,
        positionId: newPositionId,
        imgSubText: imgSubText,
      };
      console.log(ImageGalleryCardData);
      if (galleryImage.length > 0) {
        ImageGalleryCardData.galleryImage = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/galleryImages/${galleryImage[0].filename}`;
      }
      console.log(ImageGalleryCardData, "asdas");
      GalleryCardArray.push(ImageGalleryCardData);
      await knex("smk_contentpages")
        .update({ ImageGalleryCard: JSON.stringify(GalleryCardArray) })
        .where({ id });
      res.status(200).json({
        status: "success",
        message: "Image Gallery updated successfully",
        ImageGalleryCard: JSON.stringify(GalleryCardArray),
      });
    } else {
      console.log("sd");
      let updatedCardIndex = -1;

      for (let i = 0; i < GalleryCardArray.length; i++) {
        if (GalleryCardArray[i].positionId == positionId) {
          updatedCardIndex = i;
          break; // Exit the loop once a match is found
        }
      }

      if (updatedCardIndex !== -1) {
        GalleryCardArray[updatedCardIndex].imgText = imgText;
        GalleryCardArray[updatedCardIndex].imgSubText = imgSubText;

        if (galleryImage.length > 0) {
          GalleryCardArray[
            updatedCardIndex
          ].galleryImage = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/galleryImages/${galleryImage[0].filename}`;
        }

        await knex("smk_contentpages")
          .update({ ImageGalleryCard: JSON.stringify(GalleryCardArray) })
          .where({ id: id });

        res.status(200).json({
          status: "success",
          message: "Content card updated successfully",
          ImageGalleryCard: JSON.stringify(GalleryCardArray),
        });
      }
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

//get All ImageGallery
module.exports.getAllImageGallery = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_contentpages").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getAllImageGalleryQuery = knex("smk_contentpages")
      .select("gallerySubHeader", "	galleryMainHeader", "ImageGalleryCard")
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const getAllImageGallery = await getAllImageGalleryQuery;

    if (getAllImageGallery) {
      res.json({
        status: 200,
        data: getAllImageGallery,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "Image Gallery Get Successfully",
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

//section:8 Blog
//create blog
module.exports.blogContent = async (req, res) => {
  try {
    const { blogHeading, blogDate, blogContent } = req.body;
    const blogImage = req.files;

    const record = {
      blogHeading: blogHeading,
      blogDate: blogDate,
      blogContent: blogContent,
    };

    if (blogImage) {
      record.blogImage = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/blogImage/${blogImage[0].filename}`;
    }

    await knex("smk_blog").insert(record);
    res.status(200).json({
      status: "success",
      message: "blog created successfully",
      ...record,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

//update blog
module.exports.updateBlog = async (req, res) => {
  try {
    const { id, blogHeading, blogDate, blogContent } = req.body;
    const blogImage = req.files;

    const existingRecord = await knex("smk_blog").where({ id }).first();

    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }

    const record = {
      blogHeading: blogHeading,
      blogDate: blogDate,
      blogContent: blogContent,
    };

    if (blogImage) {
      record.blogImage = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/blogImage/${blogImage[0].filename}`;
    }

    await knex("smk_blog").where({ id }).update(record);
    res.status(200).json({
      status: "success",
      message: "blog updated successfully",
      ...record,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

//get All Blog
module.exports.getAllBlog = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_blog").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getAllBlogQuery = knex("smk_blog")
      .select("*")
      .limit(pageSize)
      .offset((page - 1) * pageSize);

    const getAllBlogCard = await getAllBlogQuery;

    if (getAllBlogCard) {
      res.json({
        status: 200,
        data: getAllBlogCard,
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

//get Single Blog
module.exports.getSingleBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleBlog = await knex("smk_blog").select("*").where({ id });

    if (getSingleBlog.length > 0) {
      res.json({
        status: 200,
        data: getSingleBlog,
        message: "blog Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Blog Not Get" });
    }
  } catch (err) {
    res.send(err);
  }
};

//delete Blog
module.exports.deleteBlog = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteBlog = await knex("smk_blog").delete().where({ id });
    console.log(deleteBlog);

    if (deleteBlog) {
      res.json({
        status: 200,
        data: deleteBlog,
        message: "Blog Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Blog Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

//section:9 Footer
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

//delete features Product
module.exports.deleteFeaturesProduct = async (req, res) => {
  try {
    const positionId = req.body.positionId;
    const id = req.body.id;

    const existingRecord = await knex("smk_footer").where({ id: id }).first();

    const featuresCardArray = JSON.parse(
      existingRecord.featuresProduct || "[]"
    );
    console.log(featuresCardArray, "featuresCardArray");
    let updatedCardIndex = -1;

    for (let i = 0; i < featuresCardArray.length; i++) {
      if (featuresCardArray[i].positionId == positionId) {
        updatedCardIndex = i;
        break; // Exit the loop once a match is found
      }
    }

    if (updatedCardIndex !== -1) {
      featuresCardArray.splice(updatedCardIndex, 1);

      await knex("smk_footer")
        .update({
          featuresProduct: JSON.stringify(featuresCardArray),
        })
        .where({ id: id });

      res.status(200).json({
        status: "success",
        message: "feature product removed successfully",
        featuresProduct: JSON.stringify(featuresCardArray),
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

//update footer Details
module.exports.updateFooterDetails = async (req, res) => {
  try {
    const {
      id,
      contactAddress,
      contactPhone,
      contactEmail,
      waterMark,
      termsLink,
      privacyLink,
      supportLink,
      footerContent,
    } = req.body;

    const existingRecord = await knex("smk_footer").where({ id }).first();
    console.log(existingRecord);
    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }

    const updatedRecord = {
      contactAddress,
      contactPhone,
      contactEmail,
      waterMark,
      termsLink,
      privacyLink,
      supportLink,
      footerContent,
    };

    await knex("smk_footer").where({ id }).update(updatedRecord);
    res.status(200).json({
      status: "success",
      message: "Footer Details updated successfully",
      ...updatedRecord,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};


//section 10: Achivements counts
module.exports.updateAchivements = async (req, res) => {
  try {
    const {
      id,
      achivementHeading,
      totalGrowth,
      totalHappyClients,
      totalSales,
    } = req.body;

    const existingRecord = await knex("smk_contentpages").where({ id }).first();

    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }
    const updatedRecord = {
      achivementHeading,
      totalGrowth,
      totalHappyClients,
      totalSales,
    };

    await knex("smk_contentpages").where({ id }).update(updatedRecord);
    res.status(200).json({
      status: "success",
      message: "achivement updated successfully",
      ...updatedRecord,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

//Section 11 : service content Card Api
//bigService Content Headings(Main Code)
module.exports.updateBigSerivceContentHeadings = async (req, res) => {
  try {
    const {
      id,
      serviceContentMainHeading,
      serviceContentSubHeading,
      serviceContentText,
    } = req.body;

    const existingRecord = await knex("smk_contentpages").where({ id }).first();

    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }
    const updatedRecord = {
      serviceContentMainHeading,
      serviceContentSubHeading,
      serviceContentText,
    };

    await knex("smk_contentpages").where({ id }).update(updatedRecord);
    res.status(200).json({
      status: "success",
      message: "service updated successfully",
      ...updatedRecord,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

//BigServiceContentCard
module.exports.BigServiceContentCard = async (req, res) => {
  try {
    const {
      id,
      bigServiceContentSubHeading,
      bigServiceContentText,
      positionId,
    } = req.body;
    const ServiceContentMainCardImage = req.files;

    const existingRecord = await knex("smk_contentpages")
      .where({ id: id })
      .first();

    if (!existingRecord) {
      return res.status(404).json({
        status: "error",
        message: "Id not found",
      });
    }

    const contentCardArray = JSON.parse(
      existingRecord.bigServiceContentCard || "[]"
    );
    console.log(contentCardArray, "contentCardArray");

    if (!positionId) {
      const newPositionId = contentCardArray.length + 1; // Generate new positionId
      const newContentCard = {
        positionId: newPositionId,
        bigServiceContentSubHeading,
        bigServiceContentText,
      };

      if (ServiceContentMainCardImage.length > 0) {
        newContentCard.ServiceContentMainCardImage = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/serviceContentMainCardImages/${ServiceContentMainCardImage[0].filename}`;
      }
      contentCardArray.push(newContentCard);
      console.log(newContentCard, "cardArray");
      await knex("smk_contentpages")
        .update({ bigServiceContentCard: JSON.stringify(contentCardArray) })
        .where({ id: id });

      res.status(200).json({
        status: "success",
        message: "Content card added successfully",
        // newContentCard,
        bigServiceContentCard: JSON.stringify(contentCardArray), // Return the updated array
      });
    } else {
      let updatedCardIndex = -1;

      for (let i = 0; i < contentCardArray.length; i++) {
        if (contentCardArray[i].positionId == positionId) {
          updatedCardIndex = i;
          break; // Exit the loop once a match is found
        }
      }

      if (updatedCardIndex !== -1) {
        contentCardArray[updatedCardIndex].bigServiceContentSubHeading =
          bigServiceContentSubHeading;
        contentCardArray[updatedCardIndex].bigServiceContentText =
          bigServiceContentText;

        if (ServiceContentMainCardImage.length > 0) {
          contentCardArray[
            updatedCardIndex
          ].ServiceContentMainCardImage = `https://devapi.hivecareer.com/samruddhKishan/contentPage/uploads/serviceContentMainCardImages/${ServiceContentMainCardImage[0].filename}`;
        }

        await knex("smk_contentpages")
          .update({ bigServiceContentCard: JSON.stringify(contentCardArray) })
          .where({ id: id });

        res.status(200).json({
          status: "success",
          message: "Content card updated successfully",
          bigServiceContentCard: JSON.stringify(contentCardArray),
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

//get single service
module.exports.getSingleBigSerivceContentCard = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleBigSerivceContentCard = await knex("smk_contentpages")
      .select(
        "serviceContentMainHeading",
        "serviceContentSubHeading",
        "serviceContentText",
        "bigServiceContentCard"
      )
      .where({ id });

    if (getSingleBigSerivceContentCard.length > 0) {
      res.json({
        status: 200,
        data: getSingleBigSerivceContentCard,
        message: "Single Big Service ContentCard Get Successfully",
      });
    } else {
      res.json({
        status: 404,
        data: [],
        message: "Single Big Service ContentCard Not Get",
      });
    }
  } catch (err) {
    res.send(err);
  }
};

//get All BigServiceContentCard
module.exports.getAllBigServiceContentCard = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided
    const totalCountQuery = knex("smk_contentpages").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getBigServiceContentCardQuery = knex("smk_contentpages")
      .select(
        "serviceContentMainHeading",
        "serviceContentSubHeading",
        "serviceContentText",
        "bigServiceContentCard"
      )
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const getAllBigServiceContentCard = await getBigServiceContentCardQuery;

    if (getAllBigServiceContentCard) {
      res.json({
        status: 200,
        data: getAllBigServiceContentCard,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "Content Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Content Not Get" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};


//Delete Big Service Content Card
module.exports.deleteBigServiceContentCard = async (req, res) => {
  try {
    const positionId = req.body.positionId;
    const id = req.body.id;

    const existingRecord = await knex("smk_contentpages")
      .where({ id: id })
      .first();
    const bigServiceContentCardArray = JSON.parse(
      existingRecord.bigProductContentCard || "[]"
    );
    console.log(bigServiceContentCardArray, "bigProductContentCardArray");
    let updatedCardIndex = -1;

    for (let i = 0; i < bigServiceContentCardArray.length; i++) {
      if (bigServiceContentCardArray[i].positionId == positionId) {
        updatedCardIndex = i;
        break; // Exit the loop once a match is found
      }
    }

    if (updatedCardIndex !== -1) {
      bigServiceContentCardArray.splice(updatedCardIndex, 1);

      await knex("smk_contentpages")
        .update({
          bigServiceContentCard: JSON.stringify(bigServiceContentCardArray),
        })
        .where({ id: id });

      res.status(200).json({
        status: "success",
        message: "Big Service Content Card Removed successfully",
        bigServiceContentCard: JSON.stringify(bigServiceContentCardArray),
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


