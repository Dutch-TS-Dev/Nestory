import Order from "../../models/Order.js";
import User from "../../models/User.js";

export const getAllOrders = async (req, res) => {
    try {
        const userId = req.user?.id;
        const user = await User.findOne({ _id: userId });
        if (user.role !== "admin") {
            return res
                .status(403)
                .send("You are not authorized to perform this action");
        }
        const allOrders = await Order.find({});

        // 查询最近 6 条订单并根据 stripeSessionId 去重
        const orders = await Order.aggregate([
            { $sort: { updatedAt: -1 } }, // 按更新时间降序排序
            {
                $group: {
                    _id: "$stripeSessionId", // 按 stripeSessionId 分组
                    doc: { $first: "$$ROOT" }, // 每组中保留最新的订单
                },
            },

            { $replaceRoot: { newRoot: "$doc" } }, // 替换根对象为订单文档
            { $limit: 6 }, // 限制为最多 12 条
        ]);

        // 填充相关字段
        const populatedOrders = await Order.populate(orders, [
            { path: "items.productId" },
            { path: "userId", select: "firstName lastName email" },
            { path: "shippingAddress" },
        ]);

        // 使用 map 和 async/await 来确保检查每个用户是否有效
        const validOrders = await Promise.all(
            populatedOrders.map(async (order) => {
                const user = await User.findById(order.userId);
                if (user) {
                    return order; // 只返回有效用户的订单
                }
                return null; // 无效的用户订单返回 null
            })
        );

        // 过滤掉 null 的订单
        const filteredOrders = validOrders.filter((order) => order !== null);

        console.log(
            `There are ${
                populatedOrders.length.toString().brightMagenta
            } addresses`
        );
        res.send({ filteredOrders, allOrders });
    } catch (error) {
        console.error("Error fetching orders".red, error.message.red);
        res.status(500).send(error.message);
    }
};

export const getUserOrders = async (req, res) => {
    // const userId = req.user?.id;
    // console.log("userId", userId);
    const { sessionId } = req.query;
    // console.log("sessionId in getUserOrders", sessionId);

    // if (!userId) {
    //     console.error("User ID is missing".red);
    //     return res.status(400).send("User ID is missing");
    // }
    if (!sessionId) {
        console.error("sessionId is missing".red);
        return res.status(400).send("sessionId is missing");
    }
    try {
        // console.log("Fetching order for stripeSessionId:", sessionId);
        const order = await Order.findOne({ stripeSessionId: sessionId })
            .populate("items.productId")
            .populate("userId", "name email")
            .populate("shippingAddress");

        if (!order) {
            // console.log("No order found for userId:", userId);
            return res.status(404).send({ message: "Address not found" });
        }

        console.log("User's address fetched successfully".green, order);
        res.status(200).json(order);
    } catch (error) {
        console.error("Error fetching user's address".red, error.message.red);
        res.status(500).send(error.message);
    }
};
