import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        street: { type: String, required: true, trim: true },
        house: { type: Number, required: true, min: 1 },
        city: { type: String, required: true, trim: true },
        zip: { type: Number, required: true, min: 100 },
        country: { type: String, required: true, trim: true },
    },
    {
        timestamps: true,
    }
);

const Address = mongoose.model("Address", AddressSchema);
export default Address;
