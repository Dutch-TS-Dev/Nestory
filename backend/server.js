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

// Add headers before the routes are defined
app.use((req, res, next) => {
  // Website you wish to allow to connect
  const allowedOrigins = [
    "http://localhost:5173",
    "https://nestory-frontend.vercel.app",
    "http://localhost:8888", // Additional allowed origin
  ];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  // Request methods you wish to allow
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );

  // Request headers you wish to allow
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,Content-Type,Authorization"
  );

  // Allow credentials (cookies, etc.)
  res.setHeader("Access-Control-Allow-Credentials", true);

  // Pass to next middleware
  next();
});

// Using the cors middleware for additional flexibility
const corsOptions = {
  origin: ["http://localhost:5173", "https://nestory-frontend.vercel.app"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

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
