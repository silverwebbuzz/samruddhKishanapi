const config = require("./config");
const jwt = require("jsonwebtoken");

const routeMiddleWares = (req, res, next) => {
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const token = bearerHeader.split(" ")[1];
    return jwt.verify(token, config.secret_key, (err, userData) => {
      if (err) {
        res
          .status(403)
          .json({ success: false, message: "User is not authenticated" });
      } else {
        req.user = userData;
        next();
      }
    });
  } else {
    res.status(401).json({ success: false, message: "token missing" });
  }
};

module.exports = { routeMiddleWares };
