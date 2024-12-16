const mongoose = require("mongoose");

const schema = mongoose.Schema;

const footer = new schema({
  name: {
    type: String,
    require,
  },
  content: {
    type: Object,
    require,
  },
});

module.exports = mongoose.model("footer", footer);
