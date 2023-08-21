const { response } = require("express");
const knex = require("knex")(require("../../helper/db"));
const db = require("../../helper/db");
const config = require("../../helper/config");
const path = require("path");
const fs = require("fs");
const { log } = require("util");
const base64ToImage = require("base64-to-image");

// Section 1: slider images
//create Slider Image api
// module.exports.sliderImages = async (req, res) => {
//   try {
//     const sliderSubHeader = req.body.sliderSubHeader;
//     const sliderMainHeaderWithColor = req.body.sliderMainHeaderWithColor;
//     const sliderSubHeader2 = req.body.sliderSubHeader2;
//     const sliderDescription = req.body.sliderDescription;
//     const sliderNumber = req.body.sliderNumber;

//     const images = req.files;
//     console.log(images, "images1");

//     // if (images && images.length > 0) {
//     // const image = images[0]; // Assuming you're only processing the first image
//     const imageUrl = `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/sliderImage/${images[0].filename}`;
//     const sliderData = {
//       sliderSubHeader: sliderSubHeader,
//       sliderMainHeaderWithColor: sliderMainHeaderWithColor,
//       sliderSubHeader2: sliderSubHeader2,
//       sliderDescription: sliderDescription,
//       sliderNumber: sliderNumber,
//       sliderImages: imageUrl,
//     };
//     // const dataArray = [sliderData]; // Create an array to store the data

//     // Insert the slider data into the database
//     await knex("sliderimages").insert(sliderData);

//     res.status(200).json({
//       status: "success",
//       message: "sliderimage uploaded successfully",
//       sliderData: sliderData,
//     });
//     // } else {
//     //   res.status(400).json({
//     //     message: "sliderimage not uploaded",
//     //   });
//     // }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: "Something went wrong",
//     });
//   }
// };

