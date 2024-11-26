import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    rememberMe: {
      type: Boolean,
      default: false,
    },
    // cartItems: [
    cart: [
      {
        quantity: {
          type: Number,
          default: 1,
        },
        color: {
          type: String,
          default: "white",
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
        },
      },
    ],
    role: {
      type: String,
      enum: ["customer", "admin"],
      default: "customer",
    },
  },
  { timestamps: true }
);
//  oder :
//
// isAdmin: {
//   type: Boolean,
//   default: false,
// },
//
//   cart: [productSchema],
//   product: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
//   reviews: [reviewSchema],
// },

const User = mongoose.model("User", userSchema);
export default User;
