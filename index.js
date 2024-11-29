const express = require("express");
const { routeProduct } = require("./route/product");
const { routeRegisterUser } = require("./route/user/register");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { routeLogin } = require("./route/login/login");
const dotenv = require("dotenv");
const { routeMenu } = require("./route/menu/menu");
dotenv.config();

const dbURI = "mongodb://localhost:27017/NEXTJS-ECOM"; // Địa chỉ MongoDB trên localhost

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

// fix
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://127.0.0.1:3000",
      "http://localhost:3001",
      "https://web-ban-hang-gamma.vercel.app",
    ], // Cho phép cả hai origin
    credentials: true, // Cho phép gửi cookie hoặc header Authorization
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.get("/", (req, res) => {
  res.send("nghia");
});
app.use("/addProduct", routeProduct);
app.use("/register", routeRegisterUser);
app.use("/login", routeLogin);
app.use("/menu", routeMenu);

// Sever
app.listen("8080", () => {
  console.log(`sever đang chạy http://${"127.0.0.1"}:${8080} `);
});
