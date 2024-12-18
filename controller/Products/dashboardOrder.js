const order = require("../../model/order");
const jwt = require("jsonwebtoken");

const dashboardOrder = async (req, res) => {
  const accesstoken = req.headers.authorization.split(" ")[1];
  const refreshtoken = req.headers.refreshtoken;

  try {
    if (accesstoken) {
      const data = jwt.verify(accesstoken, process.env.JWT_SECRET);
      const orderbyID = await order.find({ id: data.id });

      return res.status(200).json(orderbyID);
    }
    throw new Error("No access token");
  } catch (err) {
    if (refreshtoken) {
      try {
        const data = jwt.verify(refreshtoken, process.env.REFRESH_JWT_SECRET);
        const orderbyID = await order.find({ id: data.id });
        return res.status(200).json(orderbyID);
      } catch {
        return res
          .status(403)
          .json({ message: "Refresh token không hợp lệ hoặc hết hạn" });
      }
    }
  }
  return res
    .status(403)
    .json({ message: "Không có access token hoặc refresh token" });
};

module.exports = dashboardOrder;
