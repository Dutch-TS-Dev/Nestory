import mongoose from "mongoose";
import Product from "../../models/Product.model.js";

export const getOneProduct = async (req, res) => {
    const id = req.params.id;
    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send("Invalid expense ID");
    }
    try {
        // Find the product by ID
        const product = await Product.findById(id);
        if (!product) {
            console.log("Product not found".red);
            return res.status(404).send("Product not found");
        }
        console.log(
            `Product '${product.name.brightMagenta}' was successfully ${
                "fetched".brightMagenta
            }`
        );
        console.log("BE product", product);
        return res.send(product);
    } catch (error) {
        console.error(`Error: ${error}`.red);
        return res.status(500).send(error);
    }
};
