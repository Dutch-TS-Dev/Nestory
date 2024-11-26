import React from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "../Button/Button";
import { Package, Settings, Heart, LogOut } from "lucide-react";
//julijana
import { useContext } from "react";
import { AppContext } from "../../context/AppProvider";

const UserProfileMenu = () => {
    const location = useLocation();
    //-----julijana
    const { handleLogout } = useContext(AppContext);

    /* const navigate = useNavigate();

    const handleLogout = () => {
        navigate("/login");
    }; */
    return (
        <div className="lg:basis-[15%] pb-[3rem] order-1 md:pt-[1.5rem] text-3xl lg:shadow-lg lg:shadow-gray-300 lg:p-[1rem] lg: h-[25rem]">
            {/* mobile + Tablet */}
            <div className="lg:hidden flex flex-col justify-between">
                <div className="flex justify-between items-center border-b">
                    <div className="hover:text-colorSecondary">
                        <Link
                            to="/user"
                            style={{
                                color:
                                    location.pathname === "/user"
                                        ? "var(--colorSecondary)"
                                        : "inherit",
                            }}
                        >
                            Your account
                        </Link>
                    </div>
                    {/* julijana */}
                    {/* <Link to="/login" className="h-8"> */}
                    <Link to="#" onClick={handleLogout} className="h-8">
                        {/* julijana bis hier  */}
                        <div className="flex gap-2 hover:text-colorSecondary">
                            <p>Log out</p>
                            <LogOut />
                        </div>
                    </Link>
                </div>
                <div className=" pt-4 flex gap-2">
                    <Link
                        to="/user/orders"
                        className={
                            location.pathname === "/user/orders"
                                ? "text-white bg-colorSecondary hover:text-colorPrimary rounded-tl-[10px] rounded-tr-[10px] p-2"
                                : "hover:text-colorSecondary p-2"
                        } /* "pr-2 border-r"
            style={{
              color:
                location.pathname === "/user/orders"
                  ? "var(--colorTertiary)" 
                  : "inherit",
            }} */
                    >
                        Orders
                    </Link>

                    <Link
                        to="/user/data"
                        className={
                            location.pathname === "/user/data"
                                ? "text-white bg-colorSecondary hover:text-colorPrimary rounded-tl-[10px] rounded-tr-[10px] p-2"
                                : "hover:text-colorSecondary p-2"
                        } /* 
                        style={{
                            color:
                                location.pathname === "/user/data"
                                    ? "var(--colorTertiary)"
                                    : "inherit",
                        }} */
                    >
                        <p>Profile</p>
                    </Link>
                    <Link
                        to="/wishlist"
                        className={
                            location.pathname === "/wishlist"
                                ? "text-white bg-colorSecondary hover:text-colorPrimary rounded-tl-[10px] rounded-tr-[10px] p-2"
                                : "hover:text-colorSecondary p-2"
                        }
                    >
                        Wishlist
                    </Link>
                </div>
            </div>

            {/* LG */}
            <div className=" hidden lg:flex lg:flex-col justify-between">
                <Link
                    to="/user"
                    style={{
                        color:
                            location.pathname === "/user"
                                ? "var(--colorSecondary)"
                                : "inherit",
                    }}
                    className="text-[2rem]"
                >
                    <p className="font-bold hover:text-colorSecondary">
                        Your account
                    </p>
                </Link>
                <div className="pl-[3rem] mt-[1.5rem] flex flex-col gap-3">
                    <Link
                        to="/user/orders"
                        /* style={{
                            color:
                                location.pathname === "/user/orders"
                                    ? "var(--colorTertiary)"
                                    : "inherit",
                        }} */
                    >
                        <div
                            className={`flex gap-5 w-[70%] ${
                                location.pathname === "/user/orders"
                                    ? "text-white bg-colorSecondary hover:text-colorPrimary rounded-tl-[10px] rounded-tr-[10px] p-2"
                                    : "hover:text-colorSecondary p-2"
                            }`}
                        >
                            <Package />
                            <p>Orders</p>
                        </div>
                    </Link>
                    <Link
                        to="/user/data"
                        /* style={{
                            color:
                                location.pathname === "/user/data"
                                    ? "var(--colorTertiary)"
                                    : "inherit",
                        }} */
                    >
                        <div
                            className={`flex gap-5 w-[70%] ${
                                location.pathname === "/user/data"
                                    ? "text-white bg-colorSecondary hover:text-colorPrimary rounded-tl-[10px] rounded-tr-[10px] p-2"
                                    : "hover:text-colorSecondary p-2"
                            }`}
                        >
                            <Settings />
                            <p>Profile</p>
                        </div>
                    </Link>
                    <Link to="/wishlist">
                        <div className="/* flex gap-5 */ hover:text-colorSecondary p-2 w-[70%] ">
                            <Heart />
                            <p>Wishlist</p>
                        </div>
                    </Link>
                </div>
                {/* julijana */}
                {/* <Link to="/login" className="h-8 text-[2rem]"> */}
                <Link to="#" onClick={handleLogout} className="h-8 text-[2rem]">
                    {/* julijana - bis hier  */}
                    <div className="pt-[3rem] flex gap-3 hover:text-colorSecondary">
                        <p className="font-bold hover:text-colorSecondary">
                            Log out
                        </p>
                        <LogOut />
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default UserProfileMenu;
