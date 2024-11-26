import express from "express";
import { updateProductDetails } from "../controllers/productDetailsControllers.js";
import { authorize } from "../middleware.js/auth.js";

const router = express.Router();

router.route("/:productId").patch(authorize, updateProductDetails);

export default router;
