const jwt = require("jsonwebtoken");
const keys = require("../config/keys");

access = (req, res, next) => {
  const token = req.header("user-token");

  if (token == "null") {
    res.json({ msg: "Access denied" });
  } else {
    try {
      const decode = jwt.verify(token, keys.jwtKey);
      req.user = decode;
      next();
    } catch (e) {
      res.json({ msg: "Invalid token" });
    }
  }
};

module.exports = access;
