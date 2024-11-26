import Product from "../../models/Product.model.js";
import User from "../../models/User.js";

const getProducts = async (
    { query: { type, sort, page = 1, limit = 6, category } },
    res
) => {
    try {
        let conditions = {};
        let options = {};
        const parsedLimit = parseInt(limit);
        const parsedPage = parseInt(page);

        if (category) {
            conditions.category = { $regex: new RegExp(`^${category}$`, "i") }; // "i" ignore case
        }

        if (type === "deals") {
            conditions = { percentage: { $gt: 40 } };
        } else if (type === "topRated") {
            options = { sort: { rating: -1 }, limit: 6 };
        } else {
            options.limit = parsedLimit;
            options.skip = (parsedPage - 1) * parsedLimit;

            switch (sort) {
                case "priceAsc":
                    options.sort = { price: 1 };
                    break;
                case "priceDesc":
                    options.sort = { price: -1 };
                    break;
                case "sales":
                    options.sort = { percentage: -1 };
                    break;
                case "rating":
                    options.sort = { rating: -1 };
                    break;
                case "newest":
                    options.sort = { updatedAt: -1 };
                    break;
                default:
                    options.sort = {};
                    break;
            }
        }

        const products = await Product.find(conditions, null, options);

        // if need pagination
        let total = 0;
        let hasNextPage = false;
        if (!type || (type !== "deals" && type !== "topRated")) {
            total = await Product.countDocuments(conditions);
            hasNextPage = parsedPage * parsedLimit < total;
        }

        res.send({ products, total, limit, hasNextPage });
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};

export default getProducts;

export const getAllProducts = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(400).json({ error: "User Id is required" });
        }
        const user = await User.findOne({ _id: userId });
        if (!user || user.role !== "admin") {
            return res.status(401).json({ error: "Unauthorized" });
        }

        // const { limit = 10, page = 1, sort } = req.query;
        // let conditions = {};
        // let options = {};
        // const parsedLimit = parseInt(limit);
        // const parsedPage = parseInt(page);

        // options.limit = parsedLimit;
        // options.skip = (parsedPage - 1) * parsedLimit;

        // switch (sort) {
        //     case "priceAsc":
        //         options.sort = { price: 1 };
        //         break;
        //     case "priceDesc":
        //         options.sort = { price: -1 };
        //         break;
        //     case "sales":
        //         options.sort = { percentage: -1 };
        //         break;
        //     case "rating":
        //         options.sort = { rating: -1 };
        //         break;
        //     case "newest":
        //         options.sort = { updatedAt: -1 };
        //         break;
        //     default:
        //         options.sort = {};
        //         break;
        // }

        const products = await Product.find({}).sort({ updatedAt: -1 });
        res.send(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};
