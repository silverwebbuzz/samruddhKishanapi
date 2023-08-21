const knex = require("knex")(require("../../helper/db"));
var worldMapData = require("city-state-country");
const base64ToImage = require("base64-to-image");
const bcrypt = require("bcrypt");
const { json } = require("body-parser");

// module.exports.createProduct = async (req, res) => {
//   try {
//     const { productName, productDescription, categoryId } = req.body;

//     const { productImage, brandLogo } = req.files;
//     console.log("dd");
//     if (!productImage) {
//       console.log("aaa");
//       const record = {
//         productName: productName,
//         categoryId: categoryId,
//         productDescription: productDescription,
//         brandLogo: `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${
//           brandLogo[0].filename || ""
//         }`,
//       };
//       console.log("dd", record);
//       await knex("smk_product").insert(record);
//       console.log("dd");
//       res.status(200).json({
//         status: "success",
//         message: "Images uploaded successfully",
//         sliderData: record,
//       });
//     } else if (!brandLogo) {
//       const record = {
//         productName: productName,

//         categoryId: categoryId,
//         productDescription: productDescription,
//         productImage: `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${productImage[0].filename}`,
//       };
//       await knex("smk_product").insert(record);
//       res.status(200).json({
//         status: "success",
//         message: "Images uploaded successfully",
//         sliderData: record,
//       });
//     } else {
//       const record = {
//         productName: productName,
//         categoryId: categoryId,
//         productDescription: productDescription,
//         productImage: `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${productImage[0].filename}`,
//         brandLogo: `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${
//           brandLogo[0].filename || ""
//         }`,
//       };
//       console.log("dd", record);
//       await knex("smk_product").insert(record);
//       console.log("dd");
//       res.status(200).json({
//         status: "success",
//         message: "Images uploaded successfully",
//         sliderData: record,
//       });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({
//       message: "Something went wrong",
//     });
//   }
//   // const record = {
//   //   productName: productName,
//   //   venderId: venderId,
//   //   productDescription: productDescription,
//   //   productImage: `http://192.168.1.28:4001/samruddhKishan/contentPage/upload/contentImages/${
//   //     productImage[0].filename || ""
//   //   }`, // Assuming "path" is where multer stores the file
//   //   brandLogo: `http://192.168.1.28:4001/samruddhKishan/contentPage/upload/contentImages/${brandLogo[0].filename}`,
//   // };
//   // const productName = req.body.productName;

//   // const venderId = req.body.venderId;
//   // const productDescription = req.body.productDescription;

//   // const productImage = req.files;
//   // console.log(productImage);
//   // const brandLogo = req.files;
//   // const imageUrls = [];

//   // let productImage = req.body.productImage;
//   // let brandLogo = req.body.brandLogo;
//   // if (images && images.length > 0) {
//   // for (const image of images) {
//   //   const imageUrl = `http://192.168.1.28:4001/samruddhKishan/contentPage/upload/sliderImage/${image.filename}`;
//   //   imageUrls.push(imageUrl);
//   //   console.log(imageUrl, "image2");
//   // }
//   // const image = images[0]; // Assuming you're only processing the first image
//   // productImage = `http://192.168.1.28:4001/samruddhKishan/contentPage/upload/contentImages/${productImage.filename}`;
//   // brandLogo = `http://192.168.1.28:4001/samruddhKishan/contentPage/upload/contentImages/${brandLogo.filename}`;
//   // console.log(brandLogo);
//   // // Create an array to store the data

//   // // Insert the slider data into the database
//   // const dataArray = {
//   //   // sliderImages: JSON.stringify(dataArray),
//   //   productName: productName,
//   //   venderId: venderId,
//   //   productDescription: productDescription,
//   //   productImage: productImage,
//   //   brandLogo: brandLogo,
//   // };
//   // console.log(dataArray);

//   // try {
//   //   var product = {
//   //     productName: req.body.productName,
//   //     venderId: req.body.venderId,
//   //     productDescription: req.body.productDescription,

//   //     // productImage: req.body.productImage,
//   //   };
//   //   const base64Str = req.body.productImage;
//   //   const path = "./uploads/productImage/";
//   //   const optionalObj = {
//   //     fileName: req.body.filename || "",
//   //     type: base64Str.split(";")[0].split("/")[1],
//   //   };
//   //   const imageInfo = base64ToImage(base64Str, path, optionalObj);
//   //   const filePath = `http://192.168.1.218:4001/product/uploads/productImage/${imageInfo.fileName}`;
//   //   product["productImage"] = filePath;

