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

// const corsOptions = {
//     origin: [
//         "http://localhost:5173",
//         "http://localhost:5174",
//         "http://localhost:5175",
//         "http://localhost:5177",
//         "https://nestory-frontend.vercel.app",
//     ],
//     credentials: true,
//     allowedHeaders: ["Content-Type", "Authorization"], // 允许的请求头
// };

const corsOptions = {
    origin: function (origin, callback) {
        // 如果没有 origin（例如来自本地请求），允许跨域
        if (
            !origin ||
            [
                "http://localhost:5173",
                "http://localhost:5174",
                "http://localhost:5175",
                "http://localhost:5177",
                "https://nestory-frontend.vercel.app",
            ].includes(origin)
        ) {
            callback(null, true); // 允许跨域
        } else {
            callback(new Error("Not allowed by CORS")); // 不允许其他来源
        }
    },
    credentials: true, // 支持带凭证的请求（如 cookies）
    allowedHeaders: ["Content-Type", "Authorization"], // 允许的请求头
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

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`.yellow.bold);
});
