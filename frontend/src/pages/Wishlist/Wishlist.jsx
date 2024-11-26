import { useContext } from "react";
import { Link } from "react-router-dom";
import WishlistItem from "../../components/WishlistItem/WishlistItem";
import { AppContext } from "../../context/AppProvider";
import SubscribeBox from "../../components/UserProfile/SubscribeBox/SubscribeBox";

const Wishlist = () => {
    const { wishlist, user } = useContext(AppContext);

    return (
        <>
            {/* <div className=" py-[1rem] lg:py-[1.85rem] flex items-center justify-center">
                    <h2 className=" text-[2.2rem] md:text-[4rem]  text-colorPrimary font-semibold">
                        Wishlist
                    </h2>
                </div> */}
            {wishlist.length ? (
                <div className=" flex flex-col items-center justify-center md:w-[82%] md:mx-auto">
                    <div className=" py-[1rem] lg:py-[1.85rem] flex items-center justify-center">
                        <h2 className=" text-[2.2rem] md:text-[4rem]  text-colorPrimary font-semibold">
                            Wishlist
                        </h2>
                    </div>
                    <h3 className=" w-[100%] md:text-[3rem] text-center">
                        {user.firstName}, there are {wishlist.length} items in
                        your wishlist
                    </h3>
                    {wishlist.map((item, index) => (
                        <WishlistItem key={index} wishItem={item} />
                    ))}
                </div>
            ) : (
                <div className=" min-h-[50vh] flex flex-col items-center justify-center md:w-[82%] md:mx-auto">
                    <div className="   flex items-center justify-center">
                        <h2 className=" text-[2.4rem] md:text-[4rem]  text-colorPrimary font-semibold">
                            Wishlist
                        </h2>
                    </div>
                    <h3 className="text-[2rem] md:text-[3.2rem]  text-center font-semibold mb-[3rem]">
                        {user.firstName}, your wishlist is empty
                    </h3>
                    <p className="bg-[#FFB128] py-[1.5rem] px-[3.5rem] text-[1.4rem] text-white  font-bold rounded-[8rem] transition-transform duration-300 transform hover:scale-105 active:scale-100 active:bg-colorPrimary">
                        <Link to={"/shop"}>Go Shopping</Link>
                    </p>
                </div>
            )}
            <SubscribeBox />
        </>
    );
};

export default Wishlist;
