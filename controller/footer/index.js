const datafooter = require("../../model/footer");

const footer = {
  getslugfooter: async (req, res) => {
    try {
      const data = await datafooter.find();

      res.status(200).json(data);
    } catch (err) {
      res.status(403).json(err);
    }
  },

  getfooter: async (req, res) => {
    console.log(req.query);
    try {
      const data = await datafooter.findOne({ name: req.query.name });

      res.status(200).json(data);
    } catch (err) {
      res.status(404).json(err);
    }
  },
};

module.exports = { footer };
