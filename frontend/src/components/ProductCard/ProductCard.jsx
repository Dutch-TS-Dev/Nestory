/* eslint-disable react/prop-types */
import StarRating from "../StarRating/StarRating";
import styles from "./ProductCard.module.css";
import WishHeart from "../WishHeart/WishHeart";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";

const ProductCard = ({ product }) => {
    const { setProduct } = useContext(AppContext);
    const percentageValue = parseInt(product.percentage);
    return (
        <div
            className={` 
            ${product.percentage ? styles.onSale : ""} 
            flex flex-col relative w-full aspect-[3/4] justify-center items-center bg-gray-100 rounded-3xl`}
            style={{
                "--percentage": `"${percentageValue}%"`,

                "--colorSecondary":
                    percentageValue > 40 ? "#EE6352" : "#ffb128",
            }}
        >
            <div className="absolute top-[18px] right-[18px] md:top-[12px] md:right-[12px] lg:top-[16px] lg:right-[16px] xl:top-[20px] xl:right-[20px] z-10">
                <WishHeart productId={product._id} />
            </div>

            <Link
                className="hover:scale-110 duration-300 ease-in-out w-[90%] "
                to={`/product/${product._id}`}
                onClick={() => {
                    //setProduct(product);
                    window.scrollTo(0, 0);
                }}
            >
                <img src={`${product.image}`} alt={`${product.name}`} />
            </Link>
            <div className="flex flex-col gap-2 justify-center items-center">
                <h3 className="text-[16px] my-3  lg:mt-8 text-colorPrimary">
                    <Link
                        to={`/product/${product._id}`}
                        onClick={() => {
                            //setProduct(product);
                            window.scrollTo(0, 0);
                        }}
                    >
                        {product.name}
                    </Link>
                </h3>

                <StarRating rate={product.rating} />
                {product.percentage ? (
                    <p className="flex justify-center items-center gap-2">
                        <del className="no-underline">
                            <bdi className="text-[12px] text-[#8097a4] line-through ">
                                <span className="text-[12px]">$</span>
                                {(
                                    product.price /
                                    ((100 - percentageValue) / 100)
                                ).toFixed(2)}
                                {/* {product.price} */}
                            </bdi>
                        </del>
                        <ins className="no-underline">
                            <bdi className="text-[16px] weight-[700] text-colorPrimary ">
                                <span className="text-3xl">$</span>
                                {/* {(
                                    (product.price * (100 - percentageValue)) /
                                    100
                                ).toFixed(2)} */}
                                {product.price}
                            </bdi>
                        </ins>
                    </p>
                ) : (
                    <p>
                        <bdi className="text-[16px]">
                            <span className="text-[16px]">$</span>
                            {(
                                (product.price * (100 + percentageValue)) /
                                100
                            ).toFixed(2)}
                        </bdi>
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductCard;
