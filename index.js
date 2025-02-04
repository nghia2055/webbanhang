const express = require("express");
const { routeProduct } = require("./route/product");
const { routeMenu } = require("./route/menu/menu");
const { routeCollection } = require("./route/collection/collection");
const { routeUser } = require("./route/user");

const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
dotenv.config();

const mongoose = require("mongoose");
const { routefooter } = require("./route/footer");

const routerOrder = require("./route/order/index");
const routerNotification = require("./route/notification");
const routerSearch = require("./route/search");
const routerDashboardOrder = require("./route/dashboardorder");
const dbURI = `mongodb+srv://dtn04999:${process.env.PASSWORD_MONGODB_ATLAS}@cluster0.jp8rc.mongodb.net/ecommerce?retryWrites=true&w=majority&appName=Cluster0`; // Địa chỉ MongoDB trên localhost

// Kết nối MongoDB
mongoose
  .connect(dbURI)
  .then(() => {
    console.log("Kết nối MongoDB thành công");
  })
  .catch((err) => {
    console.error("Lỗi kết nối MongoDB:", err);
  });

const app = express();

app.use(
  cors({
    origin: `${process.env.URL_NEXTJS}`,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.get("/", (req, res) => {
  res.json("nghia");
});

app.use("/", routeMenu);
app.use("/", routeUser);
app.use("/", routeProduct);
app.use("/", routeCollection);
app.use("/", routefooter);
app.use("/", routerOrder);
app.use("/", routerNotification);
app.use("/", routerSearch);
app.use("/", routerDashboardOrder);

// Sever
app.listen(8081, "localhost", () => {
  console.log("Server is running on http://localhost:8081");
});
