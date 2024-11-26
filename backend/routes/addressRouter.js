import express from "express";
import {
    getAllAddresses,
    getUsersAddress,
    addAddress,
    editAddress,
} from "../controllers/address/address.js";
import { authorize } from "../middleware.js/auth.js";

const addressRouter = express.Router();

addressRouter
    .route("/")
    .get(authorize, getUsersAddress)
    .post(authorize, addAddress)
    .patch(authorize, editAddress);

addressRouter.route("/all").get(/* authorize, */ getAllAddresses);

//addressRouter.route("/:id").patch(authorize, editAddress);

export default addressRouter;
