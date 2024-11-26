import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: { type: String, required: true },
  avatar: String,
  date: String,
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
});

const Review = mongoose.model("Review", reviewSchema);
export default Review;
