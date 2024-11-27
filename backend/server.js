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

// CORS configuration
const corsOptions = {
  origin: (origin, callback) => {
    // Dynamically allow the origin (e.g., for a UUID-based URL)
    if (origin) {
      callback(null, origin); // Accept the origin dynamically
    } else {
      callback(new Error("Not allowed by CORS")); // Reject requests with no origin (e.g., for non-browser requests)
    }
  },
  credentials: true, // Allow cookies and credentials to be sent
  methods: ["GET", "POST", "PUT", "DELETE"], // Allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allowed headers
};

app.use(cors(corsOptions));

// Your routes here...
app.get("/api/products", (req, res) => {
  res.json({ message: "Products fetched successfully" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
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
