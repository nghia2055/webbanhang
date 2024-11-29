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
// const allowedOrigins = [
//   "http://localhost:3000", // Nếu bạn đang phát triển cục bộ
//   "https://web-ban-hang-lovat.vercel.app",
//   "https://web-ban-hang-liart.vercel.app",
//   "http://127.0.0.1:3000",
//   // URL của frontend trên Vercel
//   "http://localhost:3001",
//   "http://127.0.0.1:3001",
// ];

// Cấu hình middleware CORS
app.use(
  cors({
    origin: "https://web-ban-hang-liart.vercel.app/",
    optionsSuccessStatus: 200,
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
app.use("/addProduct", routeProduct);
app.use("/register", routeRegisterUser);
app.use("/login", routeLogin);
app.use("/menu", routeMenu);

// Sever
app.listen("8080", () => {
  console.log(`sever đang chạy http://${"127.0.0.1"}:${8080} `);
});
