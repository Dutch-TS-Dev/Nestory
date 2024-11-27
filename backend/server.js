import dotenv from "dotenv";
dotenv.config();

import express from "express";
import connect from "./lib/db.js";
import cors from "cors";
import cookieParser from "cookie-parser";

import colors from "colors";
import morgan from "morgan";
import checkUserRouter from "./routes/checkUser.router.js";
import productRouter from "./routes/product.router.js";
import authRouter from "./routes/authRoutes.js";
import wishlistRouter from "./routes/wishlistRouter.js";
import cartRouter from "./routes/cartRoutes.js";
import productDetailsRouter from "./routes/productDetailsRoutes.js";
import ordersRouter from "./routes/ordersRouter.js";
import addressRouter from "./routes/addressRouter.js";
import userRouter from "./routes/userRouter.js";
import paymentRouter from "./routes/payment.route.js";
import orderRouter from "./routes/order.route.js";
import reviewRouter from "./routes/reviewRoutes.js";

await connect();
const app = express();

app.use((req, res, next) => {
  // Allow a single origin
  res.setHeader(
    "Access-Control-Allow-Origin",
    "https://nestory-9h1dm0442-teamama.vercel.app'/"
  );

  // Allow all HTTP methods
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  // Allow all headers
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Requested-With"
  );

  // Allow credentials
  res.setHeader("Access-Control-Allow-Credentials", "true");

  // Move to the next middleware
  next();
});

// app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use(morgan("dev"));

app.use("/api/checkUser", checkUserRouter);
app.use("/api/products", productRouter);
app.use("/api/users", authRouter);
app.use("/wishlist", wishlistRouter);
app.use("/cart", cartRouter);
app.use("/product", productDetailsRouter);
app.use("/account/orders", ordersRouter);
app.use("/address", addressRouter);
app.use("/account/user", userRouter);
app.use("/api/payments", paymentRouter);
app.use("/api/order", orderRouter);
app.use("/api/review", reviewRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`.yellow.bold);
});
