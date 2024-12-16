const mongoose = require("mongoose");

const schema = mongoose.Schema;
const order = new schema({
  id: {
    type: String,
    default: null,
  },
  number: { type: String, required: true }, // Số điện thoại
  city: { type: String, required: true }, // Thành phố
  address: { type: String, required: true }, // Địa chỉ cụ thể
  ship: { type: String, required: true }, // Phương thức giao hàng
  methodPay: { type: String, required: true }, // Phương thức thanh toán
  product: { type: Array, required: true }, // Danh sách sản phẩm
});

module.exports = mongoose.model("order", order);
