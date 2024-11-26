import Order from "../../models/Order.js";

export const getAllUsersOrders = async (req, res) => {
    try {
        const orders = await Order.find();
        console.log(
            `There are ${orders.length.toString().brightMagenta} orders`
        );
        res.send(orders);
    } catch (error) {
        console.error("Error fetching orders", red, error.message.red);
        res.status(500).send(error.message);
    }
};

export const createOrder = async (req, res) => {
    const userId = req.body.userId;
    //const userId = req.user?.id;
    const { shippingAddress, shippingFee, items, status, total } = req.body;

    if (!userId) {
        return res.status(400).json({ error: "User Id is required" });
    }

    try {
        const newOrder = new Order({
            userId: userId,
            shippingAddress: shippingAddress,
            shippingFee: shippingFee,
            items: items,
            status: status,
            total: total,
        });
        await newOrder.save();
        console.log("The new order was successfully created", newOrder);
        res.status(201).json({
            success: true,
            data: newOrder,
        });
    } catch (error) {
        console.error(`Error creating Order: ${error}`.red);
        res.status(500).json({
            success: false,
            error: "An error occurred while creating the order",
        });
    }
};

export const getUsersOrders = async (req, res) => {
    const userId = req.user?.id;
    //const userId = req.body.userId;
    //const userId = req.query.userId;
    if (!userId) {
        console.error("User ID is missing".red);
        return res.status(400).json("User ID is missing");
    }
    try {
        //console.log("Fetching orders for userId:", userId);
        const orders = await Order.find({ userId: userId }).populate(
            "items.productId"
        );

        /* console.log("ordersPopulated", orders);
        console.log("User's orders fetched successfully".green, orders);
        return res.status(200).json(orders); */
        // Filter out deleted items (products)
        const filteredOrders = orders.map((order) => {
            order.items = order.items.filter((item) => item.productId !== null);
            return order;
        });

        //console.log("ordersPopulated", filteredOrders);
        //console.log("User's orders fetched successfully".green, filteredOrders);
        return res.status(200).json(filteredOrders);
    } catch (error) {
        console.error("Error fetching user's orders".red, error.message.red);
        return res.status(500).json(error.message);
    }
};
