export const updateUserAddress = async (/* addressId, */ newAddressData) => {
    /* console.log(
        "patch fetch addrssId, newAddressData",
        addressId,
        newAddressData
    ); */
    try {
        const response = await fetch(
            //`http://localhost:3000/address/${addressId}`,
            `http://localhost:3000/address`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify(newAddressData),
            }
        );
        if (!response.ok) {
            throw new Error("Failed to update user's address");
        }
        const data = await response.json();
        //console.log("dataUpdated", data);
        return data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};
