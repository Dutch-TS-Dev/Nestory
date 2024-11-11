import Cart from "../models/Cart.js";

export const getUserCart = async (req, res) => {
    const { id } = req.user;
    // const userId = req.user.id;
    console.log("userId", id);
    //dali e prisuten korisnikot proveruvam preku
    if (!id) {
        return res.status(400).json({ message: "User ID is required" });
    }

    try {
        const cart = await Cart.findOne({ userId: id }).populate(
            "items.productId"
        );
        // const cart = await Cart.findOne({ userId }).populate("items.productId");
        // console.log(cart);
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        console.log(cart);
        console.log("User's cart retrieved successfully");

        return res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Server error" });
    }
};

export const addProductToCart = async (req, res) => {
    const { productId } = req.params;
    const { quantity, color } = req.body;
    const { id } = req.user;

    if (!productId || !quantity || !id) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    try {
        let cart = await Cart.findOne({ userId: id }).populate(
            "items.productId"
        );

        if (!cart) {
            // 如果没有cart，创建一个新的并保存
            cart = new Cart({
                userId: id,
                items: [{ productId, quantity: parseInt(quantity, 10), color }],
            });
            await cart.save();
            // 保存后再次 populate，确保返回包含 product 信息的 cart
            cart = await cart.populate("items.productId").execPopulate();
            return res
                .status(201)
                .json({ message: "Product added to cart", cart });
        }

        const productIndex = cart.items.findIndex(
            (item) => item.productId._id.toString() === productId
        );

        if (productIndex !== -1) {
            cart.items[productIndex].quantity += parseInt(quantity, 10);
        } else {
            cart.items.push({
                productId,
                quantity: parseInt(quantity, 10),
                color,
            });
        }

        await cart.save();

        // 保存后再次 populate，以确保返回完整的 product 信息
        // cart = await Cart.findOne({ userId: id }).populate("items.productId");
        await cart.populate("items.productId").execPopulate();

        res.status(200).json({
            message: "Product added/updated in cart",
            cart,
        });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ message: "Server error" });
    }
};
// export const addProductToCart = async (req, res) => {
//     console.log(111);
//     const { productId } = req.params;
//     const { quantity, color } = req.body;
//     const { id } = req.user;
//     console.log(productId);
//     // console.log("user:", id);

//     try {
//         let cart = await Cart.findOne({ userId: id }).populate(
//             "items.productId"
//         );
//         console.log(cart);
//         if (!cart) {
//             cart = new Cart({
//                 userId: id,
//                 items: [{ productId, quantity, color }],
//             });
//             await cart.save();
//             return res
//                 .status(201)
//                 .json({ message: "Product added to cart", cart });
//         }

//         const productIndex = cart.items.findIndex(
//             (item) => item.productId.toString() === productId
//         );

//         if (productIndex !== -1) {
//             cart.items[productIndex].quantity += quantity;
//         } else {
//             cart.items.push({ productId, quantity, color });
//         }

//         await cart.save();
//         res.status(200).json({
//             message: "Product added/updated in cart",
//             cart,
//         });
//     } catch (error) {
//         console.error("Error adding product to cart:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

// export const deleteProductFromCart = async (req, res) => {
//     const { productId } = req.params;
//     console.log("productId", productId);
//     const { id } = req.user;
//     try {
//         // const cart = await Cart.findOne({ id });
//         let cart = await Cart.findOne({ userId: id }).populate(
//             "items.productId"
//         );
//         console.log("cart from db", cart);

//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }

//         const itemIndex = cart.items.findIndex(
//             (item) => item.productId._id.toString() === productId
//         );

//         if (itemIndex === -1) {
//             return res
//                 .status(404)
//                 .json({ message: "Product not found in cart" });
//         }

//         cart.items.splice(itemIndex, 1);

//         await cart.save();
//         await cart.populate("items.productId").execPopulate();

//         res.status(200).json({ message: "Product removed from cart", cart });
//     } catch (error) {
//         console.error("Error removing item from cart:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

export const deleteProductFromCart = async (req, res) => {
    const { productId } = req.params;
    const { id } = req.user;

    try {
        // 查找用户的购物车并填充 productId
        let cart = await Cart.findOne({ userId: id }).populate(
            "items.productId"
        );

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const itemIndex = cart.items.findIndex(
            (item) => item.productId._id.toString() === productId
        );

        if (itemIndex === -1) {
            return res
                .status(404)
                .json({ message: "Product not found in cart" });
        }

        // 移除该商品
        cart.items.splice(itemIndex, 1);
        await cart.save();

        // 再次填充 productId 确保返回的 cart 包含完整的 product 信息
        // cart = await Cart.findOne({ userId: id }).populate("items.productId");
        await cart.populate("items.productId");

        res.status(200).json({ message: "Product removed from cart", cart });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const updateProductInCart = async (req, res) => {
    const { productId } = req.params;
    const { id } = req.user;
    const { quantity, color } = req.body;

    try {
        // const cart = await Cart.findOne({ id });
        const cart = await Cart.findOne({ userId: id });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(
            (item) => item.productId.toString() === productId
        );

        if (!item) {
            return res
                .status(404)
                .json({ message: "Product not found in cart" });
        }

        // if (quantity !== undefined ) item.quantity = quantity;
        if (quantity) item.quantity = quantity;
        if (color) item.color = color;

        await cart.save();

        await cart.populate("items.productId").execPopulate();
        res.status(200).json({ message: "Product updated in cart", cart });
    } catch (error) {
        console.error("Error updating item in cart:", error);
        res.status(500).json({ message: "Server error" });
    }
};
