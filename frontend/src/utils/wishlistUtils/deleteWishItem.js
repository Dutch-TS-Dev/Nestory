const apiUrl = import.meta.env.VITE_API_URL;
export const deleteWishItem = async (id) => {
    //console.log("item to del: ", wishlist.find((i) => i._id === id).name, id);
    try {
        const response = await fetch(`${apiUrl}/wishlist/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!response.ok) {
            throw new Error("Failed to delete wishlist item");
        }
    } catch (error) {
        console.error("Error deleting wishlist item:", error);
    }
};
