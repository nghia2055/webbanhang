const express = require("express");
const { routeProduct } = require("./route/product");
const { routeRegisterUser } = require("./route/user/register");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const { routeLogin } = require("./route/login/login");
const dotenv = require("dotenv");
const { routeMenu } = require("./route/menu/menu");
const { registerUser } = require("./model/register");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
dotenv.config();

const dbURI =
  "mongodb+srv://dtn04999:HYXLI8lOVW9PFkr5@cluster0.jp8rc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; // Địa chỉ MongoDB trên localhost

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
    origin: "*", // Cho phép tất cả các domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Các phương thức HTTP cho phép
    allowedHeaders: ["Content-Type", "Authorization"], // Các header cho phép
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Route
app.get("/", (req, res) => {
  res.json("nghia");
});

app.post("/login/nghia", async (req, res) => {
  try {
    const user = await registerUser.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json("Wrong email!");
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.status(404).json("Wrong password!");
    }

    if (user && validPassword) {
      const payload = {
        id: user.id,
        admin: user.admin,
      };

      const accessToken = jsonwebtoken.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "15m",
      });
      const refresh_Token = jsonwebtoken.sign(
        payload,
        process.env.REFRESH_JWT_SECRET,
        {
          expiresIn: "7d",
        }
      );

      return res
        .cookie("accessToken", accessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        })
        .cookie("refreshToken", refresh_Token, {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
        })
        .status(200)
        .json("Login successful");
    }
  } catch (err) {
    res.status(500).json(err);
  }
});
app.use("/addProduct", routeProduct);
app.use("/register", routeRegisterUser);
app.use("/login", routeLogin);
app.use("/menu", routeMenu);

// Sever
app.listen("8080", () => {
  console.log(`sever đang chạy http://${"127.0.0.1"}:${8080} `);
});
