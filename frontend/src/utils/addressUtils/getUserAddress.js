export const getUserAddress = async () => {
    try {
        const response = await fetch(`http://localhost:3000/address`, {
            credentials: "include",
        });
        if (!response.ok) {
            //throw new Error("Failed to get user's address");
            return;
        }
        const data = await response.json();
        // console.log("dataAddress", data);
        return data;
    } catch (error) {
        console.error(error.message);
    }
};
