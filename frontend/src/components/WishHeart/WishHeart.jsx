/* eslint-disable react/prop-types */
import { Heart } from "lucide-react";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppProvider";
import { addToWishlist } from "../../utils/wishlistUtils/addToWishlist";
import { deleteWishItem } from "../../utils/wishlistUtils/deleteWishItem";
import { fetchWishlist } from "../../utils/wishlistUtils/fetchWishList";
import { useLocation } from "react-router-dom";

const WishHeart = ({ productId, size = 22 }) => {
    const [isWish, setIsWish] = useState(false);
    const { heartCount, wishlist, setWishlist, user } = useContext(AppContext);
    const location = useLocation();

    useEffect(() => {
        const isInWishlist = wishlist.some(
            (product) => product._id === productId
        );

        if (user._id && isInWishlist) {
            setIsWish(true);
        } else {
            setIsWish(false);
        }
        //console.log("isInwishlistsStart", productId, isInWishlist);
    }, [wishlist, user, productId, location]);

    const handleHeart = async (id) => {
        if (!user._id) {
            alert("Only registered user can add products to wishlist");
            return;
        }
        //console.log("wishlist", wishlist);
        if (!id) {
            console.error("Product ID is undefined".red);
            return;
        }
        const isInWishlist = wishlist.some((product) => product._id === id);
        //console.log("isInwishlistForHeart", isInWishlist);

        try {
            if (!isInWishlist) {
                await addToWishlist(id);
                const updatedWishlist = await fetchWishlist();
                setWishlist(updatedWishlist);
                setIsWish(true);
            } else {
                await deleteWishItem(id);
                const updatedWishlist = await fetchWishlist();
                setWishlist(updatedWishlist);
                setIsWish(false);
            }
        } catch (error) {
            console.error("Error adding/deleting to wishlist:", error);
        }
    };

    return (
        <div>
            <Heart
                onClick={() => {
                    handleHeart(productId);
                }}
                fill={isWish ? "currentColor" : "none"}
                className={`hover:scale-125 duration-300 ease-in-out cursor-pointer ${
                    isWish
                        ? "text-colorSecondary"
                        : "text-colorPrimary hover:text-colorSecondary"
                }`}
                size={size}
            />
        </div>
    );
};

export default WishHeart;
