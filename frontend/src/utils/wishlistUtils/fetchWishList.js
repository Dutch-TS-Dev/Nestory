export const fetchWishlist = async () => {
    try {
        const response = await fetch("http://localhost:3000/wishlist", {
            method: "GET",
            credentials: "include",
        });
        if (!response.ok) {
            if (response.status === 404) {
                return [];
            } else {
                throw new Error("Failed to fetch wishlist");
            }
        } else {
            const data = await response.json();
            /* return data.items; */
            /* Sort by date (item in wishlist) */
            const sortedItems = data.items.sort(
                (a, b) => new Date(b.addedAt) - new Date(a.addedAt)
            );
            return sortedItems;
        }
    } catch (error) {
        console.log("Error fetching userWishlist", error);
        throw error;
    }
};
