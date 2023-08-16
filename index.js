const config = require("./helper/config");
const http = require("http");
const express = require("express");
const bodyParser = require("body-parser");

const route = require("./routes/admin/admin.route");
const farmerRoute = require("./routes/farmer/farmer.route");
const userRoute = require("./routes/user/user.route");
const roleRoute = require("./routes/role/role.route");
const categoriesRoute = require("./routes/categories/categories.route");
const productRoute = require("./routes/product/product.route");
const permissionRoute = require("./routes/permission/permission.route");
const contentPageRoute = require("./routes/contentPageRoute/contentPage.route");
const serviceRoute = require("./routes/service/service.route");
// const socket = require('./helper/socket');
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 1000000,
  })
);
app.use(cors());
// app.use(express.static(__dirname + "/uploads"));
app.use("/samruddhKishan/admin", route);
app.use("/samruddhKishan/farmer", farmerRoute);
app.use("/samruddhKishan/user", userRoute);
app.use("/samruddhKishan/role", roleRoute);
app.use("/samruddhKishan/categories", categoriesRoute);
app.use("/samruddhKishan/product", productRoute);
app.use("/samruddhKishan/permission", permissionRoute);
app.use("/samruddhKishan/contentPage", contentPageRoute);
app.use("/samruddhKishan/service", serviceRoute);
app.get("/samruddhKishan", (req, res) => {
  res.send("app working");
});

// socket.init(server);

// server.listen(config.port, (err) => {
//   if (err) throw err;
//   console.log("Server Up And Working");
// });

app.listen(config.port, function () {
  console.log("Server running at http://192.168.1.218:4001/");
});
