/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import WishHeart from "../WishHeart/WishHeart";

const SearchItems = ({ SearchItem }) => {
  return (
    <div className="border-t-2 w-full h-fit md:h-[30rem] py-[3rem] flex flex-col md:flex-row gap-10 md:justify-center">
      <div className="  basis-[30%] flex justify-center items-center">
        <Link to={`/product/${SearchItem._id}`}>
          <img
            src={SearchItem.image}
            alt="search item photo"
            className="w-[30rem] h-[25rem]"
          />
        </Link>
      </div>
      <div className="basis-[70%] flex flex-col justify-center">
        <div className="flex justify-between">
          <p className="text-[3.2rem] text-colorPrimary">{SearchItem.name}</p>
          <WishHeart productId={SearchItem._id} size={30} />
        </div>
        <div className="flex flex-col justify-center ">
          {/* <p className="text-white bg-red-600 w-[5rem]">
                    -{SearchItem.discount}%
                </p> */}
          <div className="price flex gap-5">
            {/* {SearchItem.percentage > 0 && ( 
            <p className="line-through text-red-400">
              {SearchItem.price.toFixed(2)}$
            </p>
            )}
            <p className="text-[2rem] text-colorSecondary">
                {SearchItem.percentage > 0 
               ? (Math.round(
                SearchItem.price * (1 - SearchItem.percentage / 100)
              ).toFixed(2)) : SearchItem.price.toFixed(2)}
              $
            </p> */}
            {SearchItem.percentage > 0 ? (
              <div className="flex items-center space-x-5">
                <p className="line-through text-3xl">
                  {/* {product.price.toFixed(2)}$ */}$
                  {Math.round(
                    SearchItem.price / (1 - SearchItem.percentage / 100)
                  ).toFixed(2)}
                </p>
                <p className="text-4xl text-colorTertiary">
                  {/* {Math.round(
                                            product.price *
                                         ).toFixed(2)}
                                        € */}
                  ${SearchItem.price.toFixed(2)}
                </p>
              </div>
            ) : (
              <p className="text-3xl font-medium pt-2">
                ${SearchItem.price.toFixed(2)}
              </p>
            )}
          </div>
          <div className="warranty flex items-center mt-4 border-gray-300 pb-10">
            <label className="font-semibold text-2xl text-colorPrimary mr-4">
              Warranty
            </label>
            <div className=" items-center border border-gray-300 rounded-md p-1 shadow-sm max-w-fit self-start">
              <button className="bg-colorPrimary text-white px-5 py-2 rounded-md">
                5
              </button>
              <span className="px-4 py-2 text-gray-600 bg-gray-100 rounded-r-md">
                5 YEAR'S WARRANTY
              </span>
            </div>
          </div>
          {/* <p>{wishItem._id}</p> */}
          {/* <p>{"⭐".repeat(SearchItem.rating)}</p> */}
          {<p className="text-3xl w-full">{SearchItem.description}</p>}
          <Link
            className="flex pt-8 justify-start text-red-500 underline hover:text-colorSecondary "
            to={`/product/${SearchItem._id}`}
          >
            View product
          </Link>
        </div>
        {/* <p className="text-green-500">Is available</p>
                <p className="text-green-500">Free shipping</p>
                <button className="border">Add to cart</button> */}
      </div>
    </div>
  );
};

export default SearchItems;
