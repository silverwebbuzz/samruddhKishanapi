const { response } = require("express");
const knex = require("knex")(require("../../../helper/db"));

const path = require("path");
const fs = require("fs");
const { log } = require("util");
const base64ToImage = require("base64-to-image");

// Section 1: slider images
//create Slider Image api
module.exports.sliderImages = async (req, res) => {
  try {
    const sliderSubHeader = req.body.sliderSubHeader;
    const sliderMainHeaderWithColor = req.body.sliderMainHeaderWithColor;
    const sliderSubHeader2 = req.body.sliderSubHeader2;
    const sliderDescription = req.body.sliderDescription;

    const images = req.files;
    const imageUrls = [];
    console.log(images, "images1");

    if (images && images.length > 0) {
      const image = images[0]; // Assuming you're only processing the first image
      imageUrl = `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/sliderImage/${image.filename}`;

      const sliderData = {
        sliderSubHeader,
        sliderMainHeaderWithColor,
        sliderSubHeader2,
        sliderDescription,
        sliderImages: imageUrl,
      };
      const dataArray = [sliderData]; // Create an array to store the data

      // Insert the slider data into the database
      await knex("smk_sliderimages").insert({
        sliderImages: JSON.stringify(dataArray),
      });

      res.status(200).json({
        status: "success",
        message: "Images uploaded successfully",
        sliderData: dataArray,
      });
    } else {
      res.status(400).json({
        message: "No images uploaded",
      });
    }
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

    const images = req.files;
    const imageUrls = [];
    console.log(images, "images1");

    if (images && images.length > 0) {
      const image = images[0]; // Assuming you're only processing the first image
      imageUrl = `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/sliderImage/${image.filename}`;

      const sliderData = {
        sliderSubHeader,
        sliderMainHeaderWithColor,
        sliderSubHeader2,
        sliderDescription,
        sliderImages: imageUrl,
      };
      const dataArray = [sliderData]; // Create an array to store the data

      // update the slider data into the database
      const updateProduct = await knex("smk_sliderimages")
        .update({ sliderImages: JSON.stringify(dataArray) })
        .where({ id: req.body.id });

      res.status(200).json({
        status: "success",
        message: "Images uploaded successfully",
        sliderData: dataArray,
      });
    } else {
      const sliderData = {
        sliderSubHeader,
        sliderMainHeaderWithColor,
        sliderSubHeader2,
        sliderDescription,
      };
      const dataArray = [sliderData]; // Create an array to store the data

      // update the slider data into the database
      const updateProduct = await knex("smk_sliderimages")
        .update({ sliderImages: JSON.stringify(dataArray) })
        .where({ id: req.body.id });

      res.status(200).json({
        status: "success",
        message: "Images uploaded successfully",
        sliderData: dataArray,
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

//  section-2
//update content Page
module.exports.updateContent = async (req, res) => {
  try {
    const { contentHeader, contentText } = req.body;
    const { contentMainImg, contentSubImg } = req.files;
    const id = req.body.id;
    const checkId = await knex("smk_contentpages").where({ id: id });
    // console.log(...checkId);
    if (checkId[0]) {
      if (!contentMainImg) {
        console.log("aaa");
        const record = {
          contentHeader: contentHeader,
          contentText: contentText,
          contentSubImg: `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/contentImages/${
            contentSubImg[0].filename || ""
          }`,
        };
        const updateProduct = await knex("smk_contentpages")
          .update(record)
          .where({ id: req.body.id });
        res.status(200).json({
          status: "success",
          message: "Content Pages Updated successfully",
          Data: record,
        });
      } else if (!contentSubImg) {
        const record = {
          contentHeader: contentHeader,
          contentText: contentText,
          contentMainImg: `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/contentImages/${
            contentMainImg[0].filename || ""
          }`,
        };
        const updateProduct = await knex("smk_contentpages")
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
          contentMainImg: `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/contentImages/${
            contentMainImg[0].filename || ""
          }`,
          contentSubImg: `http://192.168.1.28:4001/samruddhKishan/contentPage/uploads/contentImages/${
            contentSubImg[0].filename || ""
          }`,
        };
        const updateProduct = await knex("smk_contentpages")
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

module.exports.contentCard = async (req, res) => {
  try {
    const contentCardHeading = req.body.contentCardHeading;
    const contentCardText = req.body.contentCardText;
    const id = req.body.id;

    const checkId = await knex("smk_contentpages").where({ id: id });

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

        await knex("smk_contentpages")
          .update({ contentCards: JSON.stringify(contentCardArray) })
          .where({ id: req.body.id });

        res.status(200).json({
          status: "success",
          message: "content card created successfully",
          contentCard: contentCardArray,
        });
      } else {
        const contentCardData = {
          contentCardHeading: contentCardHeading,
          contentCardText: contentCardText,
        };
        const contentCardArray = [contentCardData]; // Create an array to store the data

        await knex("smk_contentpages")
          .update({ contentCards: JSON.stringify(contentCardArray) })
          .where({ id: req.body.id });

        res.status(200).json({
          status: "success",
          message: "content card created successfully",
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
    const deleteContentCard = await knex("smk_contentpages")
      .delete()
      .where({ id });
    console.log(deleteContentCard, "deleteContent Card");

    if (deleteContentCard) {
      res.json({
        status: 200,
        data: deleteContentCard,
        message: "ContentCard Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "ContentCard Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

//Section 3 : Big Product content Card Api
//Create Product content
module.exports.ProductContentCard = async (req, res) => {
  try {
    const id = req.body.id;

    const checkId = await knex("smk_contentpages").where({ id: id });
    if (checkId[0]) {
      const ProductContentPages = {
        productContentMainHeading: req.body.productContentMainHeading || "",
        productContentSubHeading: req.body.productContentSubHeading || "",
        productContentText: req.body.productContentText || "",
      };

      if (ProductContentPages) {
        // Check if both images and other data are present
        const updateProductContentPage = await knex("smk_contentpages")
          .update(ProductContentPages)
          .where({ id: req.body.id });

        return res.status(200).json({
          status: 200,
          data: ProductContentPages, // Return the newly inserted data
          message: "Content page uploaded successfully",
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

//Create Big(Big Images) Product content card Api
module.exports.bigProductContentCard = async (req, res) => {
  try {
    const productContentHeading = req.body.productContentSubHeading;
    const productContentText = req.body.productContentText;
    const id = req.body.id;
    const checkId = await knex("smk_contentpages").where({ id: id });

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
        await knex("smk_contentpages")
          .update({
            bigProductContentCard: JSON.stringify(bigProductContentDataArray),
          })
          .where({ id: req.body.id });

        res.status(200).json({
          status: "success",
          message: "Product Content Card Created successfully",
          contentCard: bigProductContentDataArray,
        });
      } else {
        res.status(400).json({
          message: "Product Content Card not created",
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

// Section 4: small Product Content Card api
//Create small Product Content data
// Section 4: small Product Content Card api
//Create small Product Content data
module.exports.smallProductContentDetails = async (req, res) => {
  try {
    const id = req.body.id;
    const checkId = await knex("smk_contentpages").where({ id: id });
    const smallProductContentPages = {
      smallProductContentMainHeading:
        req.body.smallProductContentMainHeading || "",
    };
    if (checkId[0]) {
      if (smallProductContentPages) {
        const updateSmallProductContentPage = await knex("smk_contentpages")
          .update(smallProductContentPages)
          .where({ id: req.body.id });

        const showSmallProductContentPage = await knex(
          "smk_contentpages"
        ).select("smallProductContentMainHeading");

        console.log(updateSmallProductContentPage, "1111");

        return res.status(200).json({
          status: 200,
          message: "Small Product Content Page created successfully",
          data: showSmallProductContentPage, // Return the newly inserted data
        });
      } else {
        return res.status(400).json({
          status: 400,
          data: [],
          message: "Small Product Content Page not created",
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
module.exports.smallProductcontentCard = async (req, res) => {
  try {
    const id = req.body.id;
    const checkId = await knex("smk_contentpages").where({ id: id });
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
        await knex("smk_contentpages")
          .update({
            smallProductContentCard: JSON.stringify(
              smallProductContentDataArray
            ),
          })
          .where({ id: req.body.id });

        res.status(200).json({
          status: "success",
          message: "small Product Content Card Created successfully",
          ProductContentCards: smallProductContentDataArray,
        });
      } else {
        res.status(400).json({
          message: "small Product Content Card not created",
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
