const notificationModel = require("../../model/notification");

const notification = async (req, res) => {
  try {
    const data = new notificationModel({
      email: req.body.email,
    });
    await data.save();
    res.status(200).json({ message: "Bạn đã đăng kí thành công" });
  } catch (err) {
    res.status(403).json({ message: "Bạn đã đăng kí thất bại" });
  }
};

module.exports = notification;
