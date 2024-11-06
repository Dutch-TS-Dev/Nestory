import express from "express";
import {
    addWishlistItem,
    deleteWishlistItem,
    getAllWishlists,
    getUserWishlist,
} from "../controllers/wishlist/wishlist.js";
import { authorize } from "../middleware.js/auth.js";

const wishlistRouter = express.Router();

wishlistRouter.route("/").get(authorize, getUserWishlist);
wishlistRouter.route("/all").get(authorize, getAllWishlists);
wishlistRouter
    .route("/:id")
    .post(authorize, addWishlistItem)
    .delete(authorize, deleteWishlistItem);

export default wishlistRouter;
