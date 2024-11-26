import express from "express";

import { authorize } from "../middleware.js/auth.js";
import {
    addUser,
    adminUpdateUser,
    deleteUser,
    getAllUser,
    getUser,
    updateUser,
} from "../controllers/user/user.js";

const userRouter = express.Router();

userRouter.route("/").get(authorize, getUser).patch(authorize, updateUser);

userRouter.route("/admin").get(authorize, getAllUser).post(authorize, addUser);

userRouter
    .route("/admin/:id")
    .patch(authorize, adminUpdateUser)
    .delete(authorize, deleteUser);

export default userRouter;
