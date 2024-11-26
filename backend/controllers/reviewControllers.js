import Review from "../models/Review.js";

export const getReviews = async (req, res) => {
    // const { productId } = req.query;

    const { productId } = req.params;

    try {
        const reviews = await Review.find({ productId });
        // console.log(reviews);
        res.json(reviews);
    } catch (error) {
        res.status(500).json({ message: "Error fetching reviews" });
    }
};

export const addReview = async (req, res) => {
    const { productId } = req.params;
    const { name, avatar, date, rating, text } = req.body;
    try {
        const newReview = new Review({
            name,
            avatar,
            date,
            rating,
            text,
            productId,
        });
        await newReview.save();
        res.status(201).json(newReview);
    } catch (error) {
        res.status(500).json({ message: "Error saving review" });
    }
};
