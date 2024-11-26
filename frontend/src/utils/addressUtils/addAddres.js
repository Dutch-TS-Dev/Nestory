const apiUrl = import.meta.env.VITE_API_URL;
export const addAddress = async (newAddressData) => {
    // console.log("addAddress fetch newAddressData", newAddressData);
    try {
        const response = await fetch(`${apiUrl}/address`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(newAddressData),
        });
        if (!response.ok) {
            throw new Error("Failed to add user's address");
        }
        const data = await response.json();
        // console.log("address added", data);
        return data;
    } catch (error) {
        console.error("Error adding address:", error);
        throw error;
    }
};
