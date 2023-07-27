const jwt = require("jsonwebtoken");
class auth {
  authenticateToken(req, res, next) {
    const secretKey = "organicFarm";
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) {
      return res.sendStatus(401); // Unauthorized
    }

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Forbidden
      }
      req.user = user;
      next();
    });
  }
}
module.exports = new auth();
