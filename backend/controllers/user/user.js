import User from "../../models/User.js";

export const updateUser = async (req, res) => {
    //const userId = req.query.userId;
    // console.log("req", req.query.userId);
    const userId = req.user?.id;
    if (!userId) {
        console.error("User ID is missing".red);
        return res.status(400).send("User ID is missing");
    }
    try {
        const data = req.body;
        // Check if the request body contains data to update
        if (!data || Object.keys(data).length === 0) {
            return res
                .status(400)
                .send("Please provide data to update the user");
        }
        const userToUpdate = await User.findById(userId);

        console.log("userToUpdate: ", userToUpdate);
        if (!userToUpdate) {
            console.log("User not found".red);
            return res.status(404).send("User not found");
        }
        // Update user with provided data
        await User.updateOne({ _id: userId }, data);

        const updatedUser = await User.findById(userId);
        console.log(
            `User was successfully ${"updated".brightMagenta}, ${updatedUser}`
        );
        return res.send(updatedUser); // oder einfach {success: true}?
    } catch (error) {
        console.error("Error updating user".red, error.message.red);
        return res.status(500).send(error.message);
    }
};

export const getUser = async (req, res) => {
    const userId = req.user?.id;
    //const userId = req.body;
    if (!userId) {
        console.error("User ID is missing".red);
        return res.status(400).send("User ID is missing");
    }
    try {
        const user = await User.findById(userId);

        if (!user) {
            console.log("No user found for userId:", userId);
            return res.status(404).send("User not found");
        }

        console.log("User fetched successfully".green, user);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user".red, error.message.red);
        res.status(500).send(error.message);
    }
};

export const getAllUser = async (req, res) => {
    const userId = req.user?.id;

    if (!userId) {
        console.error("User ID is missing".red);
        return res.status(400).send("User ID is missing");
    }
    try {
        const user = await User.findById(userId);

        if (!user) {
            console.log("No user found for userId:", userId);
            return res.status(404).send("User not found");
        }

        if (user.role !== "admin") {
            return res
                .status(403)
                .send("You are not authorized to perform this action");
        }
        const users = await User.find().sort({ updatedAt: -1 });
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching user".red, error.message.red);
        res.status(500).send(error.message);
    }
};

export const addUser = async (req, res) => {
    try {
        const data = req.body;
        // const userData = {
        //     firstName: data.firstName,
        //     lastName: data.lastName,
        //     email: data.email,
        //     password: data.password,
        //     role: data.role,
        // };
        // console.log("add user", data);
        const user = await User.create(data);

        console.log("User added successfully".green, user);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error adding user".red, error.message.red);
        res.status(500).send(error.message);
    }
};

export const deleteUser = async (req, res) => {
    const deleteId = req.params.id;
    const userId = req.user?.id;
    if (!userId) {
        console.error("User ID is missing".red);
        return res.status(400).send("User ID is missing");
    }
    const user = await User.findById(userId);
    if (user.role !== "admin") {
        return res
            .status(403)
            .send("You are not authorized to perform this action");
    }
    try {
        const deletedUser = await User.findByIdAndDelete(deleteId);
        if (!user) {
            console.log("No user found for userId:", deleteId);
            return res.status(404).send("User not found");
        }
        console.log("User deleted successfully".green);
        res.status(200).json(deletedUser);
    } catch (error) {
        console.error("Error deleting user".red, error.message.red);
        res.status(500).send(error.message);
    }
};

export const adminUpdateUser = async (req, res) => {
    const updateId = req.params.id;
    const userId = req.user?.id;
    if (!userId) {
        console.error("User ID is missing".red);
        return res.status(400).send("User ID is missing");
    }
    const user = await User.findById(userId);
    if (user.role !== "admin") {
        return res
            .status(403)
            .send("You are not authorized to perform this action");
    }
    try {
        const data = req.body;
        // Check if the request body contains data to update
        if (!data || Object.keys(data).length === 0) {
            return res
                .status(400)
                .send("Please provide data to update the user");
        }

        const updatedUser = await User.updateOne({ _id: updateId }, data);

        console.log(
            `User was successfully ${"updated".brightMagenta}, ${updatedUser}`
        );
        return res.send(updatedUser); // oder einfach {success: true}?
    } catch (error) {
        console.error("Error updating user".red, error.message.red);
        return res.status(500).send(error.message);
    }
};
