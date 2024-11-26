/* eslint-disable react/prop-types */

import { useEffect, useState } from "react";
import Button from "../Button/Button";
import { Link } from "react-router-dom";

const Hero = () => {
    const [hoveredPrice, setHoveredPrice] = useState(null);
    const [currentPrice, setCurrentPrice] = useState(0);
    const [animationActive, setAnimationActive] = useState(false);

    const prices = [
        { id: 1, price: 499, position: { top: "63%", left: "70%" } },
        { id: 2, price: 399, position: { top: "83%", left: "83%" } },
        { id: 3, price: 299, position: { top: "83%", left: "38%" } },
    ];

    useEffect(() => {
        if (animationActive && hoveredPrice !== null) {
            const finalPrice = hoveredPrice;
            const increment = finalPrice / 10;
            const interval = setInterval(() => {
                setCurrentPrice((prevPrice) => {
                    const newPrice = prevPrice + increment;
                    if (newPrice >= finalPrice) {
                        clearInterval(interval);
                        return finalPrice;
                    }
                    return Math.round(newPrice);
                });
            }, 100);

            return () => clearInterval(interval);
        }
    }, [hoveredPrice, animationActive]);

    const handleMouseEnter = (price) => {
        setHoveredPrice(price);
        setCurrentPrice(0);
        setAnimationActive(true);
    };

    const handleMouseLeave = () => {
        setHoveredPrice(null);
        setAnimationActive(false);
        setCurrentPrice(0);
    };

    return (
        <>
            <div className="mx-auto w-full aspect-[4/2] bg-colorPrimary rounded-3xl relative ">
                <img
                    src="/images/hero/hero-pic1.webp"
                    alt="hero-pic1"
                    className="w-[86%] rounded-3xl absolute left-1/2 transform -translate-x-1/2 top-[46%] -translate-y-1/3"
                />
                <h2 className="text-white text-[3vw] font-bold absolute top-[28%] left-[20%] transform -translate-x-1/2 -translate-y-1/2">
                    neSTory
                </h2>
                <Link
                    className="text-white hidden lg:block font-bold absolute top-[40%] left-[20%] transform -translate-x-1/2 -translate-y-1/2"
                    to="/shop"
                    onClick={() => {
                        window.scrollTo(0, 0);
                    }}
                >
                    <Button
                        text="Shop Now"
                        width="180px"
                        height="46px"
                        fontSize="18px"
                    />
                </Link>
                <Link
                    className="text-white hidden md:block xl:hidden lg:hidden font-bold absolute top-[42%] left-[20%] transform -translate-x-1/2 -translate-y-1/2"
                    to="/shop"
                    onClick={() => {
                        window.scrollTo(0, 0);
                    }}
                >
                    <Button
                        text="Shop Now"
                        width="100px"
                        height="34px"
                        fontSize="12px"
                    />
                </Link>

                {/* Three Dots */}
                {[
                    { top: "61%", left: "70%" },
                    { top: "81%", left: "83%" },
                    { top: "81%", left: "38%" },
                ].map((pos, index) => (
                    <div
                        key={index}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2 w-20 aspect-[1/1] rounded-full cursor-pointer"
                        style={{ top: pos.top, left: pos.left }}
                        onMouseEnter={() =>
                            handleMouseEnter(prices[index].price)
                        }
                        onMouseLeave={handleMouseLeave}
                    >
                        <span className="relative flex h-20 w-20 items-center justify-center">
                            <span className="animate-ping duration-[5000ms] absolute inline-flex w-16 aspect-[1/1] rounded-full bg-colorSecondary opacity-75" />
                            <span className="animate-ping delay-1500 duration-[5000ms] absolute inline-flex w-12 aspect-[1/1] rounded-full bg-colorSecondary opacity-75" />
                            <span className="relative inline-flex rounded-full w-6 aspect-[1/1] bg-colorSecondary" />
                        </span>
                    </div>
                ))}

                {/* hover price */}
                {hoveredPrice !== null && (
                    <div className="absolute top-[33%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-70 text-white text-[4rem] md:text-[6rem] lg:text-[10rem] xl:text-[12rem] font-bold ">
                        {currentPrice} $
                    </div>
                )}
            </div>
        </>
    );
};

export default Hero;
