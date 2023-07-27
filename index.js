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
// app.use(express.static(__dirname + '/imageFolder'));
app.use("/admin", route);
app.use("/farmer", farmerRoute);
app.use("/user", userRoute);
app.use("/role", roleRoute);
app.use("/categories", categoriesRoute);
app.use("/product", productRoute);
app.use("/permission", permissionRoute);

app.get("/", (req, res) => {
  res.send("app working");
});

// socket.init(server);

// server.listen(config.port, (err) => {
//   if (err) throw err;
//   console.log("Server Up And Working");
// });

app.listen(config.port, "192.168.1.29", function () {
  console.log("Server running at http://192.168.1.13:5001/");
});
