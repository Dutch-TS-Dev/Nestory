export const addToWishlist = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/wishlist/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error("Failed to add wishlistItem");
        }
    } catch (error) {
        console.log("Error adding WishlistItem".red, error);
    }
};
