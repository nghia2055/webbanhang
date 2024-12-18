const product = require("../../model/product");

const Search = async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await product.find({
      productName: { $regex: req.params.id.trim(), $options: "i" },
    });
    res.status(200).json(data);
  } catch {
    res.status(403).json({ message: " lỗi" });
  }
};

module.exports = Search;
