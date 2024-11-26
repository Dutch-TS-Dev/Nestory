import { Schema, model } from "mongoose";
import mongoose from "mongoose";

const productSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: [true, "Image is required"],
        },
        category: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
            minlength: 10,
            maxlength: 2000,
        },
        price: {
            type: Number,
            min: 0,
            required: true,
        },
        percentage: {
            type: Number,
            default: 0,
        },
        countInStock: {
            type: Number,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            default: 0,
        },
        // isHot: {
        //     type: Boolean,
        //     default: false,
        // },
    },
    { timestamps: true }
);

const Product = mongoose.models.Product || model("Product", productSchema);

export default Product;