//t1
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
      const imageUrl = `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/sliderImage/${image.filename}`;
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
    await knex("sliderimages").insert(sliderData);

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
    const checkId = await knex("sliderImages").where({ id: id });
    const sliderImage = req.files;

    console.log(sliderImage, "image");

    if (checkId[0]) {
      if (sliderImage.length > 0) {
        const imageUrl = `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/sliderImage/${sliderImage[0].filename}`;
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
        const updateProduct = await knex("sliderImages")
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
        const updateProduct = await knex("sliderImages")
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
    const deleteDeleteSlider = await knex("sliderimages")
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
    const getSingleSlider = await knex("sliderimages")
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
    const totalCountQuery = knex("sliderImages").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getSliderQuery = knex("sliderImages")
      .select("*")
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const getSlider = await getSliderQuery;

    if (getSlider) {
      res.json({
        status: 200,
        data: [...getSlider],
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
    const { contentHeader, contentText } = req.body;
    const { contentMainImg, contentSubImg } = req.files;
    const id = req.body.id;
    const checkId = await knex("contentpages").where({ id: id });
    // console.log(...checkId);
    if (checkId[0]) {
      if (!contentMainImg.length > 0) {
        console.log("aaa");
        const record = {
          contentHeader: contentHeader,
          contentText: contentText,
          contentSubImg: `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/contentImages/${
            contentSubImg[0].filename || ""
          }`,
        };
        const updateProduct = await knex("contentpages")
          .update(record)
          .where({ id: req.body.id });
        res.status(200).json({
          status: "success",
          message: "Content Pages Updated successfully",
          Data: record,
        });
      } else if (!contentSubImg.length > 0) {
        const record = {
          contentHeader: contentHeader,
          contentText: contentText,
          contentMainImg: `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/contentImages/${
            contentMainImg[0].filename || ""
          }`,
        };
        const updateProduct = await knex("contentpages")
          .update(record)
          .where({ id: req.body.id });

        res.status(200).json({
          status: "success",
          message: "Content Pages Updated successfully",
          Data: record,
        });
      } else {
        const record = {
          contentHeader: contentHeader,
          contentText: contentText,
          // contentMainImg: `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/contentImages/${
          //   contentMainImg[0].filename || ""
          // }`,
          // contentSubImg: `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/contentImages/${
          //   contentSubImg[0].filename || ""
          // }`,
        };
        const updateProduct = await knex("contentpages")
          .update(record)
          .where({ id: req.body.id });
        res.status(200).json({
          status: "success",
          message: "Content Pages Updated successfully",
          Data: record,
        });
      }
    } else {
      res.status(400).json({
        message: "Id Not Found",
      });
    }
    // const mainImg = req.body.contentMainImage;
    // const subImg = req.body.contentSubImage;
    // const id = req.body.id;
    // const checkId = await knex("contentpages").where({ id });

    // if (checkId[0]) {
    //   const contentpages = {
    //     contentHeader: req.body.contentHeader || "",
    //     contentText: req.body.contentText || "",
    //   };

    //   const path = "./uploads/contentImages/";

    //   // Process main image
    //   const optionalObj1 = {
    //     fileName: req.body.fileName || "",
    //     type: mainImg.split(";")[0].split("/")[1],
    //   };

    //   const imageInfo1 = base64ToImage(mainImg, path, optionalObj1);
    //   const filePath1 = `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/contentImages/${imageInfo1.fileName}`;
    //   contentpages["contentMainImg"] = filePath1;
    //   console.log("Image 1:", filePath1);

    //   // Process sub image
    //   const optionalObj2 = {
    //     fileName: req.body.fileName2 || "",
    //     type: subImg.split(";")[0].split("/")[1],
    //   };

    //   const imageInfo2 = base64ToImage(subImg, path, optionalObj2);
    //   const filePath2 = `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/contentImages/${imageInfo2.fileName}`;
    //   contentpages["contentSubImg"] = filePath2;
    //   console.log("Image 2:", filePath2);

    //   if (Object.keys(contentpages).length > 2) {
    //     const updateProduct = await knex("contentpages")
    //       .update(contentpages)
    //       .where({ id: req.body.id });

    //     return res.status(200).json({
    //       status: 200,
    //       data: updateProduct, // Return the newly inserted data
    //       message: "Content page uploaded successfully",
    //     });
    //   } else {
    //     return res.status(400).json({
    //       status: 400,
    //       data: [],
    //       message: "Please fill all the required fields and upload both images",
    //     });
    //   }
    // } else {
    //   return res.status(400).json({
    //     status: 400,
    //     data: [],
    //     message: "Id Not Found",
    //   });
    // }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

//T1 for testing
// module.exports.updateContent = async (req, res) => {
//   try {
//     const { contentHeader, contentText } = req.body;
//     const { contentMainImg, contentSubImg } = req.files;
//     const id = req.body.id;
//     const checkId = await knex("contentpages").where({ id });

//     if (!checkId[0]) {
//       return res.status(400).json({ message: "Id Not Found" });
//     }

//     const record = {
//       contentHeader: contentHeader,
//       contentText: contentText,
//     };

//     if (contentMainImg) {
//       record.contentMainImg = `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/contentImages/${contentMainImg[0].filename}`;
//     }

//     if (contentSubImg) {
//       record.contentSubImg = `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/contentImages/${contentSubImg[0].filename}`;
//     }

//     const updateResult = await knex("contentpages")
//       .update(record)
//       .where({ id });

//     if (updateResult) {
//       res.status(200).json({
//         status: "success",
//         message: "Content Pages Updated successfully",
//         Data: record,
//       });
//     } else {
//       res.status(404).json({
//         status: "error",
//         message: "Content Pages Not Updated",
//         Data: record,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };

//update content card(main code)
//image frontend side to fix any url
module.exports.contentCard = async (req, res) => {
  try {
    const contentCardHeading = req.body.contentCardHeading;
    const contentCardText = req.body.contentCardText;
    const id = req.body.id;

    const checkId = await knex("contentpages").where({ id: id });

    const LastImage = checkId[0].contentCards;
    console.log(LastImage, "ddddddddddd");
    // console.log(contectImageUrls);
    if (checkId[0]) {
      const images = req.file;
      console.log(images, "images1");

      if (images) {
        console.log("gg");
        const image = images[0]; // Assuming you're only processing the first image
        const contectCardImageUrl = `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/contentCardImages/${images.filename}`;

        const contentCardData = {
          contentCardHeading: contentCardHeading,
          contentCardText: contentCardText,
          contectImage: contectCardImageUrl,
        };
        const contentCardArray = [contentCardData]; // Create an array to store the data

        await knex("contentpages")
          .update({ contentCards: JSON.stringify(contentCardArray) })
          .where({ id: req.body.id });

        res.status(200).json({
          status: "success",
          message: "content card updated successfully",
          contentCard: contentCardArray,
        });
      } else {
        const contentCardData = {
          contentCardHeading: contentCardHeading,
          contentCardText: contentCardText,
        };
        const contentCardArray = [contentCardData]; // Create an array to store the data

        await knex("contentpages")
          .update({ contentCards: JSON.stringify(contentCardArray) })
          .where({ id: req.body.id });

        res.status(200).json({
          status: "success",
          message: "content card updated successfully",
          contentCard: contentCardArray,
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

//delete content page
module.exports.deleteContentCard = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteContentCard = await knex("contentpages").delete().where({ id });

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
    const getSingleContent = await knex("contentPages")
      .select(
        "contentMainImg",
        "contentSubImg",
        "contentHeader",
        "contentText",
        "contentCards"
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
    const totalCountQuery = knex("contentpages").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getContentQuery = knex("contentpages")
      .select(
        "contentMainImg",
        "contentSubImg",
        "contentHeader",
        "contentText",
        "contentCards"
      )
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const getContent = await getContentQuery;

    if (getContent) {
      res.json({
        status: 200,
        data: getContent,
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

//Section 3 : Big Product content Card Api
//update Product content
module.exports.updateProductContentCard = async (req, res) => {
  try {
    const id = req.body.id;
    const checkId = await knex("contentpages").where({ id: id });

    if (checkId[0]) {
      const ProductContentPages = {
        productContentMainHeading: req.body.productContentMainHeading || "",
        productContentSubHeading: req.body.productContentSubHeading || "",
        productContentText: req.body.productContentText || "",
      };

      if (ProductContentPages) {
        // Check if both images and other data are present
        const updateProductContentPage = await knex("contentpages")
          .update(ProductContentPages)
          .where({ id: req.body.id });

        return res.status(200).json({
          status: 200,
          data: ProductContentPages, // Return the newly inserted data
          message: "Content page updated successfully",
        });
      } else {
        return res.status(400).json({
          status: 400,
          data: [],
          message: "Please fill all the required fields and upload both images",
        });
      }
    } else {
      res.status(400).json({
        message: "Id Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

//update Big(Big Images) Product content card Api
module.exports.updateBigProductContentCard = async (req, res) => {
  try {
    const productContentHeading = req.body.productContentSubHeading;
    const productContentText = req.body.productContentText;
    const id = req.body.id;
    const checkId = await knex("contentpages").where({ id: id });

    // const LastImage = checkId[0].contentCards;
    // console.log(LastImage, "ddddddddddd");
    // console.log(contectImageUrls);

    const images = req.files;
    const imageUrls = [];
    console.log(images, "images1");
    if (checkId[0]) {
      if (images && images.length > 0) {
        const image = images[0]; // Assuming you're only processing the first image
        productContentImageUrl = `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/smallProductContentCardImges/${image.filename}`;

        const bigProductContentData = {
          productContentHeading,
          productContentText,
          productContentImage: productContentImageUrl,
        };
        const bigProductContentDataArray = [bigProductContentData]; // Create an array to store the data

        // Insert the slider data into the database
        await knex("contentpages")
          .update({
            bigProductContentCard: JSON.stringify(bigProductContentDataArray),
          })
          .where({ id: req.body.id });

        res.status(200).json({
          status: "success",
          message: "Product Content Card updated successfully",
          contentCard: bigProductContentDataArray,
        });
      } else {
        res.status(400).json({
          message: "Product Content Card not updated",
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

//get single slider
module.exports.getSingleBigProductContentCard = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleBigProductContentCard = await knex("contentPages")
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
    const totalCountQuery = knex("contentpages").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getBigProductContentCardQuery = knex("contentpages")
      .select(
        "contentMainImg",
        "contentSubImg",
        "contentHeader",
        "contentText",
        "contentCards"
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
    const deleteBigProductContentCard = await knex("contentpages")
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
//Create small Product Content data
module.exports.updateSmallProductContentDetails = async (req, res) => {
  try {
    const id = req.body.id;
    const checkId = await knex("contentpages").where({ id: id });
    const smallProductContentPages = {
      smallProductContentMainHeading:
        req.body.smallProductContentMainHeading || "",
    };
    if (checkId[0]) {
      if (smallProductContentPages) {
        const updateSmallProductContentPage = await knex("contentpages")
          .update(smallProductContentPages)
          .where({ id: req.body.id });

        const showSmallProductContentPage = await knex("contentpages").select(
          "smallProductContentMainHeading"
        );

        console.log(updateSmallProductContentPage, "1111");

        return res.status(200).json({
          status: 200,
          message: "Small Product Content Page updated successfully",
          data: showSmallProductContentPage, // Return the newly inserted data
        });
      } else {
        return res.status(400).json({
          status: 400,
          data: [],
          message: "Small Product Content Page not updated",
        });
      }
    } else {
      res.status(400).json({
        message: "Id Not Found",
      });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

//create smallProductContentCard Api
module.exports.updateSmallProductcontentCard = async (req, res) => {
  try {
    const id = req.body.id;
    const checkId = await knex("contentpages").where({ id: id });
    const productContentName = req.body.productContentName;
    const images = req.files;
    const imageUrls = [];
    console.log(images, "images1");

    if (checkId[0]) {
      if (images && images.length > 0) {
        const image = images[0]; // Assuming you're only processing the first image
        smallProductContentCardImageUrl = `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/smallProductContentCardImges/${image.filename}`;

        const smallProductContentData = {
          productContentName,
          smallProductContentImage: smallProductContentCardImageUrl,
        };
        const smallProductContentDataArray = [smallProductContentData]; // Create an array to store the data

        // Insert the slider data into the database
        await knex("contentpages")
          .update({
            smallProductContentCard: JSON.stringify(
              smallProductContentDataArray
            ),
          })
          .where({ id: req.body.id });

        res.status(200).json({
          status: "success",
          message: "small Product Content Card updated successfully",
          ProductContentCards: smallProductContentDataArray,
        });
      } else {
        res.status(400).json({
          message: "small Product Content Card not updated",
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

//get single slider
module.exports.getSingleSmallProductContentCard = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleSmallProductcontentCard = await knex("contentPages")
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
    const totalCountQuery = knex("contentpages").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getAllSmallProductContentCardQuery = knex("contentpages")
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

//Delete  Small Product ContentCard
module.exports.deleteSmallProductContentCard = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteSmallProductContentCard = await knex("contentpages")
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
module.exports.createQaContent = async (req, res) => {
  try {
    const {
      qaContentCounter,
      qaContentCounterText,
      qaContentMainHeader,
      qaContentSubHeader,
      userQuetion,
      userAnswer,
      userQA,
    } = req.body;

    const { qaContentMainImg, qaContentlogo } = req.files;

    let record = {
      qaContentCounter: qaContentCounter,
      qaContentCounterText: qaContentCounterText,
      qaContentMainHeader: qaContentMainHeader,
      qaContentSubHeader: qaContentSubHeader,
      userQA: userQA,
    };

    if (qaContentMainImg) {
      record.qaContentMainImg = `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/contentImages/${qaContentMainImg[0].filename}`;
    }

    if (qaContentlogo) {
      record.qaContentlogo = `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/qaContentlogo/${qaContentlogo[0].filename}`;
    }

    const insertedRecord = await knex("contentpages").insert(record);

    res.status(200).json({
      status: "success",
      message: "qaContent Pages created successfully",
      Data: record,
      // QA: qaContentArray, // Sending back the inserted QA card
    });
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
      userQA,
    } = req.body;

    const { qaContentMainImg, qaContentlogo } = req.files;

    const existingRecord = await knex("contentpages").where({ id }).first();

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
      userQA: userQA,
    };

    if (qaContentMainImg) {
      record.qaContentMainImg = `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/contentImages/${qaContentMainImg[0].filename}`;
    }

    if (qaContentlogo) {
      record.qaContentlogo = `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/qaContentlogo/${qaContentlogo[0].filename}`;
    }

    await knex("contentpages").where({ id }).update(record);

    res.status(200).json({
      status: "success",
      message: "qaContent Page updated successfully",
      Data: record,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json(err);
  }
};

//Delete QA ContentPage
module.exports.deleteQaContent = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteQAContentPage = await knex("contentpages")
      .delete()
      .where({ id });

    if (deleteQAContentPage) {
      res.json({
        status: 200,
        message: "QA ContentPage Deleted Successfully",
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

//Get single QA Content Page
module.exports.getSingleQaContentCard = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleQaContentCard = await knex("contentPages")
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
    const totalCountQuery = knex("contentpages").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getAllQaContentCardQuery = knex("contentpages")
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
