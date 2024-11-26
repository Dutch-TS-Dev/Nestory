/* eslint-disable react/no-unknown-property */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
import StarRating from "../../components/StarRating/StarRating";
// import WishHeart from "../../components/WishHeart/WishHeart";
import ColorSelector from "../../components/ColorSelector/ColorSelector";
import { PiPackageBold } from "react-icons/pi";
import { MdHeadsetMic } from "react-icons/md";
import QuantitySelector from "../../components/QuantitySelector/QuantitySelector";
// import Reviews from "../../components/Reviews/Reviews";
import ReviewSection from "../../components/Reviews/Reviews";
import Carousel from "../../components/Carousel/Carousel";
// import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../../context/AppProvider";
import { useParams } from "react-router-dom";
import { useState } from "react";
import WishHeart from "../../components/WishHeart/WishHeart";

//3d model
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const getRandomWarranty = () => {
    const warrantyOptions = [2, 3, 5];
    const randomIndex = Math.floor(Math.random() * warrantyOptions.length);
    return warrantyOptions[randomIndex];
};
const Furniture = () => {
    const { scene } = useGLTF("/images/texture/cover_chair.glb");
    // const { scene } = useGLTF("/images/texture/study_desk.glb");
    // const { scene } = useGLTF("/texture/sofa3d1.glb");
    return (
        <primitive
            object={scene}
            position={[0, -2, 0]}
            scale={[0.05, 0.05, 0.05]}
        />
    );
};

