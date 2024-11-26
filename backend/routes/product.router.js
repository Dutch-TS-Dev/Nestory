import { Router } from "express";
import getProducts, {
    getAllProducts,
} from "../controllers/products/getProducts.js";
import searchProducts from "../controllers/products/searchProducts.js";
import { getOneProduct } from "../controllers/products/getOneProduct.js";
import { authorize } from "../middleware.js/auth.js";
import {
    addProduct,
    deleteProduct,
    updateProduct,
} from "../controllers/products/product.controller.js";
const router = Router();

router.route("/").get(getProducts);
router
    .route("/admin")
    .get(authorize, getAllProducts)
    .post(authorize, addProduct);

router
    .route("/admin/:id")
    .patch(authorize, updateProduct)
    .delete(authorize, deleteProduct);

router.get("/search", searchProducts);
router.get("/:id", getOneProduct);
export default router;
