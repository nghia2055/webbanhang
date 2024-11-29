const menuCollection = require("../model/menu");

const Menu = {
  addCollection: async (req, res) => {
    const result = await menuCollection.findOne();

    if (result) {
      console.log("nhảy vào 0");
      // Tìm xem có phần tử nào trong Menucollection có name trùng với req.body.menuCollection không
      const existingMenu = await menuCollection.findOne({
        "Menucollection.name": req.body.menuCollection,
      });

      const existingSubCollection = await menuCollection.findOne({
        "Menucollection.SubCollection.name": req.body.SubCollection,
      });
      const existingOptionSubCollection = await menuCollection.findOne({
        "Menucollection.SubCollection.options": req.body.OptionSubCollection,
      });

      if (existingMenu) {
        console.log("nhảy vào 1 - Trùng cái thứ 1");
        // Nếu có, thêm SubCollection vào đúng phần tử Menucollection có name trùng
        if (existingSubCollection) {
          console.log("nhảy vào 2 - trùng cái thứ 2");

          if (existingOptionSubCollection) {
            console.log("trùng cái thứ 3");
            res.json("Trùng Option!");

            return;
          } else {
            console.log("khác cái thứ 3", req.body.SubCollection);
            const document = await menuCollection.findOne({
              "Menucollection.name": req.body.menuCollection,
              "Menucollection.SubCollection.name": req.body.SubCollection,
            });

            if (!document) {
              throw new Error("Không tìm thấy dữ liệu phù hợp!");
            }

            // Tìm chỉ số của Menucollection
            const menuIndex = document.Menucollection.findIndex(
              (item) => item.name === req.body.menuCollection
            );

            // Tìm chỉ số của SubCollection bên trong Menucollection
            const subIndex = document.Menucollection[
              menuIndex
            ].SubCollection.findIndex(
              (subItem) => subItem.name === req.body.SubCollection
            );

            if (menuIndex === -1 || subIndex === -1) {
              throw new Error(
                "Không tìm thấy Menucollection hoặc SubCollection!"
              );
            }
            const updatePath = `Menucollection.${menuIndex}.SubCollection.${subIndex}.options`;

            await menuCollection.updateOne(
              { _id: document._id },
              {
                $push: {
                  [updatePath]: req.body.OptionSubCollection,
                },
              }
            );
            res.json("Thêm Options mới thành công!");
          }
        } else {
          console.log("nhảy vào 3 - khác cái thứ 2");

          const a = await menuCollection.updateOne(
            {
              "Menucollection.name": req.body.menuCollection,
            },
            {
              $push: {
                "Menucollection.$.SubCollection": {
                  name: req.body.SubCollection,
                  options: [req.body.OptionSubCollection],
                },
              },
            }
          );

          res.json("Thêm SubCollection và Options mới thành công!");
        }
      } else {
        console.log("nhảy vào 4 - khác cái thứ 1");

        await menuCollection.findOneAndUpdate(
          {},
          {
            $push: {
              Menucollection: {
                name: req.body.menuCollection,
                SubCollection: [
                  {
                    name: req.body.SubCollection,
                    options: [req.body.OptionSubCollection],
                  },
                ],
              },
            },
          }
        );
        res.json("Thêm Menucollection mới thành công!");
      }
    } else {
      res.json("Thêm Document thành công!");
      console.log("nhảy vào 5 - không có document");
      const menu = new menuCollection({
        Menucollection: [
          {
            name: req.body.menuCollection,
            SubCollection: [
              {
                name: req.body.SubCollection,
                options: [req.body.OptionSubCollection],
              },
            ],
          },
        ],
      });

      try {
        const menuadd = await menu.save();
        res.json("Thêm Thành Công");
      } catch (err) {
        console.log(err);
      }
    }

    //
  },
  getCollection: async (req, res) => {
    const collection = await menuCollection.findOne();
    res.status(200).json(collection);
  },
};

module.exports = { Menu };
