const mongoose = require("mongoose");

const chema = mongoose.Schema;

const notification = new chema({
  email: {
    type: String,
    require,
    unique: true,
  },
});
module.exports = mongoose.model("notification", notification);