//   //   const base64StrLogo = req.body.brandLogo;
//   //   const pathLogo = "./uploads/productImage/";
//   //   const optionalObjLogo = {
//   //     fileName: req.body.filename || "",
//   //     type: base64StrLogo.split(";")[0].split("/")[1],
//   //   };
//   //   const imageInfoLogo = base64ToImage(
//   //     base64StrLogo,
//   //     pathLogo,
//   //     optionalObjLogo
//   //   );
//   //   const filePathLogo = `http://192.168.1.29:3005/product/uploads/productImage/${imageInfoLogo.fileName}`;
//   //   product["brandLogo"] = filePathLogo;

//   //   if (product) {
//   //     // const data = {
//   //     //   product,
//   //     //   productImage: filePath,
//   //     //   filename: req.body.filename,
//   //     // };
//   //     await knex("smk_product").insert(product);
//   //     res.json({
//   //       status: 200,
//   //       data: product,
//   //       message: "product Create Successfully",
//   //     });
//   //   } else {
//   //     res.json({ status: 404, data: [], message: "product Not Create" });
//   //   }
//   // } catch (err) {
//   //   res.json(err);
//   // }
// };
// const isValidUrl = (urlString) => {
//   try {
//     return Boolean(new URL(urlString));
//   } catch (e) {
//     return false;
//   }
// };
// module.exports.updateProduct = async (req, res) => {
//   try {
//     const { productName, productDescription, categoryId } = req.body;
//     const { productImage, brandLogo } = req.files;
//     // const productName = req.body.productName;
//     // const productDescription = req.body.productDescription;
//     // const categoryId = req.body.categoryId;
//     // const productImage = req.files.productImage;
//     // const brandLogo = req.files.brandLogo;

