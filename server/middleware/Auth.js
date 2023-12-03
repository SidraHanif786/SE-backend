const jwt = require("jsonwebtoken");
const status = require("http-status");

const authorizeUser = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res
      .status(status.FORBIDDEN)
      .send({ message: "Authorization is required" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(status.FORBIDDEN)
      .send({ message: "Authorization is required" });
  }
  jwt.verify(token, process.env.SEC_KEY, (err, user) => {
    if (err) {
      return res.status(status.FORBIDDEN).send({ message: "Token is expired" });
    }
    req.user = user;
    return next();
  });
};

const onlyAdmin = (req, res, next) => {
  const user = req.user;

  if (!user || !user.isAdmin) {
    return res
      .status(status.FORBIDDEN)
      .send({ message: "You are not authorized" });
  }
  next();
};

module.exports = { authorizeUser, onlyAdmin };
