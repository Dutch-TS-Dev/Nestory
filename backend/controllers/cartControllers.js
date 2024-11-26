import Cart from "../models/Cart.js";

export const getUserCart = async (req, res) => {
    const { id } = req.user;
    // const userId = req.user.id;
    // console.log("userId", id);
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

        console.log("User's cart retrieved successfully", cart);

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
        return res.status(400).json({
            message: "Missing required fields",
            // isAuthenticated: false,
        });
    }

    try {
        let cart = await Cart.findOne({ userId: id }).populate(
            "items.productId"
        );

        if (!cart) {
            cart = new Cart({
                userId: id,
                items: [{ productId, quantity: parseInt(quantity, 10), color }],
            });
            await cart.save();
            cart = await cart.populate("items.productId").execPopulate();
            return res.status(201).json({
                message: "Product added to cart",
                cart,
                // isAuthenticated: true,
            });
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
        cart = await Cart.findOne({ userId: id }).populate("items.productId");
        res.status(200).json({
            message: "Product added/updated in cart",
            cart,
            // isAuthenticated: true,
        });
    } catch (error) {
        console.error("Error adding product to cart:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteProductFromCart = async (req, res) => {
    const { productId } = req.params;
    const { id } = req.user;

    try {
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

        cart.items.splice(itemIndex, 1);
        await cart.save();

        await cart.populate("items.productId");

        res.status(200).json({ message: "Product removed from cart", cart });
    } catch (error) {
        console.error("Error removing item from cart:", error);
        res.status(500).json({ message: "Server error" });
    }
};

// export const updateProductInCart = async (req, res) => {
//     const { productId } = req.params;
//     const { id } = req.user;
//     const { quantity, color } = req.body;

//     try {
//         const cart = await Cart.findOne({ userId: id }).populate(
//             "items.productId"
//         );

//         if (!cart) {
//             return res.status(404).json({ message: "Cart not found" });
//         }

//         const item = cart.items.find(
//             (item) => item.productId.toString() === productId
//         );

//         if (!item) {
//             return res
//                 .status(404)
//                 .json({ message: "Product not found in cart" });
//         }

//         if (quantity !== undefined) item.quantity = parseInt(quantity, 10);
//         if (color !== undefined) item.color = color;
//         // if (quantity) item.quantity = quantity;
//         // if (color) item.color = color;

//         await cart.save();
//         await cart.populate("items.productId").execPopulate();

//         res.status(200).json({ message: "Product updated in cart", cart });
//     } catch (error) {
//         console.error("Error updating item in cart:", error);
//         res.status(500).json({ message: "Server error" });
//     }
// };

export const updateProductInCart = async (req, res) => {
    const { productId } = req.params;
    const { id } = req.user;
    const { quantity, color } = req.body;

    try {
        const cart = await Cart.findOne({ userId: id }).populate(
            "items.productId"
        );

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        const item = cart.items.find(
            (item) => item.productId._id.toString() === productId
        );

        if (!item) {
            return res
                .status(404)
                .json({ message: "Product not found in cart" });
        }

        if (quantity !== undefined) item.quantity = parseInt(quantity, 10);
        if (color !== undefined) item.color = color;
        // if (quantity) item.quantity = quantity;
        // if (color) item.color = color;

        await cart.save();
        await cart.populate("items.productId");

        res.status(200).json({ message: "Product updated in cart", cart });
    } catch (error) {
        console.error("Error updating item in cart:", error);
        res.status(500).json({ message: "Server error" });
    }
};

export const deleteCart = async (req, res) => {
    const { id } = req.user;
    try {
        const cart = await Cart.findOneAndDelete({ userId: id });
        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }
        return res.status(200).json({ message: "Cart deleted", cart });
    } catch (error) {
        console.error("Error deleting cart:", error);
        return res.status(500).json({ message: "Server error" });
    }
};