//     const id = req.body.id;
//     const checkId = await knex("smk_product").where({ id: id });
//     console.log(checkId);
//     if (checkId[0]) {
//       const record = {
//         productName: productName,
//         categoryId: categoryId,
//         productDescription: productDescription,
//         productImage: `${productImage[0].filename}`,
//         brandLogo: `${brandLogo[0].filename}`,
//       };
//       console.log(record);
//       const updateProduct = await knex("smk_product")
//         .update(record)
//         .where({ id: req.body.id });
//       res.status(200).send({
//         status: "success",
//         message: "Images uploaded successfully",
//       });
//     } else {
//       res.status(400).json({
//         message: "Id Not Found",
//       });
//     }
//   } catch (err) {
//     res.send(err);
//   }
// };
module.exports.createProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      categoryId,
      productCode,
      productShort,
      specification,
      producctVideoUrl,
      availbilityStock,
      productUnits,
      productPrice,
      country,
      status,
    } = req.body;
    const { productImage, productGallaryImage } = req.files;

    const record = {
      productName: productName,
      categoryId: categoryId,
      productDescription: productDescription,
      productCode: productCode,
      productShort: productShort,
      specification: specification,
      producctVideoUrl: producctVideoUrl,
      availbilityStock: availbilityStock,
      productUnits: productUnits,
      productPrice: productPrice,
      country: country,
      status: status,
    };

    // if (brandLogo) {
    //   record.brandLogo = `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${brandLogo[0].filename}`;
    // }

    if (productImage) {
      record.productImage = `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${productImage[0].filename}`;
    }

    const uId = await knex("smk_product").insert(record);

    if (productGallaryImage) {
      const galleryImages = productGallaryImage.map(
        (image) =>
          `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${image.filename}`
      );

      const multiImages = galleryImages.map((imageUrl) => ({
        productId: uId[0],
        productGallaryImage: imageUrl,
      }));

      await knex("smk_productgallaryimage").insert(multiImages);
    }
    res.status(200).json({
      status: "success",
      message: "Product created successfully",
      productData: record,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Something went wrong",
    });
  }
};
module.exports.updateProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      categoryId,
      productCode,
      productShort,
      specification,
      producctVideoUrl,
      availbilityStock,
      productUnits,
      productPrice,
      country,
      status,
    } = req.body;
    const { productImage, productGallaryImage } = req.files;
    // const productName = req.body.productName;
    // const productDescription = req.body.productDescription;
    // const categoryId = req.body.categoryId;
    // const productImage = req.files.productImage;
    // const brandLogo = req.files.brandLogo;

    const id = req.body.id;
    const checkId = await knex("smk_product").where({ id: id });

    // console.log("ERRRRSRRSR", req?.body);
    console.log(checkId);
    if (checkId[0].id) {
      if (productImage) {
        const record = {
          productName: productName,
          categoryId: categoryId,
          productDescription: productDescription,
          productCode: productCode,
          productShort: productShort,
          specification: specification,
          producctVideoUrl: producctVideoUrl,
          availbilityStock: availbilityStock,
          productUnits: productUnits,
          productPrice: productPrice,
          country: country,
          status: status,
          productImage: `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${productImage[0].filename}`,
        };
        const updateProduct = await knex("smk_product")
          .update(record)
          .where({ id: req.body.id });

        res.status(200).send({
          status: "success",
          message: "Product Updated successfully",
        });
      } else if (productGallaryImage) {
        console.log("ddd");
        const galleryImages = productGallaryImage.map(
          (image) =>
            `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${image.filename}`
        );

        const multiImages = galleryImages.map((imageUrl) => ({
          productId: checkId[0].id,
          productGallaryImage: imageUrl,
        }));

        await knex("smk_productgallaryimage").insert(multiImages);
        res.status(200).send({
          status: "success",
          message: "Product Updated successfully",
        });
      }
      // if (productGallaryImage) {
      //   console.log("dd");
      //   const galleryImages = productGallaryImage.map(
      //     (image) =>
      //       `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${image.filename}`
      //   );

      //   const multiImages = galleryImages.map((imageUrl) => ({
      //     productGallaryImage: imageUrl,
      //   }));

      //   await knex("smk_productgallaryimage")
      //     .update(multiImages[0])
      //     .where({ id: req.body.pid });
      //   res.status(200).send({
      //     status: "success",
      //     message: "Product Updated successfully",
      //   });
      // }
      // else if (productImage) {
      //   console.log("3");
      //   const record = {
      //     productName: productName,
      //     categoryId: categoryId,
      //     productDescription: productDescription,
      //     productImage: `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${productImage[0].filename}`,
      //   };
      //   const updateProduct = await knex("smk_product")
      //     .update(record)
      //     .where({ id: req.body.id });
      //   res.status(200).send({
      //     status: "success",
      //     message: "Images uploaded successfully",
      //   });
      // }
      else {
        console.log("dd");
        const record = {
          productName: productName,
          categoryId: categoryId,
          productDescription: productDescription,
          productCode: productCode,
          productShort: productShort,
          specification: specification,
          producctVideoUrl: producctVideoUrl,
          availbilityStock: availbilityStock,
          productUnits: productUnits,
          productPrice: productPrice,
          country: country,
          status: status,
          // productImage: `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${productImage[0].filename}`,
          // brandLogo: `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${brandLogo[0].filename}`,
        };
        console.log(record);
        const updateProduct = await knex("smk_product")
          .update(record)
          .where({ id: req.body.id });
        res.status(200).send({
          status: "success",
          message: "Product Updated successfully",
        });
      }
    } else {
      res.status(400).json({
        message: "Id Not Found",
      });
    }
    // if (checkId[0]) {
    //   const record = {
    //     productName: productName,
    //     categoryId: categoryId,
    //     productDescription: productDescription,
    //     productImage: `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${productImage[0].filename}`,
    //     brandLogo: `http://192.168.1.218:4001/samruddhKishan/product/uploads/productImage/${brandLogo[0].filename}`,
    //   };
    //   console.log(record);
    //   const updateProduct = await knex("smk_product")
    //     .update(record)
    //     .where({ id: req.body.id });
    //   res.status(200).send({
    //     status: "success",
    //     message: "Images uploaded successfully",
    //   });
    // } else {
    //   res.status(400).json({
    //     message: "Id Not Found",
    //   });
    // }
  } catch (err) {
    console.log("sds");
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

// module.exports.deleteProductGallary = async (req, res) => {
//   try {
//     const id = req.body.id;
//     const deleteProduct = await knex("smk_productgallaryimage")
//       .delete()
//       .where({ id });
//     console.log(deleteProduct);
//     if (deleteProduct) {
//       res.json({
//         status: 200,
//         data: deleteProduct,
//         message: "ProductGallaryImage Deleted Successfully",
//       });
//     } else {
//       res.json({ status: 404, data: [], message: "Product Not Deleted" });
//     }
//   } catch (err) {
//     res.send(err);
//   }
// };
module.exports.deleteProductGallary = async (req, res) => {
  try {
    const ids = req.body.ids; // Assuming the request body contains an array of IDs
    const deleteProduct = await knex("smk_productgallaryimage")
      .whereIn("id", ids)
      .delete();

    if (deleteProduct) {
      res.json({
        status: 200,
        data: deleteProduct,
        message: "ProductGallaryImage Deleted Successfully",
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
    const array = [];
    const getImage = await knex("smk_productgallaryimage")
      .select("*")
      .where({ productId: id });

    console.log(
      getImage.map((e) => {
        array.push({ image: e.productGallaryImage, id: e.id });
        console.log(e.productGallaryImage);
      })
    );
    console.log(array, "array");
    console.log(getSingleProduct);

    const data = {
      ...getSingleProduct[0],
      productGallaryImage: [...array],
    };
    if (getSingleProduct.length > 0) {
      res.json({
        status: 200,
        data: data,
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
