import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        shippingAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Address",
            required: true,
        },
        shippingFee: { type: Number, default: 50, required: true },
        items: [
            {
                productId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                quantity: { type: Number, required: true },
                // price soll mit discount berechnet werden
                price: {
                    type: Number,
                    required: true,
                },
            },
        ],
        status: {
            type: String,
            required: true,
            enum: ["delivered", "assembling", "in transit"],
        },
        total: { type: Number, required: true },
        stripeSessionId: { type: String, unique: true },
    },
    { timestamps: true }
);

const Order = mongoose.model("Order", OrderSchema);
export default Order;
