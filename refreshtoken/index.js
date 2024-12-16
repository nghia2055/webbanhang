const jwt = require("jsonwebtoken");

const refreshToken = async (req, res, next) => {
  const cookie = req.cookies;
  if (!cookie) {
    res.status(403).json("Không có token");
  } else if (cookie) {
    try {
      const user = jwt.verify(cookie, process.env.REFRESH_JWT_SECRET);
      req.use = user;
      next();
    } catch (err) {
      res.status(403).json("Token hết hạn");
      console.log(err);
    }
  }
};

module.exports = refreshToken;
