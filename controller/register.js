const registerUser = require("../model/register");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  console.log(req.body);
  try {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(req.body.password, salt);

    // create new user
    const newUser = new registerUser({
      user: req.body.user,
      email: req.body.email,
      password: hashed,
    });

    const user = await newUser.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    if (err.keyValue.email) {
      // Kiểm tra lỗi trùng lặp
      return res.status(400).json("Email đã tồn tại");
    }
    res.status(400).json("Người dùng đã tồn tại");
  }
};

module.exports = { register };
