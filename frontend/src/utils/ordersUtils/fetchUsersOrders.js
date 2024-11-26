export const fetchUsersOrders = async () => {
    try {
        const response = await fetch(`http://localhost:3000/account/orders`, {
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("Failed to get user's orders");
            /* return; */
        }
        const data = await response.json();
        // console.log("dataOrders", data);
        return data;
    } catch (error) {
        console.error(error.message);
    }
};
