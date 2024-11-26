/* eslint-disable react/prop-types */

import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";

const PagesBanner = ({ title, quantity }) => {
    const { sortOption, setSortOption } = useContext(AppContext);

    const handleSortChange = (e) => {
        setSortOption(e.target.value);
    };

    return (
        <div>
            {/* MOBILE */}
            <div className="w-full aspect-[4/2.8] md:hidden bg-pageBannerBGC rounded-[3.5rem] relative">
                <div className="flex gap-6 items-center pt-[3.8rem] px-[3.8rem] ">
                    <div className="w-[2.6rem] h-[0.8rem] bg-colorSecondary rounded-3xl"></div>
                    <span className="text-6xl text-white font-bold">
                        {title}
                    </span>
                </div>
                <img
                    className="w-[90%] absolute top-[72%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
                    src="/images/lists/shop1.webp"
                    alt="shop"
                />
            </div>
            {/* TABLET DESKTOP */}
            <div className="hidden w-full mt-24 aspect-[6/1.2] md:block bg-pageBannerBGC rounded-[3.5rem] relative">
                <div className="flex gap-6 items-center absolute top-1/2 left-[18%] transform -translate-x-1/2 -translate-y-1/2">
                    <div className="w-[2.6rem] h-[0.8rem] bg-colorSecondary rounded-3xl"></div>
                    <span className="text-7xl xl:text-8xl text-white font-bold">
                        {title}
                    </span>
                </div>
                <img
                    className="w-[40%] absolute top-[40%] left-[70%] transform -translate-x-1/2 -translate-y-1/2"
                    src="/images/lists/shop1.webp"
                    alt="shop"
                />
            </div>
            <div className="flex justify-end md:justify-between items-center mt-48">
                <p className="hidden md:block">
                    showing all <span className="font-bold">{quantity}</span>{" "}
                    results
                </p>
                <select
                    className="focus:outline-none cursor-pointer"
                    onChange={handleSortChange}
                    value={sortOption}
                >
                    <option value="default">Default sorting</option>
                    <option value="sales">Sort by Sales: high to low</option>
                    <option value="priceAsc">Sort by Price: low to high</option>
                    <option value="priceDesc">
                        Sort by Price: high to low
                    </option>
                    <option value="newest">Sort by Newest</option>
                    <option value="rating">Sort by Rating</option>
                </select>
            </div>
        </div>
    );
};

export default PagesBanner;
