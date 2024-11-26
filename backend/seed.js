import connect from "./lib/db.js";
import { products } from "./lib/product.data.js";
import Product from "./models/Product.model.js";

const seed = async () => {
    connect();
    await Product.deleteMany({});
    await Product.insertMany(products);
};

seed();
export default seed;
