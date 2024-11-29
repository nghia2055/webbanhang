const newProduct = require("../model/product");

const product = async (req, res) => {
  if (req.files) {
    var productImages = req.files.map((item) => ({
      filename: item.fieldname,
      mimetype: item.mimetype,
      data: item.buffer,
    }));
  }

  const { productName, price, description, category } = req.body;

  const addProduct = new newProduct({
    productName,
    price,
    category,
    size: JSON.parse(req.body.size),
    description,
    productImages,
  });
  try {
    await addProduct.save();
    res.json({ message: " successfully!" });
  } catch (error) {
    res.json({ message: error });
  }
};

module.exports = { product };
