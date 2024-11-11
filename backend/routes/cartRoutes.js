import express from "express";
import {
  updateProductInCart,
  deleteProductFromCart,
  addProductToCart,
  getUserCart,
} from "../controllers/cartControllers.js";
import { authorize } from "../middleware.js/auth.js";

const router = express.Router();
router.route("/").get(authorize, getUserCart);

router
  .route("/:productId")
  .post(authorize, addProductToCart)
  .patch(authorize, updateProductInCart)
  .delete(authorize, deleteProductFromCart);

export default router;
