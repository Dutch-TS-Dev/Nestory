import connect from "../../lib/db.js";
const testWishlist = [
    {
        userId: "67291802dce0b47c79eb0ca7",
        items: [
            {
                productId: "67291802dce0b47c79eb0c9a",
                addedAt: "2024-11-05", // Für sortierung
            },
            {
                productId: "67291802dce0b47c79eb0c9b",
                addedAt: "2024-10-07", // Für sortierung
            },
        ],
    },
    {
        userId: "67291802dce0b47c79eb0ca8",
        items: [
            {
                productId: "67291802dce0b47c79eb0c9d",
                addedAt: "2024-11-05", // Für sortierung
            },
            {
                productId: "67291802dce0b47c79eb0ca0",
                addedAt: "2024-10-07", // Für sortierung
            },
        ],
    },
];

const seedWishlist = async () => {
    connect();

    await Wishlist.insertMany(testWishlist);
    console.log("Wishlist seed is successfull");
};

seedWishlist();
