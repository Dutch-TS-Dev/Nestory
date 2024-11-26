import express from "express";
import { addReview, getReviews } from "../controllers/reviewControllers.js";
import { authorize } from "../middleware.js/auth.js";

const router = express.Router();

router.route("/:productId").get(getReviews).post(authorize, addReview);

export default router;
