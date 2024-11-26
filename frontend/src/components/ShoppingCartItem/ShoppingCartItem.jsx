/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import StarRating from "../StarRating/StarRating";
import { Trash2 } from "lucide-react";
import WishHeart from "../WishHeart/WishHeart";
import QuantitySelector from "../QuantitySelector/QuantitySelector";
import { useState } from "react";

const ShoppingCartItem = ({ cartItem, deleteCartItem, updateCartItem }) => {
    const [quantity, setQuantity] = useState(cartItem.quantity);

    const handleQuantityChange = (newQuantity) => {
        setQuantity(newQuantity);
        updateCartItem(cartItem.productId._id, newQuantity);
    };

    // const handleColorChange = (e) => {
    //   const newColor = e.target.value;
    //   setColor(newColor); // Update local state
    //   updateCartItem(cartItem.productId._id, quantity, newColor); // Sync with backend
    // };

    // console.log(cartItem.productId._id);
    // console.log("cartItem", cartItem);

    return (
        <div className="w-full relative border-t py-7">
            {/* Top Section: percentage and Trash Icon */}
            <div className="flex justify-between">
                {/* percentage Label */}
                <div className="basis-[15%]">
                    {cartItem.productId.percentage > 0 && (
                        <p
                            className={`text-white text-center ${
                                cartItem.productId.percentage > 40
                                    ? "bg-colorTertiary"
                                    : "bg-colorSecondary"
                            } w-[5rem]`}
                        >
                            -{cartItem.productId.percentage}%
                        </p>
                    )}
                </div>

                {/* Trash Icon */}
                <div className="absolute top-7 right-6 flex space-x-2">
                    <Trash2
                        // novo
                        onClick={() => deleteCartItem(cartItem.productId._id)}
                        className=" cursor-pointer hover:text-colorTertiary focus:outline-none focus:text-colorTertiary transition duration-200 ease-in-out hover:scale-110 active:scale-95"
                    />
                </div>
            </div>
            {/* Middle Section */}
            <div className="big flex flex-col md:flex-row justify-between mt-4">
                {/* Product Image */}
                <div className="flex flex-col md:basis-[25%] md:mx-8">
                    <Link to={`/product/${cartItem.productId._id}`}>
                        <img
                            src={cartItem.productId.image}
                            alt={cartItem.productId.name}
                            className="w-[18rem] h-[18rem] mx-auto"
                        />
                    </Link>
                </div>

                {/* Main Middle Content */}
                {/* <div className="flex flex-col md:basis-[47%] md:mx-8"> */}
                <div className="flex flex-col md:basis-[65%] md:mx-8">
                    {/* Top Middle Div: Title, Stars, Description */}
                    <div className=" flex flex-col md:flex md:flex-row">
                        <div className="flex flex-col justify-center basis-2/3">
                            <p className="text-center md:text-left md:pt-8 font-semibold text-3xl mb-4">
                                {cartItem.productId.name}
                            </p>
                            <div className="flex justify-center md:justify-start">
                                <StarRating rate={cartItem.productId.rating} />
                            </div>
                            <p className="text-center sm:text-left pt-8 text-xl text-gray-600">
                                {cartItem.productId.description}
                            </p>
                        </div>
                        <div className="hidden md:block basis-1/3"></div>
                    </div>

                    {/* Bottom Middle Div: Quantity, Heart, and Price */}
                    <div className="flex flex-row justify-between items-center mt-5">
                        <div className="flex items-center">
                            {/* <select
                id="quantity"
                className="border rounded px-2.5 py-1.5 mr-4"
              >
                {[1, 2, 3, 4, 5].map((qty) => (
                  <option key={qty} value={qty}>
                    {qty}
                  </option>
                ))}
              </select> */}
                            <QuantitySelector
                                quantity={quantity}
                                setQuantity={setQuantity}
                                increaseQuantity={() =>
                                    handleQuantityChange(quantity + 1)
                                }
                                decreaseQuantity={() =>
                                    handleQuantityChange(
                                        Math.max(1, quantity - 1)
                                    )
                                }
                                // onClick={() =>
                                //     handleQuantityChange(quantity + 1)
                                // }
                                size="text-[1.8rem]"
                                padding="py-[0.6rem] px-4"
                            />
                            <WishHeart
                                className="text-colorPrimary cursor-pointer"
                                productId={cartItem.productId._id}
                            />
                        </div>

                        {/* Price */}
                        <div className="flex items-center">
                            {cartItem.productId.percentage ? (
                                <div>
                                    <p className="line-through text-[2rem]">
                                        $
                                        {Math.round(
                                            cartItem.productId.price /
                                                (1 -
                                                    cartItem.productId
                                                        .percentage /
                                                        100)
                                        ).toFixed(2)}
                                        {/* {cartItem.productId.price.toFixed(2)}$ */}
                                    </p>
                                    <p className="text-[2rem] text-colorTertiary">
                                        ${cartItem.productId.price.toFixed(2)}
                                        {/* {Math.round(
                                            cartItem.productId.price *
                                                (1 -
                                                    cartItem.productId
                                                        .percentage /
                                                        100)
                                        ).toFixed(2)}
                                        $ */}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-[2rem]">
                                    ${cartItem.productId.price.toFixed(2)}
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Delivery and Click & Collect */}
            <div className="flex-col md:flex-row flex justify-between mt-4 w-full gap-4">
                {/* Delivery Info */}
                <div className="w-full md:w-1/2 bg-gray-100 p-4 md:p-8 rounded-md space-y-1">
                    <div className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id="delivery"
                            name="deliveryOption"
                            className="form-radio"
                            value="delivery"
                            defaultChecked
                        />
                        <label
                            htmlFor="delivery"
                            className="text-[1.3rem] text-gray-700"
                        >
                            <h3 className="text-[1.3rem] font-semibold">
                                Delivery
                            </h3>
                        </label>
                    </div>
                    <p className="text-[1.3rem] text-green-600">
                        Delivery: 2 - 3 business days
                    </p>
                    <p className="text-[1.3rem] text-green-600">
                        Shipping method: Parcel, immediately available
                    </p>
                </div>

                {/* Click & Collect Info */}
                <div className="w-full p-4 md:w-1/2 bg-gray-100 md:p-8 rounded-md">
                    <div className="flex items-center space-x-2">
                        <input
                            type="radio"
                            id="clickCollect"
                            name="deliveryOption"
                            className="form-radio"
                            value="clickCollect"
                        />
                        <label
                            htmlFor="clickCollect"
                            className="text-[1.3rem] text-gray-700"
                        >
                            <h3 className="text-[1.3rem] font-semibold">
                                Click & Collect
                            </h3>
                        </label>
                    </div>
                    <div className="mt-2 text-[1.3rem] text-gray-500"></div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCartItem;
