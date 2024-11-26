import Wishlist from "../../models/Wishlist.js";

// Fetch all wishlists from the database
export const getAllWishlists = async (req, res) => {
    try {
        const wishlists = await Wishlist.find();
        console.log(
            `There are ${wishlists.length.toString().brightMagenta} wishlists`
        );
        res.send(wishlists);
    } catch (error) {
        console.error("Error fetching wishlists".red, error.message.red);
        res.status(500).send(error.message);
    }
};

// Fetch the wishlist for the user from the database
export const getUserWishlist = async (req, res) => {
    //console.log("bbbbb getUserWishList", req.user?.id);
    //const userId = req.body.userId;
    const userId = req.user?.id;
    //const userId = "672b410a792afd795be5c2be";

    if (!userId) {
        return res.status(400).json({ error: "User Id is required" });
    }
    try {
        const wishlist = await Wishlist.findOne({ userId: userId });
        //console.log(wishlist);

        // Check if the wishlist exists
        if (!wishlist) {
            return res.status(404).json({ error: "Wishlist not found" });
        }
        console.log(
            `There are ${
                wishlist.items.length.toString().brightMagenta
            } items in user's wishlist`
        );
        await wishlist.populate("items.productId");
        const items = wishlist.items
            .filter((item) => item.productId !== null)
            .map((item) => {
                if (!item.productId) {
                    console.error(
                        `Product not found for wishlist item with _id: ${item._id}`
                    );
                    return null;
                }
                return {
                    _id: item.productId._id,
                    name: item.productId.name,
                    description: item.productId.description,
                    imgUrl: item.productId.image,
                    discount: item.productId.percentage,
                    price: item.productId.price,
                    rating: item.productId.rating,
                    addedAt: item.addedAt, // for sort by date
                };
            });

        const userWishlist = {
            _id: wishlist._id,
            userId: wishlist.userId,
            items: items,
            createdAt: wishlist.createdAt,
            updatedAt: wishlist.updatedAt,
        };
        console.log("userWishlist", userWishlist);

        res.status(200).json(userWishlist);
    } catch (error) {
        console.error(`Error fetching userWishlist: ${error.message}`.red);

        res.status(500).json({
            error: "An error occurred while fetching the user wishlist",
        });
    }
};

// Remove the item from the wishlist
export const deleteWishlistItem = async (req, res) => {
    //const userId = req.body.userId;
    const userId = req.user?.id;
    //const userId = "672b410a792afd795be5c2be";
    const productToDel = req.params.id;
    console.log("productToDel ID", productToDel);
    if (!userId) {
        return res.status(400).json({ error: "User Id is required" });
    }
    try {
        // Fetch the wishlist for the user from the database
        const wishlist = await Wishlist.findOne({ userId: userId });
        // console.log("wishlist", wishlist);

        // Check if the wishlist exists
        if (!wishlist) {
            return res.status(404).json({ error: "Wishlist not found" });
        }

        // Check if the item is in the wishlist
        const isItemInWishlist = wishlist.items.some(
            (el) => el.productId.toString() === productToDel.toString()
        );
        //console.log("isItemInWishlist", isItemInWishlist);

        if (!isItemInWishlist) {
            console.error(`There is no such an item in Wishlist`.red);
            return res
                .status(400)
                .json({ error: "There is no such an item in Wishlist" });
        }
        // Remove the item from the wishlist
        wishlist.items.remove({ productId: productToDel });
        await wishlist.save();

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(`Error deleting Wishlist item: ${error}`.red);

        res.status(500).json({
            success: false,
            error: "An error occurred while deleting the wishlistItem",
        });
    }
};

// Add the item to the wishlist
export const addWishlistItem = async (req, res) => {
    //const userId = req.body.userId;
    const userId = req.user?.id;
    //const userId = "672b410a792afd795be5c2be";
    if (!userId) {
        return res.status(400).json({ error: "User Id is required" });
    }
    const productToAdd = req.params.id;
    // console.log("productToAdd", productToAdd);

    try {
        // Fetch the wishlist for the user from the database
        const wishlist = await Wishlist.findOne({ userId: userId });

        // Check if the wishlist exists
        if (!wishlist) {
            const newWishlist = new Wishlist({
                userId: req.user.id,
                items: [],
            });
            await newWishlist.save();
        }

        // Check if the item is already in the wishlist
        const isItemInWishlist = wishlist.items.some(
            (el) => el.productId.toString() === productToAdd.toString()
        );
        // console.log("isItemInWishlist", isItemInWishlist);

        // Check if the item is already in the wishlist
        if (isItemInWishlist) {
            console.error(`There is already such an item in Wishlist`.red);
            return res
                .status(406)
                .json({ error: "There is already such an item in Wishlist" });
        }
        // Add the item to the wishlist
        wishlist.items.push({ productId: productToAdd });
        await wishlist.save();
        // console.log("wishlist", wishlist);

        res.status(200).json({ success: true });
    } catch (error) {
        console.error(`Error adding Wishlist item: ${error}`.red);
        res.status(500).json({
            success: false,
            error: "An error occurred while adding the wishlistItem",
        });
    }
};
