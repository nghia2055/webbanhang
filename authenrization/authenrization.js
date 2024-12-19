const jwt = require("jsonwebtoken");

const Authenrization = async (req, res, next) => {
  const TokenCookie = req.cookies.accessToken;
  const RefreshCookie = req.cookies.refresh_Token;

  // Kiểm tra Token Cookie
  if (TokenCookie) {
    try {
      // Xác minh access token
      const decoded = jwt.verify(TokenCookie, process.env.JWT_SECRET);

      // Kiểm tra quyền admin
      if (!decoded.admin) {
        return res.status(403).json({ message: "Bạn không phải là admin" });
      }

      req.user = decoded; // Lưu thông tin user vào req
      return next(); // Token hợp lệ, tiếp tục xử lý
    } catch (err) {
      if (RefreshCookie) {
        try {
          // Xác minh refresh token
          const decoded = jwt.verify(
            RefreshCookie,
            process.env.REFRESH_JWT_SECRET
          );

          // Kiểm tra quyền admin từ refresh token
          if (!decoded.admin) {
            return res.status(403).json({ message: "Bạn không phải là admin" });
          }

          // Tạo access token mới từ refresh token
          const newAccessToken = jwt.sign(
            { id: decoded.id, admin: decoded.admin },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
          );

          // Gửi lại access token mới qua cookie
          res.cookie("accessToken", newAccessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "Strict",
          });

          req.user = decoded; // Lưu thông tin user vào req
          return next(); // Tiếp tục xử lý
        } catch (err) {
          return res
            .status(403)
            .json({ message: "Refresh token không hợp lệ!" });
        }
      }
    }
  }

  // Nếu access token không hợp lệ hoặc không có, kiểm tra Refresh Token

  // Nếu không có token nào hợp lệ
  return res
    .status(401)
    .json({ message: "Token không được cung cấp hoặc không hợp lệ!" });
};

module.exports = Authenrization;
