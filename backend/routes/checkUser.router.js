import { Router } from "express";
import getUser from "../controllers/checkUser/getUser.js";
import { authorize } from "../middleware.js/auth.js";
const router = Router();

router.get("/", authorize, getUser);

export default router;
