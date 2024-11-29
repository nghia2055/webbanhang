const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Tạo schema cho một người dùng
const productSchema = new Schema(
  {
    productName: {
      type: String,
      require: true,
    },
    price: {
      type: Number,
      require: true,
    },
    size: {
      type: [String],
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    productImages: [
      {
        filename: String,
        mimetype: String,
        data: Buffer,
      },
    ],
  },
  { timestamps: true }
);

// Tạo model từ schema

module.exports = mongoose.model("products", productSchema);
