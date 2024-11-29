const mongoose = require("mongoose");
const schema = mongoose.Schema;

const Menu = new schema({
  Menucollection: [
    {
      name: { type: String, required: true },
      SubCollection: [
        {
          name: { type: String, required: true },
          options: [{ type: String }],
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Menu", Menu);
