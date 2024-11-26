import { stripe } from "../../lib/stripe.js";
import Cart from "../../models/Cart.js";
import Order from "../../models/Order.js";
import Address from "../../models/Address.js";
import dotenv from "dotenv";
dotenv.config();

// console.log(process.env.CLIENT_URL);

export const createCheckoutSession = async (req, res) => {
    try {
        const { id: userId } = req.user;
        console.log("createCheckoutSession", req.body);

        const { items } = req.body;

        if (!items || items.length === 0) {
            return res.status(400).json({ error: "购物车为空" });
        }

        const cartItems = await Cart.findOne({ userId })
            .populate("items.productId")
            .exec();

        console.log("cartItems", cartItems);
        let totalAmount = 0;
        let shippingFee = 50;

        const lineItems = cartItems.items.map((item) => {
            const price = Number(item.productId.price);
            const quantity = Number(item.quantity);

            if (
                isNaN(price) ||
                isNaN(quantity) ||
                price <= 0 ||
                quantity <= 0
            ) {
                throw new Error("商品价格或数量无效");
            }

            const amount = Math.round(price * 100); // Stripe要求金额以分为单位

            return {
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.productId.name,
                        // images: [item.productId.image], // 如果需要添加图片，可以在此处添加
                    },

                    unit_amount: amount,
                },
                quantity: quantity,
            };
        });

        lineItems.push({
            price_data: {
                currency: "usd",
                product_data: {
                    name: "Shipping Fee",
                },
                unit_amount: shippingFee * 100, // 运费金额以分为单位
            },
            quantity: 1,
        });

        const shippingAddress = await Address.findOne({ userId });
        const shippingAddressId = shippingAddress._id.toString();

        // 创建Stripe结账会话
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
            metadata: {
                items: JSON.stringify(
                    cartItems.items.map((item) => ({
                        _id: item.productId._id,
                        quantity: item.quantity,
                        price: item.productId.price,
                    }))
                ),
                shippingAddressId, // 添加收货地址ID到metadata
                userId,
            },
        });

        console.log("session", session);

        // 返回Stripe结账会话ID
        res.status(200).json({
            id: session.id,
            totalAmount: totalAmount / 100,
        });
    } catch (error) {
        console.error("create checkout session error:", error);
        res.status(500).json({ error: "create checkout session error" });
    }
};

export const checkoutSuccess = async (req, res) => {
    try {
        // console.log("now in checkoutSuccess");
        // console.log("session_id", req.body);
        const { sessionId } = req.body;
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // console.log("session in checkoutSuccess", session);
        if (session.payment_status === "paid") {
            // 从session的metadata中获取商品和收货地址ID
            const items = JSON.parse(session.metadata.items);
            const shippingAddressId = session.metadata.shippingAddressId;

            const shippingAddress = await Address.findById(shippingAddressId);

            const userId = session.metadata.userId;

            const cartItems = await Cart.findOne({ userId })
                .populate("items.productId") // 假设productId是一个ObjectId，populate用来获取产品的name和image字段
                .exec();

            // 创建一个新的订单
            const newOrder = new Order({
                userId: session.metadata.userId, // 用户ID
                items: cartItems.items.map((item) => ({
                    productId: item.productId._id, // 商品ID
                    quantity: item.quantity, // 商品数量
                    price: item.productId.price, // 商品价格
                })),
                shippingAddress: shippingAddress._id, // 使用收货地址ID
                total: session.amount_total / 100, // 总金额（Stripe返回的是以分为单位的金额）
                stripeSessionId: session.id, // Stripe会话ID
                status: "assembling", // 默认状态为“正在组装”
            });

            // 保存订单到数据库
            await newOrder.save();

            // 返回成功响应
            res.status(200).json({
                success: true,
                message: "payment success",
                orderId: newOrder._id,
                Order: newOrder,
            });
        } else {
            res.status(400).json({ error: "payment failed" });
        }
    } catch (error) {
        console.error("handle payment error:", error);
        res.status(500).json({ error: "handle payment error" });
    }
};
