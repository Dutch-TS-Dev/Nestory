export const updateUser = async (newUsersData) => {
    try {
        const response = await fetch("http://localhost:3000/account/user", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(newUsersData),
        });
        if (!response.ok) {
            throw new Error("Failed to update user");
        }
        const data = await response.json();
        // console.log("dataUpdated", data);
        return data;
    } catch (error) {
        console.error(error.message);
        throw error;
    }
};
