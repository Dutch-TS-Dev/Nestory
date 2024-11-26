import Product from "../../models/Product.model.js";

export const addProduct = async (req, res) => {
    const product = await Product.create(req.body);
    res.send(product);
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    // console.log("here is updateProduct product", req.body);
    const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
    });
    res.send(product);
};

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOneAndDelete({ _id: id });
    res.send(product);
};
