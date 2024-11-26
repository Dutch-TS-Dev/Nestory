import Cart from "../models/Cart.js";

export const updateProductDetails = async (req, res) => {
  const { productId } = req.params;
  const { id } = req.user;
  const { quantity, color } = req.body;

  try {
    const cart = await Cart.findOne({ id });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Product not found in cart" });
    }

    if (quantity) item.quantity = quantity;

    if (color) item.color = color;

    await cart.save();

    return res.status(200).json({ message: "Product updated in cart", cart });
  } catch (error) {
    console.error("Error updating cart item:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
