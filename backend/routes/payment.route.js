import { Router } from "express";

import { authorize } from "../middleware.js/auth.js";
import {
    checkoutSuccess,
    createCheckoutSession,
} from "../controllers/payment/payment.controller.js";
const router = Router();

router.post("/create-checkout-session", authorize, createCheckoutSession);
router.post("/checkout-success", authorize, checkoutSuccess);

export default router;

// #password stripe:  2/-xL@,rqgF4JU3
