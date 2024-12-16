const orderModel = require("../../model/order");
const jwt = require("jsonwebtoken");

const order = async (req, res) => {
  const { number, city, address, ship, methodPay, product } = req.body;
  let userId = null; // Mặc định _id là null

  // Kiểm tra xem có accessToken không
  if (req.cookies.accessToken) {
    try {
      // Giải mã accessToken
      const decoded = jwt.verify(
        req.cookies.accessToken,
        process.env.JWT_SECRET
      );
      userId = decoded._id; // Nếu có accessToken hợp lệ, lấy _id từ token
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        console.error("accessToken đã hết hạn");

        // Nếu accessToken hết hạn, kiểm tra refreshToken
        if (req.cookies.refresh_Token) {
          try {
            // Giải mã refreshToken
            const decodedRefreshToken = jwt.verify(
              req.cookies.refresh_Token,
              process.env.REFRESH_JWT_SECRET
            );
            userId = decodedRefreshToken._id; // Lấy _id từ refreshToken
          } catch (err) {
            // Nếu có lỗi khi giải mã refreshToken, bỏ qua và không làm gián đoạn chương trình
            // Không làm gián đoạn chương trình, vẫn cho phép đặt hàng với _id là null
          }
        }
      }
    }
  }

  // Tạo và lưu đơn hàng, nếu có userId thì gán, nếu không thì để null
  const orderData = {
    _id: userId, // Nếu có userId, thì gán _id, nếu không thì là null
    number,
    city,
    address,
    ship,
    methodPay,
    product,
  };

  try {
    // Tạo và lưu đơn hàng
    const order = new orderModel(orderData);
    await order.save();

    // Gửi phản hồi thành công sau khi lưu đơn hàng
    res.status(200).json({ message: "Bạn đã đặt hàng thành công" });
  } catch (error) {
    console.error("Lỗi khi lưu đơn hàng:", error);
    // Gửi phản hồi lỗi nếu có lỗi khi lưu đơn hàng
    res.status(500).json({ message: "Đã xảy ra lỗi khi đặt hàng" });
  }
};

module.exports = order;
