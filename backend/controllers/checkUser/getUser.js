import User from "../../models/User.js";
const getUser = async (req, res) => {
    const userId = req.user.id;

    if (!userId) {
        return res.status(400).json({ error: "User Id is required" });
    }
    try {
        const user = await User.findOne({ _id: userId });
        return res.status(200).json({ user, success: true });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).send({ error: "Internal server error" });
    }
};

export default getUser;
