import { Router } from "express";

import { authorize } from "../middleware.js/auth.js";
import {
    getAllOrders,
    getUserOrders,
} from "../controllers/orders/order.controller.js";

const router = Router();

router.get("/", authorize, getUserOrders);
router.get("/all", getAllOrders);

export default router;
