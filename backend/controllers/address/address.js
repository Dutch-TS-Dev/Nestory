import Address from "../../models/Address.js";
import mongoose from "mongoose";

export const getAllAddresses = async (req, res) => {
    try {
        const addresses = await Address.find({});
        console.log(
            `There are ${addresses.length.toString().brightMagenta} addresses`
        );
        res.send(addresses);
    } catch (error) {
        console.error("Error fetching addresses".red, error.message.red);
        res.status(500).send(error.message);
    }
};

export const getUsersAddress = async (req, res) => {
    const userId = req.user?.id;
    //const userId = req.body.userId;
    //const userId = req.query.userId;
    if (!userId) {
        console.error("User ID is missing".red);
        return res.status(400).send("User ID is missing");
    }
    try {
        console.log("Fetching address for userId:", userId);
        const address = await Address.findOne({ userId: userId });

        if (!address) {
            console.log("No address found for userId:", userId);
            return res.status(404).send("Address not found");
        }

        console.log("User's address fetched successfully".green, address);
        res.status(200).json(address);
    } catch (error) {
        console.error("Error fetching user's address".red, error.message.red);
        res.status(500).send(error.message);
    }
};

export const addAddress = async (req, res) => {
    const userId = req.user?.id;
    //const userId = req.body.userId;
    const { street, house, city, zip, country } = req.body;
    if (!userId) {
        console.error("User ID is missing".red);
        return res.status(400).send("User ID is missing");
    }
    try {
        const data = {
            userId: userId,
            street: street,
            house: house,
            city: city,
            zip: zip,
            country: country,
        };
        const newAddress = await Address.create(data);

        console.log("New address added successfully".green, newAddress);
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error adding new address".red, error.message.red);
        res.status(500).send(error.message);
    }
};

export const editAddress = async (req, res) => {
    //const addressId = req.params.id;
    const userId = req.user?.id;
    try {
        const data = req.body;
        // Check if the request body contains data to update
        if (!data || Object.keys(data).length === 0) {
            return res
                .status(400)
                .send("Please provide data to update the address");
        }
        //const addressToUpdate = await Address.findById(addressId);
        const addressToUpdate = await Address.findOne({ userId: userId });
        //console.log("addressToUpdate: ", addressToUpdate);
        if (!addressToUpdate) {
            console.log("Address not found".red);
            return res.status(404).send("Address not found");
        }
        // Update the address with the provided data
        //await Address.updateOne({ _id: addressId }, data);
        await Address.updateOne({ userId: userId }, data);
        //const updatedAddress = await Address.findById(addressId);
        const updatedAddress = await Address.findOne({ userId: userId });
        console.log(
            `The Address was successfully ${
                "updated".brightMagenta
            }, ${updatedAddress}`
        );
        return res.send(updatedAddress); // oder einfach {success: true}?
    } catch (error) {
        console.error("Error updating new address".red, error.message.red);
        return res.status(500).send(error.message);
    }
};
