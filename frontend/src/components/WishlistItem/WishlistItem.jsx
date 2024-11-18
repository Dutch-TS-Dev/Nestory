/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Button from "../Button/Button.jsx";
import StarRating from "../StarRating/StarRating";
import { Trash2 } from "lucide-react";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../../context/AppProvider.jsx";
import { fetchWishlist } from "../../utils/wishlistUtils/fetchWishList.js";
import { deleteWishItem } from "../../utils/wishlistUtils/deleteWishItem.js";

const WishlistItem = ({ wishItem }) => {
  const { setWishlist, setCartItems, bagIconRef } = useContext(AppContext);

  const imgRef = useRef(null);
  const [isFlying, setIsFlying] = useState(false);
  const [flyStyle, setFlyStyle] = useState({});

  const addToCart = async () => {
    try {
      const response = await fetch(
        `http://localhost:3000/cart/${wishItem._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ quantity: 1, color: "black" }),
          credentials: "include",
        }
      );

      const data = await response.json();
      if (response.ok) {
        setCartItems(data.cart.items);
      } else {
        console.error("Error adding product to cart:", data.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }

    // Start der Animation
    setIsFlying(true);

    const startRect = imgRef.current.getBoundingClientRect();
    const endRect = bagIconRef.current.getBoundingClientRect();
    /* if (bagIconRef.current.clientX === 0) {
            endRect =
                bagIconRef.current.parent.parent.parent.getBoundingClientRect();
        }
        console.log(
            "bbbbb",
            startRect,
            endRect,
            bagIconRef,
            window.clientWidth
        ); */

    const scale = 0.2;

    setFlyStyle(() => ({
      left: `${startRect.left}px`,
      top: `${startRect.top}px`,
      opacity: 1,
      transform: "scale(1)",
    }));

    setTimeout(() => {
      // set endPosition of the center of image to the center of the shopping bag icon(size=26px/2)
      const adjustedLeft = endRect.left - startRect.width / 2 + 13;
      const adjustedTop = endRect.top - startRect.height / 2 + 13;

      setFlyStyle(() => ({
        left: `${adjustedLeft}px`,
        top: `${adjustedTop}px`,
        opacity: 0.3,
        transform: `scale(${scale})`,
      }));
    }, 100);
  };

  const handleTransitionEnd = () => {
    if (!isFlying) return; // avoid sending multiply images animation, "send only one"
    setIsFlying(false);
    setFlyStyle((prevStyles) => ({
      ...prevStyles,
      opacity: 1,
      transform: "scale(1)",
    }));
  };

  return (
    <div className="border-t h-fit w-[100%] md:h-[30rem] py-[3rem] px-[11rem] flex flex-col md:flex-row justify-around mt-8">
      <div className="md:basis-[30%] flex md:flex-col justify-between md:justify-center md:mx-8">
        <div className="basis-[15%]">
          {wishItem.discount > 0 && (
            <p
              className={`text-white text-center ${
                wishItem.discount > 40
                  ? "bg-colorTertiary"
                  : "bg-colorSecondary"
              } w-[5rem]`}
            >
              -{wishItem.discount}%
            </p>
          )}
        </div>
        <div>
          {/* Conditionally render the flying animation, height === image height*/}
          {isFlying && (
            <div
              className="fixed h-[250px] aspect-square rounded-full bg-cover bg-no-repeat transition-all duration-[1500ms] ease-in-out pointer-events-none z-[21]"
              style={{
                backgroundImage: `url(${wishItem.imgUrl})`,
                ...flyStyle,
              }}
              onTransitionEnd={handleTransitionEnd}
            ></div>
          )}
          <Link to={`/product/${wishItem._id}`}>
            <img
              ref={imgRef} // reference for image
              src={wishItem.imgUrl}
              alt="wish item photo"
              className="w-[25rem] h-[25rem] mx-auto"
              onClick={() => {
                window.scrollTo(0, 0);
              }}
            />
          </Link>
        </div>
        <div className="text-center basis-[15%] flex justify-center">
          <button
            onClick={deleteWishItem}
            className=" h-8 w-8 text-colorPrimary md:hidden mb-auto "
          >
            <Trash2 />
          </button>
        </div>
      </div>
      <div className="basis-[47%] flex flex-col justify-center md:mx-8">
        <p className="pt-8 md:pt-0">{wishItem.name}</p>
        <StarRating rate={wishItem.rating} />
        <p className="pt-8">{wishItem.description}</p>
        <p className="mt-auto pt-4">
          <Link
            to={`/product/${wishItem._id}`}
            className="underline"
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            Details
          </Link>
        </p>
      </div>
      <div className="basis-[18%] flex flex-col justify-center md:mx-8">
        <div className="flex justify-between mt-8 md:mt-0">
          {wishItem.discount ? (
            <div>
              <p className="line-through text-[2rem]">
                {/* {wishItem.price.toFixed(2)} */}
                {Math.round(
                  wishItem.price / (1 - wishItem.discount / 100)
                ).toFixed(2)}
                $
              </p>
              <p className="text-[2rem] text-colorTertiary">
                {/* {Math.round(
                                    wishItem.price *
                                        (1 - wishItem.discount / 100)
                                ).toFixed(2)} */}
                {wishItem.price.toFixed(2)}$
              </p>
            </div>
          ) : (
            <p className="text-[2rem]">{wishItem.price.toFixed(2)}$</p>
          )}
          <button
            onClick={async () => {
              await deleteWishItem(wishItem._id);
              // Wishlist erneut abrufen, um die UI zu aktualisieren
              const updatedWishlist = await fetchWishlist();
              setWishlist(updatedWishlist);
            }}
            className="p-4 text-colorPrimary hidden md:block mb-auto cursor-pointer hover:text-colorTertiary focus:outline-none focus:text-colorTertiary transition duration-200 ease-in-out hover:scale-110 active:scale-95"
          >
            <Trash2 />
          </button>
        </div>

        <p className="text-green-600">Is available</p>
        <div className="flex justify-center mt-auto pt-8">
          <Button text="Add to cart" width="200px" onClickHandler={addToCart} />
        </div>
      </div>
    </div>
  );
};

export default WishlistItem;