async function fetchProductById(productId) {
    try {
        const response = await fetch(
            `http://localhost:3000/api/products/${productId}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const product = await response.json();
        return product;
    } catch (error) {
        console.error("Failed to fetch product:", error);
        throw error;
    }
}

const ProductDetails = () => {
    // const navigate = useNavigate();
    const { _id } = useParams();
    // console.log(_id);
    const [product, setProduct] = useState();
    const { user } = useContext(AppContext);

    // const [quantity, setQuantity] = useState(cartItem.quantity);

    // const navigate = useNavigate();

    // eslint-disable-next-line no-unused-vars
    const {
        cartCount,
        setCartCount,
        setCartItems,
        isFlying,
        setIsFlying,
        flyStyle,
        setFlyStyle,
        bagIconRef,
        imgRef,
    } = useContext(AppContext);
    // const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [quantityProductDetails, setQuantityProductDetails] = useState(1);

    //3d model jian---------------------------
    const [controlsEnabled, setControlsEnabled] = useState(false);
    const orbitControlsRef = useRef();
    // 切换 OrbitControls 的启用状态
    const toggleControls = () => {
        setControlsEnabled((prev) => !prev);
    };
    //3d model--------------------------------

    const handleQuantityChange = (newQuantity) => {
        setQuantityProductDetails(newQuantity);
    };

    const [warranty] = useState(getRandomWarranty());

    // Das ignore-Flag wird verwendet, um sicherzustellen, dass der Zustand nicht aktualisiert wird, wenn die Komponente nicht mehr angezeigt wird.
    useEffect(() => {
        let ignore = false;
        const getProduct = async () => {
            try {
                setProduct(null);
                const product = await fetchProductById(_id);
                if (!ignore) {
                    setProduct(product);
                }
            } catch (error) {
                console.error("Failed to fetch product:", error);
            }
        };
        getProduct();

        return () => {
            ignore = true;
        };
    }, [_id]);

    const addToCart = async () => {
        try {
            if (!user._id) {
                toast.warn("Please login to add to cart");
                return;
            }
            const response = await fetch(
                `http://localhost:3000/cart/${product._id}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        quantity: quantityProductDetails,
                        color: "black",
                    }),
                    credentials: "include",
                }
            );

            const data = await response.json();
            // console.log("fetched data:", data);
            // setIsAuthenticated(data.isAuthenticated);

            if (response.ok) {
                console.log("Product added to cart", data.cart.items);
                setCartItems(data.cart.items);
            } else {
                console.error("Error adding product to cart:", data.message);
            }
        } catch (error) {
            console.error("Request failed:", error);
        }

        setCartCount((prevCount) => prevCount + 1);
        console.log(cartCount);

        //fly animation
        const scale = 0.1;
        const startRect = imgRef.current.getBoundingClientRect();
        // Jians Code
        /* const endRect = bagIconRef.current.getBoundingClientRect();
         // 最终缩小比例
        const elementWidth = startRect.width * scale;
        const elementHeight = startRect.height * scale;
 */

        // Annas Code
        const bagPosition = bagIconRef.current.getBoundingClientRect();
        const isBagAtBottom = bagPosition.x === 0 && bagPosition.y === 0;
        // if navbar is at the bottom, it has position absolute (is out of DOM) and getBoundingClientRect() gives 0 fpr all props
        const y = window.innerHeight - 40; // 40 = 1/2 from navbar height (whenn at the bottom)
        const x = (3 * window.innerWidth) / 8; // center of the second element in nav bar (whenn at the bottom)
        const endRect = isBagAtBottom
            ? {
                  left: x,
                  top: y,
              }
            : bagPosition;
        //

        // 设置飞行元素的初始位置和大小
        setFlyStyle({
            left: `${startRect.left}px`,
            top: `${startRect.top}px`,
            opacity: 1,

            transform: "scale(1)",
        });
        setIsFlying(true);

        setTimeout(() => {
            // 计算目标位置，使飞行元素缩小后对准购物车图标的中心
            // Jians Code
            /* const adjustedLeft =
                endRect.left - startRect.left - elementWidth / 4;
            const adjustedTop =
                endRect.top -
                startRect.top -
                elementHeight * 2.1 -
                window.scrollY;
            console.log(adjustedLeft, adjustedTop); */

            // Annas Code
            const adjustedLeft = isBagAtBottom
                ? endRect.left - startRect.width / 2
                : endRect.left - startRect.width / 2 + 13;
            const adjustedTop = isBagAtBottom
                ? endRect.top - startRect.height / 2
                : endRect.top - startRect.height / 2 + 13;
            //

            setFlyStyle({
                left: `${adjustedLeft}px`,
                top: `${adjustedTop}px`,
                // display: "none",
                opacity: 0.3,

                transform: `scale(${scale})`,
            });
        }, 100);
    };

    const handleTransitionEnd = () => {
        setIsFlying(false);

        // 重置飞行元素为按钮的位置，准备下一次动画
        setFlyStyle((prevStyle) => ({
            ...prevStyle,
            opacity: 1,
            transform: "scale(1)",
        }));
    };

    // if (isAuthenticated) {
    //   navigate("#");
    // } else {
    //   navigate("/login");
    // }
    // const handleCartClick = () => {

    //   addToCart(product);
    //   if (isAuthenticated) {
    //     navigate("/cart");
    //   } else {
    //     navigate("/login");
    //   }
    // };

    if (!product) {
        return null;
    } else
        return (
            <>
                {/* <WishHeart className="text-colorPrimary cursor-pointer" /> */}
                <div className="flex-col gap-2 mt-1 xl:mt-[6rem] xl:mb-40 flex lg:flex-row justify-start items-center bg-white">
                    {/* Left Section: Image */}
                    <div className="w-full md:basis-[60%] flex justify-center mb-8 md:mb-0 relative">
                        {product.name !== "cover chair" ? (
                            <img
                                ref={imgRef}
                                src={product.image}
                                alt="product"
                                className="w-[30rem] md:w-[65rem] md:h-[65rem]"
                            />
                        ) : (
                            <>
                                {/* Canvas 3D 场景 */}
                                <Canvas
                                    // ref={imgRef}
                                    className="w-full aspect-[4/3] flex justify-center items-center"
                                    shadows
                                    camera={{
                                        position: [-1.8, 1.8, 3],
                                        fov: 75,
                                    }}
                                >
                                    {/* 环境光与定向光 */}
                                    <ambientLight intensity={1.7} />
                                    <directionalLight
                                        position={[-5, 10, 5]}
                                        intensity={2.5}
                                        castShadow
                                        shadow-mapSize-width={1024}
                                        shadow-mapSize-height={1024}
                                        shadow-camera-far={50}
                                    />
                                    {/* 房间模型 */}
                                    <Furniture />
                                    {/* OrbitControls */}
                                    <OrbitControls
                                        ref={orbitControlsRef}
                                        enabled={controlsEnabled}
                                        enablePan={false} // 禁用平移
                                    />
                                </Canvas>
                                {/* 切换控制按钮 */}
                                <button
                                    onClick={toggleControls}
                                    className="absolute top-10 left-10 bg-colorPrimary text-gray-200 p-4  rounded-md hover:bg-colorSecondary transition-colors duration-300 ease-in-out cursor-pointer"
                                >
                                    {controlsEnabled
                                        ? "Disable 3D Controls"
                                        : "Enable 3D Controls"}
                                </button>
                            </>
                        )}

                        {/* moved it to the div with img and gave it height */}
                        {/* flaying element */}
                        {isFlying && (
                            <div
                                className="fixed md:h-[65rem] h-[30rem] aspect-square rounded-full bg-cover bg-no-repeat transition-all duration-[1500ms] ease-in-out pointer-events-none z-[21]"
                                style={{
                                    backgroundImage: `url(${product.image})`,
                                    ...flyStyle,
                                }}
                                onTransitionEnd={handleTransitionEnd} // 动画结束后隐藏
                            ></div>
                        )}
                    </div>

                    {/* Right Section: Product Details */}
                    <div className="basis-[30%] flex flex-col justify-center space-y-10">
                        <div className="flex justify-between">
                            <h1 className="text-4xl xl:text-5xl font-semibold mb-3">
                                {product.name}
                            </h1>
                            <WishHeart productId={product._id} size={30} />
                        </div>
                        <div className="flex items-end">
                            <StarRating rate={product.rating} />
                            <a
                                href="#reviews" // This links to the reviews section
                                className="no-underline text-[1rem] ml-2 text-gray-600 hover:text-gray-700 hover:underline"
                            >
                                {/* (1 customer review) */}
                                (reviews)
                                {/* ({allReviews.length} review */}
                                {/* {allReviews.length !== 1 ? "s" : ""}) */}
                            </a>
                        </div>

                        <div className="discount basis-[18%] flex flex-col justify-center">
                            {product.percentage > 0 ? (
                                <div className="flex items-center space-x-5">
                                    <p className="line-through text-3xl">
                                        {/* {product.price.toFixed(2)}$ */}$
                                        {Math.round(
                                            product.price /
                                                (1 - product.percentage / 100)
                                        ).toFixed(2)}
                                    </p>
                                    <p className="text-5xl text-colorTertiary">
                                        {/* {Math.round(
                                            product.price *
                                                (1 - product.percentage / 100)
                                        ).toFixed(2)}
                                        $ */}
                                        ${product.price.toFixed(2)}
                                    </p>
                                </div>
                            ) : (
                                <p className="text-3xl">
                                    ${product.price.toFixed(2)}
                                </p>
                            )}

                            <div className="mt-6 text-sm text-gray-500">
                                <p>Delivery: 2 - 3 business days</p>
                                <p>
                                    Shipping method: Parcel, immediately
                                    available
                                </p>
                            </div>
                        </div>
                        <div className="warranty flex items-center mt-4 border-b border-gray-300 pb-10">
                            <label className="font-semibold text-2xl text-colorPrimary mr-4">
                                Warranty
                            </label>
                            <div className=" items-center border border-gray-300 rounded-md p-1 shadow-sm max-w-fit self-start">
                                <button className="bg-colorPrimary text-white px-5 py-2 rounded-md">
                                    {/* 5 */}
                                    {warranty}
                                </button>
                                <span className="px-4 py-2 text-gray-600 bg-gray-100 rounded-r-md">
                                    {/* 5 YEAR'S WARRANTY */}
                                    {warranty} Years Warranty
                                </span>
                            </div>
                        </div>

                        <ColorSelector />

                        <div className="parent flex justify-between items-center">
                            <QuantitySelector
                                quantity={quantityProductDetails}
                                setQuantity={setQuantityProductDetails}
                                increaseQuantity={() =>
                                    handleQuantityChange(
                                        quantityProductDetails + 1
                                    )
                                }
                                decreaseQuantity={() =>
                                    handleQuantityChange(
                                        Math.max(1, quantityProductDetails - 1)
                                    )
                                }
                            />

                            <button
                                // onClick={handleCartClick}
                                onClick={() => addToCart()}
                                className="buy w-full px-6 py-4 my-6 text-white bg-colorSecondary text-3xl hover:bg-colorPrimary rounded-full"
                            >
                                Add to Cart
                            </button>
                        </div>
                        {/* Description reserve */}
                        {/* <p className="xl:w-[70%] text-2xl text-gray-600 mt-4">
          {product.description}
        </p> */}
                        <div className="parent flex flex-col pt-6 mt-8 xl:mt-16">
                            {/* Free Shipping */}
                            <div className="flex items-center p-10 border border-gray-200 rounded-lg shadow-sm">
                                <div className="icon text-6xl mr-8  text-colorPrimary">
                                    <PiPackageBold />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-colorPrimary mb-2">
                                        Free Shipping
                                    </h3>
                                    <p className="text-xl  text-colorPrimary">
                                        Over 500$
                                    </p>
                                </div>
                            </div>

                            {/* Chat Online */}
                            <div className="flex items-center p-10 border border-gray-200 rounded-lg shadow-sm ">
                                <div className="icon text-6xl mr-8  text-colorPrimary">
                                    <MdHeadsetMic />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-semibold text-colorPrimary mb-2">
                                        Chat Online
                                    </h3>
                                    <p className="text-xl  text-colorPrimary">
                                        Contact with our agent
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="reviews" className="text-center pb-24">
                    <h3 className="text-5xl font-semibold">
                        Customers who viewed this product also viewed
                    </h3>
                </div>
                <Carousel />
                <div className="text-center mt-[10rem]">
                    <h3 className="text-5xl font-semibold">Product Reviews</h3>
                </div>
                <div
                    //   id="reviews"
                    className="pt-[16rem] pb-[16rem] lg:pt-[8rem] lg:pb-[8rem]"
                >
                    {/* <Reviews /> */}
                    <ReviewSection product={product} />
                    <ToastContainer />
                </div>
            </>
        );
};

export default ProductDetails;
