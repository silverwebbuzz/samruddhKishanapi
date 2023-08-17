const knex = require("knex")(require("../../helper/db"));
var worldMapData = require("city-state-country");
const base64ToImage = require("base64-to-image");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");

module.exports.createProduct = async (req, res) => {
  try {
    const { productName, productDescription } = req.body;

    const { productImage, brandLogo } = req.files;
    console.log("dd");
    if (!productImage) {
      console.log("aaa");
      const record = {
        productName: productName,
        // venderId: venderId,
        productDescription: productDescription,
        brandLogo: `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${
          brandLogo[0].filename || ""
        }`,
      };
      console.log("dd", record);
      await knex("smk_product").insert(record);
      console.log("dd");
      res.status(200).json({
        status: "success",
        message: "Images uploaded successfully",
        sliderData: record,
      });
    } else if (!brandLogo) {
      const record = {
        productName: productName,
        // venderId: venderId,
        productDescription: productDescription,
        productImage: `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${productImage[0].filename}`,
      };
      await knex("smk_product").insert(record);
      res.status(200).json({
        status: "success",
        message: "Images uploaded successfully",
        sliderData: record,
      });
    } else {
      const record = {
        productName: productName,
        // venderId: venderId,
        productDescription: productDescription,
        productImage: `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${productImage[0].filename}`,
        brandLogo: `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${
          brandLogo[0].filename || ""
        }`,
      };
      console.log("dd", record);
      await knex("smk_product").insert(record);
      console.log("dd");
      res.status(200).json({
        status: "success",
        message: "Images uploaded successfully",
        sliderData: record,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
  // const record = {
  //   productName: productName,
  //   venderId: venderId,
  //   productDescription: productDescription,
  //   productImage: `http://192.168.1.28:4001/samruddhKishan/contentPage/upload/contentImages/${
  //     productImage[0].filename || ""
  //   }`, // Assuming "path" is where multer stores the file
  //   brandLogo: `http://192.168.1.28:4001/samruddhKishan/contentPage/upload/contentImages/${brandLogo[0].filename}`,
  // };
  // const productName = req.body.productName;

  // const venderId = req.body.venderId;
  // const productDescription = req.body.productDescription;

  // const productImage = req.files;
  // console.log(productImage);
  // const brandLogo = req.files;
  // const imageUrls = [];

  // let productImage = req.body.productImage;
  // let brandLogo = req.body.brandLogo;
  // if (images && images.length > 0) {
  // for (const image of images) {
  //   const imageUrl = `http://192.168.1.28:4001/samruddhKishan/contentPage/upload/sliderImage/${image.filename}`;
  //   imageUrls.push(imageUrl);
  //   console.log(imageUrl, "image2");
  // }
  // const image = images[0]; // Assuming you're only processing the first image
  // productImage = `http://192.168.1.28:4001/samruddhKishan/contentPage/upload/contentImages/${productImage.filename}`;
  // brandLogo = `http://192.168.1.28:4001/samruddhKishan/contentPage/upload/contentImages/${brandLogo.filename}`;
  // console.log(brandLogo);
  // // Create an array to store the data

  // // Insert the slider data into the database
  // const dataArray = {
  //   // sliderImages: JSON.stringify(dataArray),
  //   productName: productName,
  //   venderId: venderId,
  //   productDescription: productDescription,
  //   productImage: productImage,
  //   brandLogo: brandLogo,
  // };
  // console.log(dataArray);

  // try {
  //   var product = {
  //     productName: req.body.productName,
  //     venderId: req.body.venderId,
  //     productDescription: req.body.productDescription,

  //     // productImage: req.body.productImage,
  //   };
  //   const base64Str = req.body.productImage;
  //   const path = "./uploads/productImage/";
  //   const optionalObj = {
  //     fileName: req.body.filename || "",
  //     type: base64Str.split(";")[0].split("/")[1],
  //   };
  //   const imageInfo = base64ToImage(base64Str, path, optionalObj);
  //   const filePath = `http://192.168.1.218:4001/product/uploads/productImage/${imageInfo.fileName}`;
  //   product["productImage"] = filePath;

  //   const base64StrLogo = req.body.brandLogo;
  //   const pathLogo = "./uploads/productImage/";
  //   const optionalObjLogo = {
  //     fileName: req.body.filename || "",
  //     type: base64StrLogo.split(";")[0].split("/")[1],
  //   };
  //   const imageInfoLogo = base64ToImage(
  //     base64StrLogo,
  //     pathLogo,
  //     optionalObjLogo
  //   );
  //   const filePathLogo = `http://192.168.1.29:3005/product/uploads/productImage/${imageInfoLogo.fileName}`;
  //   product["brandLogo"] = filePathLogo;

  //   if (product) {
  //     // const data = {
  //     //   product,
  //     //   productImage: filePath,
  //     //   filename: req.body.filename,
  //     // };
  //     await knex("smk_product").insert(product);
  //     res.json({
  //       status: 200,
  //       data: product,
  //       message: "product Create Successfully",
  //     });
  //   } else {
  //     res.json({ status: 404, data: [], message: "product Not Create" });
  //   }
  // } catch (err) {
  //   res.json(err);
  // }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { productName, productDescription } = req.body;
    const { productImage, brandLogo } = req.files;
    const id = req.body.id;
    const checkId = await knex("smk_product").where({ id: id });
    console.log(...checkId);
    if (checkId[0]) {
      if (!productImage) {
        console.log("aaa");
        const record = {
          productName: productName,
          // venderId: venderId,
          productDescription: productDescription,
          brandLogo: `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${
            brandLogo[0].filename || ""
          }`,
        };
        const updateProduct = await knex("smk_product")
          .update(record)
          .where({ id: req.body.id });
        res.status(200).json({
          status: "success",
          message: "Product Updated successfully",
          sliderData: record,
        });
      } else if (!brandLogo) {
        const record = {
          productName: productName,
          // venderId: venderId,
          productDescription: productDescription,
          productImage: `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${productImage[0].filename}`,
        };
        const updateProduct = await knex("smk_product")
          .update(record)
          .where({ id: req.body.id });
        res.status(200).json({
          status: "success",
          message: "Images uploaded successfully",
          sliderData: record,
        });
      } else {
        const record = {
          productName: productName,
          // venderId: venderId,
          productDescription: productDescription,
          productImage: `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${productImage[0].filename}`,
          brandLogo: `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${
            brandLogo[0].filename || ""
          }`,
        };
        const updateProduct = await knex("smk_product")
          .update(record)
          .where({ id: req.body.id });
        res.status(200).json({
          status: "success",
          message: "Images uploaded successfully",
          sliderData: record,
        });
      }
    } else {
      res.status(400).json({
        message: "Id Not Found",
      });
    }

    // const UpdateProduct = {
    //   productName: req.body.productName,
    //   venderId: req.body.venderId,
    //   productDescription: req.body.productDescription,
    // };
    // console.log(UpdateProduct);
    // const base64Str = req.body.productImage;
    // const path = "./uploads/productImage/";
    // const optionalObj = {
    //   fileName: req.body.filename || "",
    //   type: base64Str.split(";")[0].split("/")[1],
    // };
    // const imageInfo = base64ToImage(base64Str, path, optionalObj);
    // const filePath = `http://192.168.1.29:3005/product/uploads/productImage/${imageInfo.fileName}`;
    // UpdateProduct["productImage"] = filePath;

    // const base64StrLogo = req.body.brandLogo;
    // const pathLogo = "./uploads/productImage/";
    // const optionalObjLogo = {
    //   fileName: req.body.filename || "",
    //   type: base64StrLogo.split(";")[0].split("/")[1],
    // };
    // const imageInfoLogo = base64ToImage(
    //   base64StrLogo,
    //   pathLogo,
    //   optionalObjLogo
    // );
    // const filePathLogo = `http://192.168.1.29:3005/product/uploads/productImage/${imageInfoLogo.fileName}`;
    // UpdateProduct["brandLogo"] = filePathLogo;
    // const updateProduct = await knex("smk_product")
    //   .update(UpdateProduct)
    //   .where({ id: req.body.id });

    // if (updateProduct) {
    //   res.json({
    //     status: 200,
    //     data: UpdateProduct,
    //     message: "Product Updated Successfully",
    //   });
    // } else {
    //   res.json({ status: 404, data: [], message: "Product Not Updated" });
    // }
  } catch (err) {
    res.send(err);
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const deleteProduct = await knex("smk_product").delete().where({ id });
    console.log(deleteProduct);
    if (deleteProduct) {
      res.json({
        status: 200,
        data: deleteProduct,
        message: "Product Deleted Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Product Not Deleted" });
    }
  } catch (err) {
    res.send(err);
  }
};

module.exports.singleProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const getSingleProduct = await knex("smk_product")
      .select("*")
      .where({ id });
    console.log(getSingleProduct);
    if (getSingleProduct.length > 0) {
      res.json({
        status: 200,
        data: getSingleProduct,
        message: "Product Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Product Not Get" });
    }
  } catch (err) {
    res.send(err);
  }
};

// // module.exports.GetAllFarmer = async (req, res) => {
// //   try {
// //     const id = req.body.id;

// //     const getFarmer = await knex("farmer").select("*");
// //     console.log(getFarmer);
// //     if (getFarmer) {
// //       res.json({
// //         status: 200,
// //         data: getFarmer,
// //         message: "Farmer Get Successfully",
// //       });
// //     } else {
// //       res.json({ status: 404, data: [], message: "Farmer Not Get" });
// //     }
// //   } catch (err) {
// //     res.send(err);
// //   }
// // };
// // module.exports.GetAllFarmer = async (req, res) => {
// //   try {
// //     const adminId = req.body.adminId;
// //     const page = req.body.page || 1; // Default to page 1 if not provided
// //     const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided

// //     const getFarmer = await knex("farmer")
// //       .select("*")
// //       .where({ adminId })
// //       .limit(pageSize)
// //       .offset((page - 1) * pageSize);
// //     console.log(getFarmer);

// //     // const totalCount = await knex(getFarmer).count("* as total").first();
// //     // const totalItems = parseInt(totalCount.total);
// //     // const getFarmer = await knex("farmer")
// //     //   .select("*")
// //     //   .limit(pageSize)
// //     //   .offset((page - 1) * pageSize);

// //     if (getFarmer) {
// //       res.json({
// //         status: 200,
// //         data: getFarmer,
// //         currentPage: page,
// //         pageSize: pageSize,
// //         message: "Farmer Get Successfully",
// //       });
// //     } else {
// //       res.json({ status: 404, data: [], message: "Farmer Not Get" });
// //     }
// //   } catch (err) {
// //     res.send(err);
// //   }
// // };

module.exports.GetAllProduct = async (req, res) => {
  try {
    // const userId = req.body.userId;
    const page = req.body.page || 1; // Default to page 1 if not provided
    const pageSize = req.body.pageSize || 10; // Default page size of 10 if not provided

    const totalCountQuery = knex("smk_product").count("* as total");
    const totalCountResult = await totalCountQuery.first();
    const totalItems = parseInt(totalCountResult.total);

    const getFarmerQuery = knex("smk_product")
      .select("*")
      .orderBy("createdAt", "desc")
      .limit(pageSize)
      .offset((page - 1) * pageSize);
    const getCategory = await getFarmerQuery;

    if (getCategory) {
      res.json({
        status: 200,
        data: getCategory,
        currentPage: page,
        pageSize: pageSize,
        totalItems: totalItems,
        message: "Product Get Successfully",
      });
    } else {
      res.json({ status: 404, data: [], message: "Product Not Get" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).send({ status: 404, message: "Something Went Wrong !" });
  }
};
